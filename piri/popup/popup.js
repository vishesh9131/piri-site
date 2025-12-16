// Piri Popup Script - Fixed Version

// Detect platform from URL
function detectPlatform(hostname) {
    if (hostname.includes('chat.openai.com') || hostname.includes('chatgpt.com')) {
        return 'chatgpt';
    } else if (hostname.includes('claude.ai') || hostname.includes('anthropic.com')) {
        return 'claude';
    } else if (hostname.includes('gemini.google.com') || hostname.includes('bard.google.com')) {
        return 'gemini';
    }
    return 'default';
}

// Detect ChatGPT theme from active tab (via content script message)
async function detectChatGPTTheme(tabId) {
    try {
        const response = await chrome.tabs.sendMessage(tabId, { type: 'GET_CHATGPT_THEME' });
        return response?.theme || 'light';
    } catch (e) {
        return 'light';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const enableToggle = document.getElementById('enableToggle');
    const autoShowToggle = document.getElementById('autoShowToggle');
    const positionSelect = document.getElementById('positionSelect');
    const themeSelect = document.getElementById('themeSelect');
    const reloadBtn = document.getElementById('reloadBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    const statusText = document.getElementById('statusText');
    const toast = document.getElementById('toast');

    // Detect platform and apply theme
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.url) {
            const url = new URL(tab.url);
            const platform = detectPlatform(url.hostname);
            document.body.classList.add(`piri-platform-${platform}`);
            
            if (platform === 'chatgpt' && tab.id) {
                const theme = await detectChatGPTTheme(tab.id);
                document.body.classList.add(`piri-chatgpt-${theme}`);
            }
        }
    } catch (error) {
        console.log('Could not detect platform');
    }

    // Load saved settings
    try {
        const settings = await chrome.storage.sync.get(['enabled', 'autoShow', 'position', 'theme']);

        enableToggle.checked = settings.enabled !== false;
        autoShowToggle.checked = settings.autoShow !== false;
        positionSelect.value = settings.position || 'right';
        themeSelect.value = settings.theme || 'dark';

        updateStatus(enableToggle.checked);
    } catch (error) {
        console.error('Failed to load settings:', error);
        showToast('Failed to load settings');
    }

    // Update status indicator
    function updateStatus(enabled) {
        if (enabled) {
            statusIndicator.classList.remove('inactive');
            statusText.textContent = 'Ready to navigate';
        } else {
            statusIndicator.classList.add('inactive');
            statusText.textContent = 'Sidebar disabled';
        }
    }

    // Show toast notification
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // Save settings on change
    enableToggle.addEventListener('change', async () => {
        try {
            await chrome.storage.sync.set({ enabled: enableToggle.checked });
            updateStatus(enableToggle.checked);
            await notifyContentScript('TOGGLE_ENABLED', enableToggle.checked);
            showToast(enableToggle.checked ? 'Sidebar enabled' : 'Sidebar disabled');
        } catch (error) {
            console.error('Failed to save setting:', error);
        }
    });

    autoShowToggle.addEventListener('change', async () => {
        try {
            await chrome.storage.sync.set({ autoShow: autoShowToggle.checked });
            showToast('Setting saved');
        } catch (error) {
            console.error('Failed to save setting:', error);
        }
    });

    positionSelect.addEventListener('change', async () => {
        try {
            await chrome.storage.sync.set({ position: positionSelect.value });
            await notifyContentScript('CHANGE_POSITION', positionSelect.value);
            showToast(`Position: ${positionSelect.options[positionSelect.selectedIndex].text}`);
        } catch (error) {
            console.error('Failed to save setting:', error);
        }
    });

    themeSelect.addEventListener('change', async () => {
        try {
            await chrome.storage.sync.set({ theme: themeSelect.value });
            await notifyContentScript('CHANGE_THEME', themeSelect.value);
            showToast(`Theme: ${themeSelect.options[themeSelect.selectedIndex].text}`);
        } catch (error) {
            console.error('Failed to save setting:', error);
        }
    });

    // Reload button
    reloadBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab?.id) {
                await chrome.tabs.reload(tab.id);
                showToast('Refreshing page...');
                setTimeout(() => window.close(), 1000);
            }
        } catch (error) {
            console.error('Failed to reload:', error);
            showToast('Failed to reload');
        }
    });
});

// Notify content script of changes
async function notifyContentScript(type, value) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab?.id) {
            await chrome.tabs.sendMessage(tab.id, { type, value });
            return true;
        }
    } catch (error) {
        // Content script might not be loaded on this page
        console.log('Could not reach content script (page may not be a supported AI chat)');
    }
    return false;
}
