// ChatGPT Platform Parser

window.PiriPlatforms = window.PiriPlatforms || {};

window.PiriPlatforms.chatgpt = {
    name: 'ChatGPT',

    // Check if we're on ChatGPT
    isActive() {
        return window.location.hostname.includes('chat.openai.com') ||
            window.location.hostname.includes('chatgpt.com');
    },

    // Get the main conversation container
    getConversationContainer() {
        return document.querySelector('main [class*="react-scroll-to-bottom"]') ||
            document.querySelector('main');
    },

    // Get all message elements
    getMessages() {
        const messages = [];
        const messageElements = document.querySelectorAll('[data-message-author-role]');

        messageElements.forEach((el, index) => {
            const role = el.getAttribute('data-message-author-role');
            const content = el.querySelector('.markdown, .whitespace-pre-wrap');

            if (content) {
                messages.push({
                    id: `msg-${index}`,
                    role: role === 'user' ? 'user' : 'assistant',
                    element: el,
                    content: content,
                    text: content.textContent || ''
                });
            }
        });

        return messages;
    },

    // Get headings from a message in DOM order
    getHeadings(messageElement) {
        const headings = [];
        const content = messageElement.querySelector('.markdown');

        if (!content) return headings;

        // Get all headings in DOM order (h1, h2, h3)
        const allHeadings = content.querySelectorAll('h1, h2, h3');

        allHeadings.forEach((h, i) => {
            const level = parseInt(h.tagName.charAt(1)); // Extract number from H1, H2, H3
            headings.push({
                level: level,
                text: h.textContent?.trim() || '',
                element: h,
                id: `h${level}-${i}-${Date.now()}`
            });
        });

        return headings;
    },

    // Get code blocks from a message
    getCodeBlocks(messageElement) {
        const blocks = [];
        const content = messageElement.querySelector('.markdown');

        if (!content) return blocks;

        const codeBlocks = content.querySelectorAll('pre');

        codeBlocks.forEach((block, i) => {
            const codeElement = block.querySelector('code');
            const language = codeElement?.className?.match(/language-(\w+)/)?.[1] || 'code';

            blocks.push({
                language,
                element: block,
                preview: codeElement?.textContent?.slice(0, 50) || '',
                id: `code-${i}-${Date.now()}`
            });
        });

        return blocks;
    },

    // Scroll container
    getScrollContainer() {
        return document.querySelector('main [class*="react-scroll-to-bottom"]') ||
            document.querySelector('main');
    },

    // Detect if ChatGPT is in dark or light mode
    getTheme() {
        try {
            const html = document.documentElement;
            
            // Check data-theme attribute first (ChatGPT's primary method)
            const dataTheme = html.getAttribute('data-theme');
            if (dataTheme === 'dark' || dataTheme === 'light') {
                return dataTheme;
            }
            
            // Check for class-based theme indicators
            if (html.classList.contains('dark') || html.classList.contains('dark-mode')) {
                return 'dark';
            }
            
            if (html.classList.contains('light') || html.classList.contains('light-mode')) {
                return 'light';
            }
            
            // Check body/main background color
            const body = document.body;
            const main = document.querySelector('main');
            const bgElement = main || body;
            
            if (bgElement) {
                const computedStyle = window.getComputedStyle(bgElement);
                const bgColor = computedStyle.backgroundColor;
                
                if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                    const rgb = bgColor.match(/\d+/g);
                    if (rgb && rgb.length >= 3) {
                        const r = parseInt(rgb[0]);
                        const g = parseInt(rgb[1]);
                        const b = parseInt(rgb[2]);
                        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                        return brightness < 128 ? 'dark' : 'light';
                    }
                }
            }
            
            // Check color-scheme
            if (html.style.colorScheme === 'dark' || body.style.colorScheme === 'dark') {
                return 'dark';
            }
            
            if (html.style.colorScheme === 'light' || body.style.colorScheme === 'light') {
                return 'light';
            }
            
            // Default to light
            return 'light';
        } catch (e) {
            return 'light';
        }
    }
};
