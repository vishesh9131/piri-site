// Gemini Platform Parser
console.log('[Piri Gemini] Platform file loaded!');

window.PiriPlatforms = window.PiriPlatforms || {};

window.PiriPlatforms.gemini = {
    name: 'Gemini',

    // Check if we're on Gemini
    isActive() {
        try {
            const hostname = window.location.hostname || '';
            const isGemini = hostname.includes('gemini.google.com') || 
                             hostname.includes('bard.google.com') ||
                             hostname === 'gemini.google.com';
            console.log('[Piri Gemini] isActive check:', hostname, '=', isGemini);
            return isGemini;
        } catch (e) {
            console.log('[Piri Gemini] isActive error:', e);
            return false;
        }
    },
    
    // Check if on start/home page (no active conversation)
    isStartPage() {
        try {
            const path = window.location.pathname || '';
            console.log('[Piri Gemini] Checking isStartPage, path:', path);
            
            // If path has anything after /app/ it's a conversation
            // /app = start, /app/abc123 = conversation
            const hasId = path.length > 5 && path.startsWith('/app/');
            
            if (hasId) {
                console.log('[Piri Gemini] Has conversation ID, NOT start page');
                return false;
            }
            
            // Check for greeting as backup
            const h1 = document.querySelector('h1');
            const h1Text = h1?.textContent?.trim() || '';
            const hasGreeting = /^(Hi|Hello|Hey)\s/i.test(h1Text);
            
            const isStart = !hasId || hasGreeting;
            console.log('[Piri Gemini] isStartPage result:', isStart);
            return isStart;
        } catch (e) {
            console.log('[Piri Gemini] isStartPage error:', e);
            return false; // Default to NOT start page so we try to index
        }
    },

    // Get the main conversation container
    getConversationContainer() {
        // Gemini uses chat-app as main container
        return document.querySelector('main.chat-app') ||
               document.querySelector('.chat-app') ||
            document.querySelector('main');
    },

    // Get all message elements with proper heading detection
    getMessages() {
        try {
            if (this.isStartPage()) {
                return [];
            }
            
        const messages = [];

            // Find the chat content area (not sidebar)
            const chatArea = document.querySelector('main') || document.body;
            
            // Get headings, bold text (act as headings), and paragraphs
            const elements = chatArea.querySelectorAll('h1, h2, h3, h4, strong, b, p');
            
            const items = [];
            const seen = new Set();
            
            elements.forEach((el, idx) => {
                // Skip sidebar
                if (el.closest('.sidenav-with-history-container, [class*="sidenav"], aside, nav')) return;
                
                const text = (el.textContent || '').trim();
                if (text.length < 5 || text.length > 500) return;
                
                // Skip UI
                const lower = text.toLowerCase();
                if (lower.includes('gemini can make') || lower.startsWith('describe your')) return;
                if (lower === 'tools' || lower === 'gallery' || lower.startsWith('show thinking')) return;
                
                // Skip dupes
                const key = text.slice(0, 40);
                if (seen.has(key)) return;
                seen.add(key);
                
                const tag = el.tagName.toLowerCase();
                let level = 2; // default
                let type = 'paragraph';
                
                // Determine heading level
                if (tag === 'h1') { level = 1; type = 'heading'; }
                else if (tag === 'h2') { level = 1; type = 'heading'; }
                else if (tag === 'h3') { level = 2; type = 'heading'; }
                else if (tag === 'h4') { level = 3; type = 'heading'; }
                else if (tag === 'strong' || tag === 'b') {
                    // Bold text at start of section = heading
                    const parent = el.parentElement;
                    if (parent && text.length < 100) {
                        level = 2;
                        type = 'heading';
                    }
                }
                else if (tag === 'p') {
                    // Check if paragraph starts with number/bullet pattern
                    if (/^(\d+\.|[-*]|\w+:)\s/.test(text)) {
                        level = 3;
                        type = 'heading';
                    } else {
                        level = 3;
                        type = 'paragraph';
                    }
                }
                
                items.push({
                    id: `gm-${idx}`,
                element: el,
                    text: text,
                    level: level,
                    type: type,
                    role: 'assistant'
                });
            });
            
            // Convert to message format expected by buildTOC
            items.forEach(item => {
                messages.push({
                    id: item.id,
                    role: item.role,
                    element: item.element,
                    content: item.element,
                    text: item.text,
                    // These help buildTOC create hierarchy
                    detectedLevel: item.level,
                    detectedType: item.type
            });
        });

            console.log('[Piri Gemini] Messages:', messages.length);
        return messages;
        } catch (e) {
            console.log('[Piri Gemini] Err:', e);
            return [];
        }
    },

    // Get headings from a message in DOM order
    getHeadings(messageElement) {
        const headings = [];

        // Get all headings and also strong/bold text that acts as headings
        const allHeadings = messageElement.querySelectorAll('h1, h2, h3, h4, strong, b');

        allHeadings.forEach((h, i) => {
            let level = 3;
            const tagName = h.tagName.toLowerCase();
            
            if (tagName === 'h1') level = 1;
            else if (tagName === 'h2') level = 2;
            else if (tagName === 'h3') level = 3;
            else if (tagName === 'h4') level = 3;
            else if (tagName === 'strong' || tagName === 'b') {
                // Only treat as heading if it's at the start of a paragraph or standalone
                const parent = h.parentElement;
                if (parent && (parent.tagName === 'P' || parent.tagName === 'DIV')) {
                    const text = h.textContent?.trim() || '';
                    // Skip if too short or looks like inline emphasis
                    if (text.length < 3 || text.length > 100) return;
                    // Check if it starts the paragraph
                    const parentText = parent.textContent?.trim() || '';
                    if (!parentText.startsWith(text)) return;
                }
                level = 2;
            }
            
            const text = h.textContent?.trim() || '';
            if (text.length > 2) {
            headings.push({
                level: level,
                    text: text,
                element: h,
                id: `h${level}-${i}-${Date.now()}`
            });
            }
        });

        console.log('[Piri Gemini] Found headings in message:', headings.length);
        return headings;
    },

    // Get code blocks from a message
    getCodeBlocks(messageElement) {
        const blocks = [];
        const codeBlocks = messageElement.querySelectorAll('pre, code-block, [class*="code-block"]');

        codeBlocks.forEach((block, i) => {
            const language = block.getAttribute('data-language') ||
                block.className?.match(/language-(\w+)/)?.[1] ||
                'code';

            blocks.push({
                language,
                element: block,
                preview: block.textContent?.slice(0, 50) || '',
                id: `code-${i}-${Date.now()}`
            });
        });

        return blocks;
    },

    // Scroll container
    getScrollContainer() {
        return document.querySelector('main.chat-app') ||
               document.querySelector('.chat-app') ||
            document.querySelector('main');
    }
};
