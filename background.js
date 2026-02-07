// background.js

// Helper: Get a stable ID that survives reloads
async function getStableUserId() {
  return new Promise((resolve) => {
    // 1. Try to get the official Google Account ID (Best for persistence across devices)
    chrome.identity.getProfileUserInfo(async (userInfo) => {
      if (userInfo && userInfo.id) {
        resolve(userInfo.id);
      } else {
        // 2. Fallback: Check Chrome Sync Storage (Travels with the browser profile)
        const items = await chrome.storage.sync.get("slic_stable_id");
        if (items.slic_stable_id) {
          resolve(items.slic_stable_id);
        } else {
          // 3. Last Resort: Generate a new ID and save it to Sync
          const newId = crypto.randomUUID();
          await chrome.storage.sync.set({ slic_stable_id: newId });
          resolve(newId);
        }
      }
    });
  });
}

// Listener: Content script asks "Who am I?"
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getIdentity") {
    getStableUserId().then(id => sendResponse({ userId: id }));
    return true; // Keep channel open for async response
  }
});

// Listener: Click extension icon to inject
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }).then(() => {
    chrome.tabs.sendMessage(tab.id, { action: "showComments" }).catch(() => {
      // Content script not ready yet, it will run on load
    });
  });
});