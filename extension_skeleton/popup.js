import { classifyOpinionVsNews } from './opinionNewsClassifier.js';

const btn = document.getElementById('btn');
const out = document.getElementById('out');

function esc(s) {
  return (s || '').toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function pill(text) {
  return `<span class="pill">${esc(text)}</span>`;
}

function render(result, url) {
  out.style.display = 'block';

  const ct = result.content_type;
  const conf = result.confidence;

  const pretty = {
    report: 'Report / News',
    opinion: 'Opinion',
    prediction: 'Prediction',
    mixed: 'Mixed'
  }[ct] || ct;

  const reasons = (result.reasons || []).map(r => `<li>${esc(r)}</li>`).join('');

  out.innerHTML = `
    <div class="row">
      <div>
        <div style="font-size:12px;color:#666">AICPM content_type</div>
        <div style="font-size:16px;font-weight:700;margin-top:2px">${esc(pretty)}</div>
      </div>
      <div style="text-align:right">
        <div style="font-size:12px;color:#666">confidence</div>
        <div style="margin-top:2px">${pill(conf)}</div>
      </div>
    </div>
    <div class="muted" style="margin-top:8px;word-break:break-word">${esc(url)}</div>
    <div style="margin-top:10px;font-weight:700;font-size:12px">Why this result</div>
    <ul>${reasons || '<li>No signals detected.</li>'}</ul>
    <div style="margin-top:10px" class="muted">
      Tip: Use this as a starting point. In ambiguous cases, prefer <b>mixed</b> and let LFV flag predictive/normative claims.
    </div>
  `;
}

async function analyzeCurrentTab() {
  btn.disabled = true;
  btn.textContent = 'Analyzing…';
  out.style.display = 'none';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('No active tab found.');

    // Execute in the page so we can read DOM/text.
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        // Minimal in-page copy of the classifier to avoid bundling.
        const norm = (s) => (s || '').toString().toLowerCase();
        const hasAny = (hay, needles) => needles.some(n => hay.includes(n));
        const getTextSignals = (doc) => {
          const title = norm(doc.title);
          const h1 = norm(doc.querySelector('h1')?.innerText || '');
          const metaSection = norm(doc.querySelector('meta[property="article:section"]')?.getAttribute('content') || '');
          const ogType = norm(doc.querySelector('meta[property="og:type"]')?.getAttribute('content') || '');
          const canonical = norm(doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || location.href);
          const breadcrumbs = norm(Array.from(doc.querySelectorAll('[aria-label*="breadcrumb" i] a, nav a')).slice(0, 10).map(a => a.textContent || '').join(' '));
          return { title, h1, metaSection, ogType, canonical, breadcrumbs };
        };
        const classify = (doc) => {
          const reasons = [];
          const s = { opinion: 0, report: 0, prediction: 0, mixed: 0 };
          const { title, h1, metaSection, canonical, breadcrumbs } = getTextSignals(doc);
          const url = canonical || location.href;
          const sectionText = `${title} ${h1} ${metaSection} ${breadcrumbs}`;
          if (hasAny(sectionText, ['opinion', 'editorial', 'column', 'commentary', 'guest essay', 'letters'])) {
            s.opinion += 3; reasons.push('Publisher section/label suggests Opinion/Editorial.');
          }
          if (hasAny(url, ['/opinion', '/editorial', '/commentary', '/column', '/columns', '/viewpoints', '/analysis/opinion'])) {
            s.opinion += 3; reasons.push('URL path suggests Opinion.');
          }
          if (hasAny(url, ['/live/', '/live-updates', '/liveupdates', '/liveblog'])) {
            s.report += 2; reasons.push('URL suggests live updates (reporting).');
          }
          if (hasAny(url, ['/analysis', '/explainer', '/perspective'])) {
            s.mixed += 2; reasons.push('URL suggests analysis/explainer (often mixed).');
          }
          const bodySample = norm((doc.body?.innerText || '').slice(0, 4000));
          const normative = [' should ', ' must ', ' needs to ', ' ought to ', ' we should ', ' i think ', ' in my view ', ' clearly ', ' obviously '];
          const predictive = [' will ', ' going to ', ' likely ', ' unlikely ', ' expected to ', ' could ', ' may ', ' might '];
          if (hasAny(bodySample, normative)) { s.opinion += 2; reasons.push('Normative language detected (should/must/needs to).'); }
          if (hasAny(bodySample, predictive)) { s.prediction += 1; reasons.push('Predictive/modal language detected (will/likely/could).'); }
          const quoteCount = (doc.body?.innerText || '').match(/\“|\”|"/g)?.length || 0;
          const attributionCount = (bodySample.match(/\bsaid\b|\btold\b|\baccording to\b|\bspokesperson\b|\bstatement\b/g) || []).length;
          if (quoteCount >= 8 || attributionCount >= 4) { s.report += 2; reasons.push('Reporting signals detected (quotes/attribution).'); }
          const opinionStrong = s.opinion >= 4;
          const reportStrong = s.report >= 3;
          const predStrong = s.prediction >= 3;
          let content_type = 'report';
          let confidence = 'medium';
          if (predStrong && !opinionStrong && !reportStrong) {
            content_type = 'prediction'; confidence = 'low'; reasons.push('Prediction signals dominate without strong reporting/opinion markers.');
          } else if (opinionStrong && reportStrong) {
            content_type = 'mixed'; confidence = 'medium'; reasons.push('Both reporting and opinion signals present → mixed.');
          } else if (opinionStrong && !reportStrong) {
            content_type = 'opinion'; confidence = 'high';
          } else if (reportStrong && !opinionStrong) {
            content_type = 'report'; confidence = 'high';
          } else {
            content_type = s.mixed > 0 ? 'mixed' : 'report'; confidence = 'low'; reasons.push('Limited signals; conservative fallback.');
          }
          return { content_type, confidence, signals: s, reasons, url };
        };
        return classify(document);
      }
    });

    render(result, result.url || tab.url || '');
  } catch (e) {
    out.style.display = 'block';
    out.innerHTML = `<div class="err" style="font-weight:700">Error</div><div class="muted" style="margin-top:6px">${esc(e.message || String(e))}</div>`;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Analyze current tab';
  }
}

btn.addEventListener('click', analyzeCurrentTab);
