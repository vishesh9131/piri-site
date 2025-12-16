// Claude Platform Parser

window.PiriPlatforms = window.PiriPlatforms || {};

window.PiriPlatforms.claude = {
    name: 'Claude',

    // Check if we're on Claude
    isActive() {
        return window.location.hostname.includes('claude.ai');
    },

    // Get the main conversation container
    getConversationContainer() {
        return document.querySelector('main') ||
            document.querySelector('[class*="conversation"]') ||
            document.body;
    },

    // Get all message elements
    getMessages() {
        const messages = [];

        // Claude uses data attributes or classes for messages
        const messageElements = document.querySelectorAll(
            '[data-is-streaming], .font-claude-message, [class*="human-message"], [class*="assistant-message"], [data-testid*="conversation-turn"]'
        );

        // Fallback: look for message containers
        let allMessages = messageElements.length > 0 ? messageElements :
            document.querySelectorAll('.prose, [class*="message"], main [class*="content"], main article');

        allMessages.forEach((el, index) => {
            // Skip UI areas (nav, header, aside)
            if (el.closest('nav, header, aside')) return;

            const textContent = (el.textContent || '').trim();
            if (textContent.length < 2) return;

            const isHuman = el.classList.contains('font-user-message') ||
                el.closest('[class*="human"]') ||
                el.getAttribute('data-role') === 'human';

            messages.push({
                id: `msg-${index}`,
                role: isHuman ? 'user' : 'assistant',
                element: el,
                content: el,
                text: textContent
            });
        });

        return messages;
    },

    // Get headings from a message in DOM order, including numbered/bold pseudo headings
    getHeadings(messageElement) {
        const headings = [];
        const seen = new Set();

        const candidates = messageElement.querySelectorAll('h1, h2, h3, h4, strong, b, p, li');

        candidates.forEach((node, i) => {
            if (node.closest('nav, header, aside')) return;

            const tag = node.tagName.toLowerCase();
            const text = (node.textContent || '').trim();
            if (text.length < 3 || text.length > 220) return;

            const key = text.slice(0, 80);
            if (seen.has(key)) return;

            let level = 0;

            // Real headings from markdown
            if (tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4') {
                level = parseInt(tag.charAt(1));
            } else {
                // Pseudo headings: numbered or bold section starters
                if (/^\d+\.\s+\w/.test(text)) {
                    level = 1;
                } else if ((tag === 'strong' || tag === 'b') && text.length < 160) {
                    if (text.endsWith(':') || text.includes(' - ') || text.includes(': ')) {
                        level = 2;
                    }
                } else if (tag === 'li' && /^\d+\.\s+\w/.test(text)) {
                    level = 2;
                }
            }

            if (level > 0) {
                seen.add(key);
                headings.push({
                    level,
                    text,
                    element: node,
                    id: `h${level}-${i}-${Date.now()}`
                });
            }
        });

        return headings;
    },

    // Get code blocks from a message
    getCodeBlocks(messageElement) {
        const blocks = [];
        const codeBlocks = messageElement.querySelectorAll('pre');

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
        return document.querySelector('[class*="conversation"]') ||
            document.querySelector('main');
    },

    // Detect if Claude is in dark or light mode
    getTheme() {
        try {
            const html = document.documentElement;
            const body = document.body;
            
            // Check for data-theme attribute
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
            
            // Default to dark (Claude's default seems to be dark)
            return 'dark';
        } catch (e) {
            return 'dark';
        }
    }
};
