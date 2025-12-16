// Piri - Background Service Worker

// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Piri extension installed');

    // Set default settings
    chrome.storage.sync.set({
        enabled: true,
        position: 'right', // 'left', 'right', 'between', 'floating'
        width: 320,
        theme: 'dark',
        autoShow: true
    });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_SETTINGS') {
        chrome.storage.sync.get(['enabled', 'position', 'width', 'theme', 'autoShow'], (settings) => {
            sendResponse(settings);
        });
        return true; // Indicates async response
    }

    if (message.type === 'SAVE_SETTINGS') {
        chrome.storage.sync.set(message.settings, () => {
            sendResponse({ success: true });
        });
        return true;
    }
    
    return false;
});
