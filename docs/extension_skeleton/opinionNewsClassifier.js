/**
 * Opinion vs News classifier (Phase I)
 *
 * Design goals:
 * - Non-partisan / non-blocking
 * - Explainable: return reasons (signals)
 * - Conservative: prefer "mixed" when uncertain
 *
 * Output aligns to AICPM content_type:
 * - report (hard news / reporting)
 * - opinion
 * - prediction
 * - mixed
 * - research_summary / policy_legal / satire / advertisement are possible but
 *   not a focus of this Phase I module.
 */

const SCORE = {
  opinion: 0,
  report: 0,
  prediction: 0,
  mixed: 0
};

function norm(s) {
  return (s || '').toString().toLowerCase();
}

function getTextSignals(doc) {
  const title = norm(doc.title);
  const h1 = norm(doc.querySelector('h1')?.innerText || '');
  const metaSection = norm(doc.querySelector('meta[property="article:section"]')?.getAttribute('content') || '');
  const ogType = norm(doc.querySelector('meta[property="og:type"]')?.getAttribute('content') || '');
  const canonical = norm(doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || location.href);
  const breadcrumbs = norm(Array.from(doc.querySelectorAll('[aria-label*="breadcrumb" i] a, nav a')).slice(0, 10).map(a => a.textContent || '').join(' '));

  return { title, h1, metaSection, ogType, canonical, breadcrumbs };
}

function hasAny(haystack, needles) {
  return needles.some(n => haystack.includes(n));
}

function classifyOpinionVsNews(doc) {
  const reasons = [];
  const s = { ...SCORE };

  const { title, h1, metaSection, ogType, canonical, breadcrumbs } = getTextSignals(doc);
  const url = canonical || location.href;

  // Strong section cues (many publishers label "Opinion" explicitly)
  const sectionText = `${title} ${h1} ${metaSection} ${breadcrumbs}`;
  if (hasAny(sectionText, ['opinion', 'editorial', 'column', 'commentary', 'guest essay', 'letters'])) {
    s.opinion += 3;
    reasons.push('Publisher section/label suggests Opinion/Editorial.');
  }

  // URL path cues
  if (hasAny(url, ['/opinion', '/editorial', '/commentary', '/column', '/columns', '/viewpoints', '/analysis/opinion'])) {
    s.opinion += 3;
    reasons.push('URL path suggests Opinion.');
  }
  if (hasAny(url, ['/live/', '/live-updates', '/liveupdates', '/liveblog'])) {
    s.report += 2;
    reasons.push('URL suggests live updates (reporting).');
  }
  if (hasAny(url, ['/analysis', '/explainer', '/perspective'])) {
    // analysis is often mixed, not necessarily opinion
    s.mixed += 2;
    reasons.push('URL suggests analysis/explainer (often mixed reporting + interpretation).');
  }

  // Linguistic cues (lightweight; conservative)
  const bodySample = norm((doc.body?.innerText || '').slice(0, 4000));
  const normative = [' should ', ' must ', ' needs to ', ' ought to ', ' we should ', ' i think ', ' in my view ', ' clearly ', ' obviously '];
  const predictive = [' will ', ' going to ', ' likely ', ' unlikely ', ' expected to ', ' could ', ' may ', ' might '];

  if (hasAny(bodySample, normative)) {
    s.opinion += 2;
    reasons.push('Normative language detected (e.g., should/must/needs to).');
  }

  // Prediction is a separate type; it can still be report or mixed.
  if (hasAny(bodySample, predictive)) {
    s.prediction += 1;
    reasons.push('Predictive/modal language detected (e.g., will/likely/could).');
  }

  // Reporting cues: quotes + attribution
  const quoteCount = (doc.body?.innerText || '').match(/\“|\”|"/g)?.length || 0;
  const attributionCount = (bodySample.match(/\bsaid\b|\btold\b|\baccording to\b|\bspokesperson\b|\bstatement\b/g) || []).length;
  if (quoteCount >= 8 || attributionCount >= 4) {
    s.report += 2;
    reasons.push('Reporting signals detected (quotes/attribution).');
  }

  // If both opinion and report are high, call it mixed.
  const opinionStrong = s.opinion >= 4;
  const reportStrong = s.report >= 3;
  const predStrong = s.prediction >= 3;

  let content_type = 'report';
  let confidence = 'medium';

  if (predStrong && !opinionStrong && !reportStrong) {
    content_type = 'prediction';
    confidence = 'low';
    reasons.push('Prediction signals dominate without strong reporting/opinion markers.');
  } else if (opinionStrong && reportStrong) {
    content_type = 'mixed';
    confidence = 'medium';
    reasons.push('Both reporting and opinion signals present → mixed.');
  } else if (opinionStrong && !reportStrong) {
    content_type = 'opinion';
    confidence = 'high';
  } else if (reportStrong && !opinionStrong) {
    content_type = 'report';
    confidence = 'high';
  } else {
    // Conservative fallback
    content_type = s.mixed > 0 ? 'mixed' : 'report';
    confidence = 'low';
    reasons.push('Limited signals; conservative fallback.');
  }

  return {
    content_type,
    confidence,
    signals: s,
    reasons
  };
}

export { classifyOpinionVsNews };