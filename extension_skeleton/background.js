// Phase I skeleton: context menu -> capture selection -> open side panel (UI not included yet)
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "lfv_aicpm_analyze",
    title: "Analyze with LFV/AICPM",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "lfv_aicpm_analyze") return;
  // In Phase I skeleton we just log the selected text.
  console.log("Selected text:", info.selectionText);
});
