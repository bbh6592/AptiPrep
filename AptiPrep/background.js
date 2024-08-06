chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ linksVisible: false });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.startsWith('chrome-extension://')) {
        chrome.storage.local.get('linksVisible', (result) => {
            chrome.tabs.sendMessage(tabId, { action: 'setVisibility', visible: result.linksVisible });
        });
    }
});
