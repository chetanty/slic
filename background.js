chrome.action.onClicked.addListener((tab) => {
  // Ensure content script is running before sending message
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }).then(() => {
    chrome.tabs.sendMessage(tab.id, { action: "showComments" }).catch(() => {
      console.log("Content script not ready yet.");
    });
  });
});
