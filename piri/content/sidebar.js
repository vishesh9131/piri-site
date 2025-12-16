// Piri - Main Sidebar Component with Platform-Specific Themes

// Global Ctrl+F handler - attach immediately to intercept before ChatGPT/Chrome
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        const sidebar = document.getElementById('piri-sidebar');
        if (sidebar) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            
            // Access state if available
            const piriState = window.piriState;
            
            // If sidebar is hidden, show it first
            const isHidden = sidebar.classList.contains('piri-hidden') || 
                             sidebar.style.display === 'none';
            
            if (isHidden) {
                sidebar.classList.remove('piri-hidden');
                sidebar.style.display = 'flex';
                sidebar.style.visibility = 'visible';
                if (piriState) {
                    piriState.visible = true;
                    piriState.manuallyClosed = false;
                }
            }
            
            // Focus search input
            setTimeout(() => {
                const searchInput = sidebar.querySelector('.piri-search-input');
                if (searchInput) {
                    searchInput.focus({ preventScroll: true });
                    searchInput.select();
                }
            }, 10);
            
            return false;
        }
    }
}, true); // Capture phase - runs before other handlers

(function () {
    'use strict';

    // Prevent multiple initializations
    if (window.piriInitialized) return;
    window.piriInitialized = true;

    // Platform-specific icons (SVG)
    const PLATFORM_ICONS = {
        chatgpt: `<svg viewBox="0 0 24 24" fill="none"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" fill="#10a37f"/></svg>`,
        claude: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="#d97706"/><circle cx="12" cy="12" r="4" fill="#d97706"/></svg>`,
        gemini: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285f4"/><path d="M2 17l10 5 10-5" stroke="#34a853" stroke-width="2"/><path d="M2 12l10 5 10-5" stroke="#ea4335" stroke-width="2"/></svg>`
    };

    // Icons
    const ICONS = {
        logo: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="url(#piri-grad)" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="url(#piri-grad)" stroke-width="2" stroke-linecap="round"/><defs><linearGradient id="piri-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#667eea"/><stop offset="100%" style="stop-color:#764ba2"/></linearGradient></defs></svg>`,
        search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
        close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
        menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h16M4 6h16M4 18h16"/></svg>`,
        export: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
        settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 10v6m-7.07-2.93 4.24-4.24m5.66-5.66 4.24-4.24M1 12h6m10 0h6M4.93 4.93l4.24 4.24m5.66 5.66 4.24 4.24"/></svg>`,
        list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
        code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>`,
        empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>`,
        piriLogo: `<svg viewBox="0 0 596 482" fill="none" style="width:80px;height:auto;"><path d="M286.978 480.667L0 480.403V463.183V445.966L165.553 446.261C256.609 446.426 331.109 446.47 331.109 446.361C331.109 445.959 72.2464 361.499 18.4068 344.333C13.3078 342.706 8.967 340.909 8.75871 340.332C8.5525 339.759 10.6667 332.492 13.4557 324.187C18.2173 310.009 18.6797 309.107 21.0147 309.44C22.3811 309.632 38.0718 314.618 55.8808 320.519C112.961 339.43 241.518 381.274 302.233 400.704C315.937 405.088 327.378 408.446 327.657 408.167C327.938 407.888 324.481 404.944 319.978 401.626C315.472 398.31 304.689 389.956 296.015 383.063C274.397 365.885 243.226 341.367 199.376 307.045C187.695 297.903 166.376 281.12 152 269.75C137.625 258.379 111.82 237.975 94.6566 224.404C77.4933 210.834 62.5337 198.999 61.4131 198.105C59.4239 196.518 59.4697 196.362 63.2544 191.857C65.3894 189.313 69.9135 183.604 73.3066 179.163C76.6997 174.722 80.0428 171.106 80.7343 171.121C82.0695 171.152 88.7182 176.268 132.77 211.134C147.93 223.134 164.837 236.49 170.344 240.816C212.946 274.278 230.209 287.875 244.336 299.088C291.972 336.895 329.247 365.967 329.615 365.598C329.844 365.369 323.889 354.202 316.378 340.78C308.869 327.357 288.615 291.069 271.37 260.137C254.124 229.206 234.115 193.354 226.904 180.465C199.068 130.706 189.195 112.92 183.827 102.876C180.767 97.1479 176.272 88.8599 173.843 84.4545C168.909 75.5167 168.936 75.3896 176.522 71.6362C178.532 70.6426 184.304 67.4744 189.344 64.5979C194.387 61.7193 198.657 59.5468 198.832 59.7697C199.353 60.43 219.93 97.4332 238.154 130.475C247.473 147.374 264.597 178.07 276.209 198.691C287.821 219.312 304.987 250.008 314.354 266.907C335.412 304.889 350.411 331.411 352.205 333.842C353.761 335.945 353.754 334.862 352.005 291.381C351.428 277.061 350.484 252.455 349.907 236.704C349.33 220.953 348.393 197.753 347.828 185.152C347.262 172.55 346.31 149.586 345.714 134.12C345.116 118.654 344.187 96.1585 343.648 84.1296C343.106 72.1006 342.404 52.8856 342.086 41.4295C341.767 29.9734 341.236 16.5489 340.905 11.5957L340.305 2.59122L344.652 1.86009C352.086 0.606165 372.324 -0.52696 373.196 0.260388C373.653 0.670725 374.461 11.0396 374.994 23.3018C375.525 35.564 376.444 56.1392 377.033 69.0283C378.341 97.5936 379.831 133.987 381.253 172.133C381.841 187.884 382.78 211.788 383.34 225.248C383.901 238.708 384.844 263.782 385.44 280.966C387.192 331.561 389.002 349.072 394.401 367.647C405.7 406.527 433.605 434.516 470.921 444.399C491.438 449.834 515.64 452.119 562.062 453.004L595.08 453.633L595.647 466.759C595.959 473.977 595.997 480.236 595.732 480.667C595.466 481.096 590.456 481.332 584.601 481.19C578.748 481.048 444.816 480.813 286.978 480.667Z" fill="currentColor"/><rect x="346" y="5.46" width="22.83" height="470.67" transform="rotate(-2.57 346 5.46)" fill="currentColor"/><rect x="177" y="80.15" width="22.83" height="386.98" transform="rotate(-29.23 177 80.15)" fill="currentColor"/><rect x="67.57" y="193.83" width="22.83" height="379.78" transform="rotate(-51.8 67.57 193.83)" fill="currentColor"/><rect x="15" y="338.72" width="22.83" height="379.78" transform="rotate(-72.05 15 338.72)" fill="currentColor"/><path d="M6 476L6 450L591 455.5L591 476L6 476Z" fill="currentColor"/></svg>`
    };

    // State
    let state = {
        visible: true,
        platform: null,
        platformKey: 'default',
        settings: {
            enabled: true,
            position: 'right',
            width: 320,
            theme: 'dark',
            autoShow: true
        },
        toc: [],
        searchQuery: '',
        filters: {
            role: 'all',
            level: 'all'
        },
        isResizing: false,
        expandedSections: new Set(),
        manuallyClosed: false,  // Track if user manually closed with X button
        lastSidebarState: null,  // Track last detected sidebar state
        stableStateCount: 0,      // Count how many times state has been stable
        lastHighlight: null,      // Track last highlighted element
        highlightTimeout: null,   // Timeout for removing highlight
    };
    
    // Expose state to window for global Ctrl+F handler
    window.piriState = state;

    // Detect current platform
    function detectPlatform() {
        console.log('[Piri] Detecting platform...');
        console.log('[Piri] Current URL:', window.location.href);
        console.log('[Piri] Hostname:', window.location.hostname);
        
        const platforms = window.PiriPlatforms || {};
        console.log('[Piri] Available platforms:', Object.keys(platforms));
        
        for (const [key, platform] of Object.entries(platforms)) {
            const isActive = platform.isActive();
            console.log(`[Piri] Checking ${key}: isActive = ${isActive}`);
            if (isActive) {
                state.platformKey = key;
                return platform;
            }
        }
        console.log('[Piri] No platform matched!');
        return null;
    }

    // Get settings from storage
    async function loadSettings() {
        return new Promise((resolve) => {
            try {
            if (chrome?.storage?.sync) {
                chrome.storage.sync.get(['enabled', 'position', 'width', 'theme', 'autoShow'], (result) => {
                    state.settings = { ...state.settings, ...result };
                    resolve(state.settings);
                });
            } else {
                    resolve(state.settings);
                }
            } catch (error) {
                // Extension context invalidated or other error
                // settings load failed, using defaults
                resolve(state.settings);
            }
        });
    }

    // Build TOC from conversation - preserving DOM order and hierarchy
    function buildTOC() {
        console.log('[Piri] buildTOC called, platformKey:', state.platformKey, 'platform:', !!state.platform);
        const platform = state.platform;
        if (!platform) {
            console.log('[Piri] buildTOC: No platform detected, state.platformKey:', state.platformKey);
            // Try to detect platform again if we have a key but no platform object
            if (state.platformKey && window.PiriPlatforms && window.PiriPlatforms[state.platformKey]) {
                state.platform = window.PiriPlatforms[state.platformKey];
                console.log('[Piri] Re-detected platform:', state.platformKey);
            } else {
                console.warn('[Piri] buildTOC: Platform detection failed, trying to re-detect...');
                state.platform = detectPlatform();
                if (!state.platform) {
                    console.error('[Piri] buildTOC: Still no platform after re-detection');
                    return [];
                }
            }
        }

        const toc = [];
        const isGemini = state.platformKey === 'gemini';
        const isClaude = state.platformKey === 'claude';
        
        // For Gemini and Claude, directly scan the page for headings
        if (isGemini || isClaude) {
            const allItems = [];
            const seenText = new Set();
            
            // Build a list of containers to scan (Claude needs aggressive fallbacks)
            const containers = [];
            if (isGemini) {
                containers.push(document.querySelector('main') || document.body);
            } else if (isClaude) {
                const c1 = document.querySelector('main [class*="conversation"]');
                const c2 = document.querySelector('[class*="Conversation"]');
                const c3 = document.querySelector('[data-testid*="conversation"]');
                const c4 = document.querySelector('main');
                // Claude doc viewer / document cards
                const c5 = document.querySelector('[class*="document"]');
                const c6 = document.querySelector('[role="document"]');
                const c7 = document.querySelector('[class*="Document"]');
                if (c1) containers.push(c1);
                if (c2) containers.push(c2);
                if (c3) containers.push(c3);
                if (c4) containers.push(c4);
                if (c5) containers.push(c5);
                if (c6) containers.push(c6);
                if (c7) containers.push(c7);
                containers.push(document.body);
            }
            
            console.log('[Piri] Scanning for headings, platform:', isGemini ? 'Gemini' : 'Claude', 'containers:', containers.length);
            
            // Collect elements from all containers
            let allElements = [];
            containers.forEach(c => {
                if (!c) return;
                if (isClaude) {
                    // Claude: STRICT — only actual heading tags
                    allElements.push(...c.querySelectorAll('h1, h2, h3, h4'));
                } else {
                    allElements.push(...c.querySelectorAll('h1, h2, h3, h4, strong, b, p, li'));
                }
            });
            allElements = Array.from(new Set(allElements));
            
            console.log('[Piri] Found', allElements.length, 'potential heading elements');
            
            allElements.forEach((el, idx) => {
                // Skip obvious UI containers
                if (isClaude) {
                    if (el.closest('nav, header, aside, [class*="sidebar"], [class*=\"nav\"], [class*=\"Sidebar\"]')) return;
                } else {
                    if (el.closest('.sidenav, [class*=\"sidenav\"], aside, nav, header, [class*=\"input\"]')) return;
                }
                
                const text = (el.textContent || '').trim();
                if (text.length < 3 || text.length > 200) return;
                
                // Skip UI text
                const lower = text.toLowerCase();
                if (isGemini) {
                    if (lower.includes('conversation with') || 
                        lower === 'gemini' ||
                        lower.includes('gemini can make') ||
                        lower === 'new chat' ||
                        lower === 'tools' ||
                        lower.startsWith('show thinking')) return;
                } else if (isClaude) {
                    // Keep filters minimal for Claude; allow doc content
                    if (lower === 'new chat' ||
                        lower === 'reply' ||
                        lower === 'claude' ||
                        lower.startsWith('hi,') ||
                        lower.startsWith('hello')) return;
                }
                
                // Skip duplicates
                const key = text.slice(0, 50);
                if (seenText.has(key)) return;
                
                const tagName = el.tagName.toLowerCase();
                let level = 0;
                
                // Real heading tags
                if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
                    level = parseInt(tagName.charAt(1));
                }
                // Gemini: allow numbered paragraphs/bold as headings
                else if (!isClaude) {
                    if (/^\d+\.\s+[A-Z]/.test(text)) {
                        level = 1;
                    } else if ((tagName === 'strong' || tagName === 'b') && text.length < 140) {
                        if (text.endsWith(':') || /^[A-Z][a-z]+(\s+[A-Z][a-z]+)*:?$/.test(text)) {
                            level = 2;
                        }
                    } else if (tagName === 'p' && /^\d+\.\s+[A-Z]/.test(text)) {
                        level = 1;
                    }
                }
                // Claude: ignore everything except h1-h4
                if (isClaude && level === 0) {
                    return;
                }
                // Skip list items and paragraphs for Claude to avoid bullets/points
                if (isClaude && (tagName === 'li' || tagName === 'p')) {
                    level = 0;
                }
                
                if (level > 0) {
                    seenText.add(key);
                    allItems.push({
                        id: getElementId(el),
                        type: 'heading',
                        role: 'assistant',
                        text: text.slice(0, 80),
                        element: el,
                        level: level
                    });
                    console.log('[Piri] Found heading:', text.slice(0, 50), 'level:', level);
                }
            });
            
            
            // If nothing found on Claude, try a relaxed second pass allowing paragraphs/li
            if (isClaude && allItems.length === 0) {
                console.log('[Piri] Claude fallback pass (allowing paragraphs/li)');
                const fallbackContainers = containers.length ? containers : [document.body];
                fallbackContainers.forEach(c => {
                    const elems = c.querySelectorAll('h1, h2, h3, h4, strong, b, p, li');
                    elems.forEach((el, idx) => {
                        if (el.closest('nav, header, aside, [class*="sidebar"], [class*="nav"], [class*="Sidebar"]')) return;
                        const text = (el.textContent || '').trim();
                        if (text.length < 3 || text.length > 220) return;
                        const key = text.slice(0, 50);
                        if (seenText.has(key)) return;
                        const tagName = el.tagName.toLowerCase();
                        let level = 0;
                        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') level = parseInt(tagName.charAt(1));
                        else if (/^\d+\.\s+[A-Z]/.test(text)) level = 1;
                        else if ((tagName === 'strong' || tagName === 'b') && text.length < 140) level = 2;
                        else if ((tagName === 'p' || tagName === 'li') && /^\d+\.\s+[A-Z]/.test(text)) level = 1;
                        if (level > 0) {
                            seenText.add(key);
                            allItems.push({
                                id: getElementId(el),
                                type: 'heading',
                                role: 'assistant',
                                text: text.slice(0, 80),
                                element: el,
                                level
                            });
                        }
                    });
                });
                console.log('[Piri] Claude fallback items:', allItems.length);
            }

            // Sort by DOM position
            allItems.sort((a, b) => {
                const posA = a.element.getBoundingClientRect().top;
                const posB = b.element.getBoundingClientRect().top;
                return posA - posB;
            });
            
            console.log(`[Piri] ${isGemini ? 'Gemini' : 'Claude'} TOC items found:`, allItems.length);
            if (allItems.length > 0) {
                console.log('[Piri] Items:', allItems.map(i => ({ text: i.text.slice(0, 40), level: i.level })));
            } else {
                console.warn('[Piri] No items found! Check if content is loaded. Containers scanned:', containers.length);
                // Debug: log what elements exist
                const debugElements = document.querySelectorAll('h1, h2, h3, h4');
                console.log('[Piri] Debug: Found', debugElements.length, 'heading tags in document');
                if (debugElements.length > 0) {
                    console.log('[Piri] Debug: First few headings:', Array.from(debugElements.slice(0, 5)).map(h => ({
                        tag: h.tagName,
                        text: h.textContent?.slice(0, 50),
                        visible: h.offsetParent !== null
                    })));
                }
            }
            return allItems;
        }

        const messages = platform.getMessages();

        // Build a flat list of all headings and code blocks in DOM order
        const allItems = [];
        
        messages.forEach((msg, msgIndex) => {
            // Find the content container (platform-specific)
            let content = msg.element;
            if (state.platformKey === 'chatgpt') {
                content = msg.element.querySelector('.markdown') || msg.element;
            } else {
                // For Claude, use the element directly or find prose/content area
                content = msg.element.querySelector('.prose, [class*="prose"], [class*="content"]') || msg.element;
            }
            
            if (!content) return;

            let foundHeadings = false;
            const isGemini = state.platformKey === 'gemini';
            const isClaude = state.platformKey === 'claude';

            // Look for heading tags and code blocks
            // On Gemini/Claude, also look for bold text (### renders as bold, not h3)
            const walker = document.createTreeWalker(
                content,
                NodeFilter.SHOW_ELEMENT,
                {
                    acceptNode: function(node) {
                        const tagName = node.tagName?.toLowerCase();
                        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'pre') {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        // On Gemini/Claude, check bold/strong for numbered headings
                        if ((isGemini || isClaude) && (tagName === 'strong' || tagName === 'b' || tagName === 'p')) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                        return NodeFilter.FILTER_SKIP;
                    }
                }
            );

            let node;
            const seenText = new Set();
            while (node = walker.nextNode()) {
                const tagName = node.tagName?.toLowerCase();
                const text = node.textContent?.trim() || '';
                
                // Skip empty or very short text
                if (text.length < 2) continue;
                
                // Skip duplicates
                const textKey = text.slice(0, 50);
                if (seenText.has(textKey)) continue;
                seenText.add(textKey);
                
                if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
                    const level = parseInt(tagName.charAt(1));
                    foundHeadings = true;
                    allItems.push({
                        id: getElementId(node),
                    type: 'heading',
                    role: msg.role,
                        text: text,
                        element: node,
                        level: level
                });
                } else if (isGemini && (tagName === 'strong' || tagName === 'b' || tagName === 'p')) {
                    // Gemini render ### as bold text, detect numbered sections
                    if (/^\d+\.\s+[A-Z]/.test(text) && text.length > 10 && text.length < 150) {
                        foundHeadings = true;
                        seenText.add(textKey);
                        allItems.push({
                            id: getElementId(node),
                            type: 'heading',
                            role: msg.role,
                            text: text.length > 60 ? text.slice(0, 60) + '...' : text,
                            element: node,
                            level: 1
                        });
                    }
                } else if (tagName === 'pre') {
                    const codeElement = node.querySelector('code');
                    const language = codeElement?.className?.match(/language-(\w+)/)?.[1] || 
                                   codeElement?.getAttribute('data-language') ||
                                   'code';
                    foundHeadings = true;
                    allItems.push({
                        id: getElementId(node),
                    type: 'code',
                    role: msg.role,
                        text: `${language}: ${codeElement?.textContent?.slice(0, 50) || ''}...`,
                        element: node,
                    level: 0
                });
                }
            }
            });

        // Items are already in DOM order from TreeWalker, so add them directly
        allItems.forEach(item => {
            toc.push(item);
        });

        return toc;
    }

    // Build hierarchical TOC structure - using DOM-based hierarchy detection
    function buildHierarchicalTOC() {
        const filtered = getFilteredTOC();
        const allItems = filtered.filter(item => item.type === 'heading' || item.type === 'code');
        
        // Items are already in DOM order from buildTOC, so we can build hierarchy directly
        const hierarchy = [];
        const stack = []; // Stack to track parent items: [H1, H2]
        
        allItems.forEach((item) => {
            if (item.type === 'heading') {
                // Remove items from stack that are at same or higher level
                while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
                    stack.pop();
                }
                
                const itemWithChildren = {
                    ...item,
                    children: []
                };
                
                // Add to appropriate parent or top level
                if (stack.length === 0) {
                    hierarchy.push(itemWithChildren);
                } else {
                    const parent = stack[stack.length - 1];
                    parent.children.push(itemWithChildren);
                }
                
                // Push this item onto stack as potential parent
                stack.push(itemWithChildren);
            } else if (item.type === 'code') {
                // Code blocks belong to the most recent heading in the stack
                if (stack.length > 0) {
                    const parent = stack[stack.length - 1];
                    parent.children.push(item);
                } else {
                    // No parent, add to top level
                    hierarchy.push(item);
                }
            }
        });
        
        return hierarchy;
    }

    // Filter TOC
    function getFilteredTOC() {
        let filtered = state.toc;

        if (state.searchQuery) {
            const query = state.searchQuery.toLowerCase();
            filtered = filtered.filter(item =>
                item.text.toLowerCase().includes(query)
            );
        }

        if (state.filters.role !== 'all') {
            filtered = filtered.filter(item => item.role === state.filters.role);
        }

        if (state.filters.level !== 'all') {
            if (state.filters.level === 'code') {
                filtered = filtered.filter(item => item.type === 'code');
            } else {
                const level = parseInt(state.filters.level.replace('h', ''));
                filtered = filtered.filter(item => item.type === 'heading' && item.level === level);
            }
        }

        return filtered;
    }

    // Get platform icon
    function getPlatformIcon() {
        return PLATFORM_ICONS[state.platformKey] || ICONS.logo;
    }

    // Get platform sidebar width (for "between" position)
    function getPlatformSidebarWidth() {
        console.log('[Piri Debug] getPlatformSidebarWidth called, platform:', state.platformKey);
        
        if (state.platformKey === 'chatgpt') {
            let sidebar = document.querySelector('nav[aria-label*="Chat history"]') ||
                         document.querySelector('aside[aria-label*="Chat history"]') ||
                         document.querySelector('[data-testid*="sidebar"]') ||
                         document.querySelector('nav[aria-label*="Chat"]');
            if (!sidebar) {
                const navs = document.querySelectorAll('nav');
                if (navs.length > 0) {
                    // Find the leftmost nav (ChatGPT's sidebar is usually on the left)
                    sidebar = Array.from(navs).find(nav => {
                        const rect = nav.getBoundingClientRect();
                        return rect.left < window.innerWidth / 2;
                    }) || navs[0];
                }
            }
            
            // Fallback: Check if main content starts at left edge (sidebar is closed)
            const main = document.querySelector('main');
            if (main) {
                const mainRect = main.getBoundingClientRect();
                // If main content starts very close to left edge (within 20px), sidebar is likely closed
                if (mainRect.left < 20) {
                    return 0;
                }
            }
            
            if (sidebar) {
                const rect = sidebar.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(sidebar);
                const transform = computedStyle.transform;
                
                // Check if sidebar is off-screen (negative left position or transform)
                const isOffScreen = rect.left < -50 || rect.right < 0;
                const hasHideTransform = transform && transform !== 'none' && 
                                       (transform.includes('translateX(-') || transform.includes('translate(-'));
                
                // Check for hidden classes or attributes
                const hasHiddenClass = sidebar.classList.toString().toLowerCase().includes('hidden') ||
                                      sidebar.classList.toString().toLowerCase().includes('close') ||
                                      sidebar.classList.toString().toLowerCase().includes('collapse');
                const ariaHidden = sidebar.getAttribute('aria-hidden') === 'true';
                
                // Check if sidebar is actually visible and on screen
                const isVisible = rect.width > 10 && 
                                 rect.left >= -5 && // Allow small negative for edge cases
                                 rect.right > 0 &&
                                 computedStyle.display !== 'none' && 
                                 computedStyle.visibility !== 'hidden' &&
                                 computedStyle.opacity !== '0' &&
                                 !isOffScreen &&
                                 !hasHideTransform &&
                                 !hasHiddenClass &&
                                 !ariaHidden;
                
                if (isVisible) {
                    return rect.width;
                }
            }
            // Sidebar is closed, return 0
            return 0;
        } else if (state.platformKey === 'claude') {
            const sidebar = document.querySelector('[class*="sidebar"], aside');
            if (sidebar) {
                const rect = sidebar.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(sidebar);
                const isVisible = rect.width > 0 && 
                                 computedStyle.display !== 'none' && 
                                 computedStyle.visibility !== 'hidden';
                if (isVisible) {
                    return rect.width || 240;
                }
            }
            return 0;
        } else if (state.platformKey === 'gemini') {
            // Gemini uses sidenav-with-history-container
            let sidebar = document.querySelector('[class*="sidenav-with-history-container"]') ||
                         document.querySelector('[class*="sidenav"]') ||
                         document.querySelector('aside[class*="side-nav"]');
            
            console.log('[Piri Debug] Gemini sidebar element:', sidebar);
            
            if (sidebar) {
                const rect = sidebar.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(sidebar);
                const isExpanded = sidebar.classList.contains('expanded');
                
                console.log('[Piri Debug] Sidebar rect.width:', rect.width, 'isExpanded:', isExpanded);
                
                // Check if sidebar is visible and expanded
                const isVisible = rect.width > 50 && 
                                 computedStyle.display !== 'none' && 
                                 computedStyle.visibility !== 'hidden';
                
                if (isVisible && isExpanded) {
                    console.log('[Piri Debug] Returning sidebar width:', rect.width);
                    return rect.width;
                }
            }
            
            console.log('[Piri Debug] Gemini sidebar closed or not found');
            return 0;
        }
        return 0;
    }

    // Update sidebar position for "between" mode - SIMPLIFIED for performance
    function updateBetweenPosition() {
        const sidebar = document.getElementById('piri-sidebar');
        const toggle = document.getElementById('piri-toggle');
        
        console.log('[Piri Debug] updateBetweenPosition called');
        console.log('[Piri Debug] sidebar:', !!sidebar, 'has between class:', sidebar?.classList.contains('piri-position-between'));
        
        if (!sidebar || !sidebar.classList.contains('piri-position-between')) {
            adjustMainContentForSidebar(false);
            return;
        }

        // Don't update if user is currently interacting
        if (state.isResizing) {
            return;
        }

        // Use getPlatformSidebarWidth which has comprehensive detection
        const platformSidebarWidth = getPlatformSidebarWidth();
        console.log('[Piri Debug] platformSidebarWidth:', platformSidebarWidth);
        
        // Also check main content position as backup
        const main = document.querySelector('main, [class*="conversation"]');
        const mainLeft = main ? main.getBoundingClientRect().left : 0;
        
        // Determine if platform sidebar is closed based on platform
        let isPlatformSidebarClosed = false;
        
        if (state.platformKey === 'chatgpt') {
            // ChatGPT collapsed icon strip is ~60-80px
            isPlatformSidebarClosed = platformSidebarWidth === 0 || 
                                      platformSidebarWidth < 150 || 
                                      mainLeft < 100;
        } else if (state.platformKey === 'gemini') {
            // Gemini sidebar - just check if we detected a width
            // Don't use mainLeft because Gemini's main is always at 0
            isPlatformSidebarClosed = platformSidebarWidth === 0 || platformSidebarWidth < 100;
        } else if (state.platformKey === 'claude') {
            // Claude: avoid flicker by using only width check and higher threshold
            isPlatformSidebarClosed = platformSidebarWidth === 0 || platformSidebarWidth < 120;
        } else {
            isPlatformSidebarClosed = platformSidebarWidth === 0 || mainLeft < 50;
        }
        
        const currentlyHidden = sidebar.classList.contains('piri-hidden') || sidebar.style.display === 'none';
        
        // Stability check - only change state if it's been stable for a few checks
        const requiredStable = state.platformKey === 'claude' ? 4 : 3;
        const newState = isPlatformSidebarClosed ? 'closed' : 'open';
        
        console.log('[Piri Debug] isPlatformSidebarClosed:', isPlatformSidebarClosed, 'newState:', newState);
        console.log('[Piri Debug] mainLeft:', mainLeft, 'platformSidebarWidth:', platformSidebarWidth);
        
        if (state.lastSidebarState === newState) {
            state.stableStateCount++;
        } else {
            state.lastSidebarState = newState;
            state.stableStateCount = 1;
        }
        
        // Require 3 stable checks before changing visibility (600ms at 200ms interval)
        const isStable = state.stableStateCount >= requiredStable;
        console.log('[Piri Debug] stableStateCount:', state.stableStateCount, 'isStable:', isStable);
        
        if (isPlatformSidebarClosed && isStable) {
            // Hide Piri if platform sidebar is closed
            if (!currentlyHidden) {
            sidebar.style.display = 'none';
            sidebar.style.visibility = 'hidden';
                sidebar.classList.add('piri-hidden');
                state.visible = false;
                state.manuallyClosed = false;
                if (toggle) {
                    toggle.classList.remove('piri-hidden');
                    toggle.style.display = 'flex';
                }
            adjustMainContentForSidebar(false);
            }
        } else if (!isPlatformSidebarClosed && isStable) {
            // Show Piri if platform sidebar is open, BUT respect manual close
            if (state.manuallyClosed) {
            return;
        }
        
            if (currentlyHidden) {
        sidebar.style.display = 'flex';
        sidebar.style.visibility = 'visible';
                sidebar.style.pointerEvents = 'auto';
                sidebar.classList.remove('piri-hidden');
                state.visible = true;
                if (toggle) {
                    toggle.classList.add('piri-hidden');
                }
            }
            
            // Update position only if changed significantly
            const currentLeft = parseInt(sidebar.style.left) || 0;
            if (Math.abs(currentLeft - platformSidebarWidth) > 2) {
        sidebar.style.left = `${platformSidebarWidth}px`;
        sidebar.style.right = 'auto';
            }
        
        adjustMainContentForSidebar(true);
        } else if (!isPlatformSidebarClosed && !currentlyHidden) {
            // Update position even when not stable, but don't change visibility
            const currentLeft = parseInt(sidebar.style.left) || 0;
            if (Math.abs(currentLeft - platformSidebarWidth) > 2) {
                sidebar.style.left = `${platformSidebarWidth}px`;
                sidebar.style.right = 'auto';
            }
        }
    }
    
    // Adjust main content area to accommodate Piri sidebar
    function adjustMainContentForSidebar(shouldAdjust) {
        const sidebar = document.getElementById('piri-sidebar');
        if (!sidebar) return;
        
        const isBetween = state.settings.position === 'between';
        const isRight = state.settings.position === 'right';
        const isLeft = state.settings.position === 'left';
        
        if (!shouldAdjust || sidebar.classList.contains('piri-hidden')) {
            // Remove any adjustments we made
            const adjustedElements = document.querySelectorAll('[data-piri-adjusted]');
            adjustedElements.forEach(el => {
                el.style.marginLeft = '';
                el.style.marginRight = '';
                el.style.paddingRight = '';
                el.style.transition = '';
                el.removeAttribute('data-piri-adjusted');
            });
            return;
        }
        
        // If position doesn't require adjustment, return early
        if (!isBetween && !isRight && !isLeft) {
            return;
        }
        
        const sidebarWidth = sidebar.offsetWidth || state.settings.width;
        const platformSidebarWidth = getPlatformSidebarWidth();
        
        // Find the main content area (chat area)
        let mainContent = null;
        if (state.platformKey === 'chatgpt') {
            mainContent = document.querySelector('main > div[class*="flex"]:not(nav)') ||
                         document.querySelector('main > div > div[class*="flex"]') ||
                         document.querySelector('main [class*="overflow-hidden"]') ||
                         document.querySelector('main > div:last-child');
        } else if (state.platformKey === 'claude') {
            mainContent = document.querySelector('main > div[class*="flex"]') ||
                         document.querySelector('[class*="conversation"] > div');
        } else if (state.platformKey === 'gemini') {
            mainContent = document.querySelector('[class*="conversation-container"]') ||
                         document.querySelector('[class*="chat-container"]') ||
                         document.querySelector('main[class*="content"]') ||
                         document.querySelector('main > div:first-child') ||
                         document.querySelector('main');
        }
        
        if (!mainContent) return;
        
        if (isBetween) {
            // For between mode: adjust left margin to account for sidebar
            // Always update to match current sidebar width
            mainContent.style.marginLeft = `${sidebarWidth}px`;
            mainContent.style.transition = 'margin-left 0.2s ease';
            mainContent.setAttribute('data-piri-adjusted', 'true');
        } else if (isLeft) {
            // For left position: adjust left margin to account for sidebar
            // Always update to match current sidebar width
            mainContent.style.marginLeft = `${sidebarWidth}px`;
            mainContent.style.transition = 'margin-left 0.2s ease';
            mainContent.setAttribute('data-piri-adjusted', 'true');
        } else if (isRight) {
            // For right position: adjust right margin/padding to prevent overlap
            // Always update to match current sidebar width
            const currentMarginRight = parseInt(window.getComputedStyle(mainContent).marginRight) || 0;
            const currentPaddingRight = parseInt(window.getComputedStyle(mainContent).paddingRight) || 0;
            
            // Prefer margin-right, but if it was using padding-right, continue with that
            if (mainContent.hasAttribute('data-piri-adjusted') && currentPaddingRight > 0 && currentMarginRight === 0) {
                mainContent.style.paddingRight = `${sidebarWidth}px`;
                mainContent.style.transition = 'padding-right 0.2s ease';
            } else {
                mainContent.style.marginRight = `${sidebarWidth}px`;
                mainContent.style.transition = 'margin-right 0.2s ease';
            }
            mainContent.setAttribute('data-piri-adjusted', 'true');
        }
    }

    // Setup watchers for platform sidebar changes - SIMPLIFIED to prevent performance issues
    function setupBetweenPositionWatcher() {
        if (state.settings.position !== 'between') {
            return;
        }

        // Run initial check
                updateBetweenPosition();
        
        // Use a frequent interval to catch sidebar collapse quickly
        const checkInterval = 200; // Check every 200ms for responsiveness
        
        const intervalId = setInterval(() => {
            if (state.settings.position === 'between' && !state.isResizing) {
                updateBetweenPosition();
            } else if (state.settings.position !== 'between') {
                clearInterval(intervalId);
            }
        }, checkInterval);
        
        // Also check on window resize (when user might toggle sidebar)
        let resizeTimeout = null;
        window.addEventListener('resize', () => {
            if (resizeTimeout) return;
            resizeTimeout = setTimeout(() => {
            if (state.settings.position === 'between') {
                updateBetweenPosition();
            }
                resizeTimeout = null;
        }, 100);
        });
    }

    // Get platform theme mode (ChatGPT or Claude)
    function getPlatformTheme() {
        if (state.platform?.getTheme) {
            return state.platform.getTheme();
        }
        // Default based on platform
        if (state.platformKey === 'chatgpt') {
            return 'light';
        }
        if (state.platformKey === 'claude') {
            return 'dark';
        }
        return 'light';
    }

    // Create sidebar HTML
    function createSidebar() {
        const sidebar = document.createElement('div');
        sidebar.id = 'piri-sidebar';
        
        let platformClass = `piri-platform-${state.platformKey}`;
        if (state.platformKey === 'chatgpt' || state.platformKey === 'claude') {
            const theme = getPlatformTheme();
        if (state.platformKey === 'chatgpt') {
            platformClass += ` piri-chatgpt-${theme}`;
            } else if (state.platformKey === 'claude') {
                platformClass += ` piri-claude-${theme}`;
            }
        }
        
        sidebar.className = `piri-sidebar piri-position-${state.settings.position} piri-theme-${state.settings.theme} ${platformClass}`;
        sidebar.style.width = `${state.settings.width}px`;

        if (!state.visible) {
            sidebar.classList.add('piri-hidden');
            sidebar.style.display = 'none';
        } else {
            sidebar.style.display = 'flex';
        }

        if (state.settings.position === 'between') {
            updateBetweenPosition();
        }

        const platformName = state.platform?.name || 'AI Chat';
        const platformIcon = getPlatformIcon();
        
        let logoContent = '';
        if (state.platformKey === 'chatgpt') {
            logoContent = `<span class="piri-logo-text">ChatGPT X Piri</span>`;
        } else if (state.platformKey === 'gemini') {
            // Simple Piri text for Gemini - flat style
            logoContent = `<span class="piri-logo-text">Piri</span>`;
        } else if (state.platformKey === 'claude') {
            // Piri logo for Claude - flat style, smaller size
            const claudeLogo = ICONS.piriLogo.replace('style="width:80px;height:auto;"', '');
            logoContent = `
          <div class="piri-logo-icon">
            ${claudeLogo}
          </div>
          <span class="piri-logo-text">Piri</span>`;
        } else {
            logoContent = `
          <div class="piri-logo-icon">
            ${platformIcon}
          </div>
          <span class="piri-logo-text">Piri</span>`;
        }

        sidebar.innerHTML = `
      <div class="piri-resize-handle"></div>
      
      <header class="piri-header">
        <div class="piri-logo">
          ${logoContent}
          </div>
        <div class="piri-header-actions">
          <button class="piri-btn piri-btn-close" title="Close">
            ${ICONS.close}
          </button>
        </div>
      </header>

      <div class="piri-search">
        <div class="piri-search-wrapper">
          <span class="piri-search-icon">${ICONS.search}</span>
          <input type="text" class="piri-search-input" placeholder="Search sections...">
        </div>
      </div>

      <div class="piri-filters">
        <button class="piri-filter-btn piri-active" data-filter="all">All</button>
        <button class="piri-filter-btn" data-filter="user">User</button>
        <button class="piri-filter-btn" data-filter="assistant">Assistant</button>
        <button class="piri-filter-btn" data-filter="h1">H1</button>
        <button class="piri-filter-btn" data-filter="h2">H2</button>
        <button class="piri-filter-btn" data-filter="h3">H3</button>
        <button class="piri-filter-btn" data-filter="code">Code</button>
      </div>

      <div class="piri-content">
        ${renderTOC()}
      </div>

      <footer class="piri-footer">
        <button class="piri-footer-btn piri-export-md" title="Export as Markdown">
          ${ICONS.export}
          <span>Markdown</span>
        </button>
        <button class="piri-footer-btn piri-export-json" title="Export as JSON">
          ${ICONS.export}
          <span>JSON</span>
        </button>
      </footer>
    `;

        return sidebar;
    }

    // Render TOC items
    function renderTOC() {
        const hierarchy = buildHierarchicalTOC();

        if (hierarchy.length === 0) {
            return `
        <div class="piri-empty">
          <div class="piri-empty-icon">${ICONS.piriLogo}</div>
          <div class="piri-empty-title">No sections found</div>
          <div class="piri-empty-subtitle">
            ${state.searchQuery ? 'Try a different search term' : 'Start a conversation to see the table of contents'}
          </div>
        </div>
      `;
        }

        function renderItem(item, level = 0, parentId = null) {
            const itemId = item.id || `item-${Date.now()}-${Math.random()}`;
            const hasChildren = item.children && item.children.length > 0;
            
            // Auto-expand H1 and H2 items that have children
            if (hasChildren) {
                if ((item.type === 'heading' && item.level === 1) || 
                    (item.type === 'heading' && item.level === 2)) {
                    if (!state.expandedSections.has(itemId)) {
                        state.expandedSections.add(itemId);
                    }
                }
            }
            
            const isExpanded = state.expandedSections.has(itemId);
            const indent = level * 16;
            
        let html = '';

            if (item.type === 'heading' && item.level === 1) {
                const chevronIcon = hasChildren 
                    ? (isExpanded 
                        ? `<svg class="piri-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                        : `<svg class="piri-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`)
                    : '';
                
                html += `
          <div class="piri-outline-item piri-outline-h1 ${isExpanded ? 'piri-expanded' : ''}" data-id="${itemId}" data-level="${item.level}" style="padding-left: ${indent}px">
            <div class="piri-outline-content">
              ${hasChildren ? `<span class="piri-chevron-wrapper" data-toggle="${itemId}">${chevronIcon}</span>` : '<span style="width: 12px; display: inline-block;"></span>'}
              <span class="piri-outline-icon piri-h1">H1</span>
              <span class="piri-outline-text">${escapeHtml(item.text)}</span>
            </div>
            ${hasChildren && isExpanded ? `
            <div class="piri-outline-children">
              ${item.children.map(child => renderItem(child, level + 1, itemId)).join('')}
            </div>
            ` : ''}
          </div>
        `;
            } else if (item.type === 'heading' && item.level === 2) {
                const chevronIcon = hasChildren 
                    ? (isExpanded 
                        ? `<svg class="piri-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
                        : `<svg class="piri-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`)
                    : '';

            html += `
          <div class="piri-outline-item piri-outline-h2 ${isExpanded ? 'piri-expanded' : ''}" data-id="${itemId}" data-level="${item.level}" style="padding-left: ${indent}px">
            <div class="piri-outline-content">
              ${hasChildren ? `<span class="piri-chevron-wrapper" data-toggle="${itemId}">${chevronIcon}</span>` : '<span style="width: 12px; display: inline-block;"></span>'}
              <span class="piri-outline-icon piri-h2">H2</span>
              <span class="piri-outline-text">${escapeHtml(item.text)}</span>
          </div>
            ${hasChildren && isExpanded ? `
            <div class="piri-outline-children">
              ${item.children.map(child => renderItem(child, level + 1, itemId)).join('')}
            </div>
            ` : ''}
        </div>
      `;
            } else if (item.type === 'heading' && item.level === 3) {
                html += `
          <div class="piri-outline-item piri-outline-h3" data-id="${itemId}" data-level="${item.level}" style="padding-left: ${indent}px">
            <div class="piri-outline-content">
              <span style="width: 12px; display: inline-block;"></span>
              <span class="piri-outline-icon piri-h3">H3</span>
              <span class="piri-outline-text">${escapeHtml(item.text)}</span>
            </div>
          </div>
        `;
            } else if (item.type === 'code') {
                html += `
          <div class="piri-outline-item piri-outline-code" data-id="${itemId}" data-level="0" style="padding-left: ${indent}px">
            <div class="piri-outline-content">
              <span style="width: 12px; display: inline-block;"></span>
              <span class="piri-outline-icon piri-code">{ }</span>
              <span class="piri-outline-text">${escapeHtml(item.text)}</span>
            </div>
          </div>
        `;
            }
            
            return html;
        }

        let html = '';
        hierarchy.forEach(item => {
            html += renderItem(item);
        });

        return html;
    }

    // Initialize ID counter if not exists
    if (!state.idCounter) {
        state.idCounter = 0;
    }

    // Generate stable ID for elements
    function getElementId(el) {
        if (!el) return `piri-${++state.idCounter}`;
        if (!el.dataset.piriId) {
            el.dataset.piriId = `piri-${++state.idCounter}`;
        }
        return el.dataset.piriId;
    }

    // Find element by Piri ID - more reliable than stored references
    function findElementById(id) {
        if (!id) return null;
        
        // First try to find by data attribute
        const byDataAttr = document.querySelector(`[data-piri-id="${id}"]`);
        if (byDataAttr) {
            return byDataAttr;
        }
        
        // Fallback: search all headings and match by ID
        const allHeadings = document.querySelectorAll('h1, h2, h3, h4, strong, b, p, li');
        for (const heading of allHeadings) {
            if (heading.dataset.piriId === id) {
                return heading;
            }
        }
        
        return null;
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Apply highlight to chat screen element
    function applyHighlight(target) {
        if (!target) return;

        // Clear previous highlights
        if (state.lastHighlight) {
            if (Array.isArray(state.lastHighlight)) {
                state.lastHighlight.forEach(t => {
                    if (t && t.classList && document.contains(t)) {
                        t.classList.remove('piri-target-highlight');
                    }
                });
            } else if (state.lastHighlight.classList && document.contains(state.lastHighlight)) {
                state.lastHighlight.classList.remove('piri-target-highlight');
            }
        }

        // Verify element is still in DOM before highlighting
        if (!document.contains(target)) {
            return;
        }

        // Apply highlight to the target
        target.classList.add('piri-target-highlight');
        state.lastHighlight = target;

        // Set timeout to remove highlight
        if (state.highlightTimeout) {
            clearTimeout(state.highlightTimeout);
        }
        
        state.highlightTimeout = setTimeout(() => {
            if (state.lastHighlight && state.lastHighlight.classList && document.contains(state.lastHighlight)) {
                state.lastHighlight.classList.remove('piri-target-highlight');
            }
            state.lastHighlight = null;
            state.highlightTimeout = null;
        }, 3000);
    }

    // Scroll to element - accepts element or ID
    function scrollToElement(elementOrId) {
        let element = null;
        
        // If it's a string, treat it as an ID and find the element
        if (typeof elementOrId === 'string') {
            element = findElementById(elementOrId);
        } else {
            element = elementOrId;
        }
        
        if (!element) {
            console.warn('[Piri] scrollToElement: Element not found', elementOrId);
            return;
        }

        // Verify element is still in DOM
        if (!document.contains(element)) {
            // Try to find by ID if element is stale
            const tocItem = state.toc.find(t => t.element === element);
            if (tocItem && tocItem.id) {
                element = findElementById(tocItem.id);
                if (!element) {
                    console.warn('[Piri] scrollToElement: Element not in DOM and ID lookup failed', tocItem.id);
                    return;
                }
            } else {
                console.warn('[Piri] scrollToElement: Element not in DOM', element);
                return;
            }
        }

        // Apply highlight to chat screen element
        applyHighlight(element);
        
        // Scroll to element
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Export to Markdown
    function exportToMarkdown() {
        const messages = state.platform?.getMessages() || [];
        let markdown = `# Chat Export\n\n_Exported by Piri on ${new Date().toLocaleString()}_\n\n---\n\n`;

        messages.forEach((msg) => {
            const role = msg.role === 'user' ? '**You:**' : '**Assistant:**';
            markdown += `${role}\n\n${msg.text}\n\n---\n\n`;
        });

        downloadFile(markdown, 'chat-export.md', 'text/markdown');
    }

    // Export to JSON
    function exportToJSON() {
        const messages = state.platform?.getMessages() || [];
        const data = {
            exportedAt: new Date().toISOString(),
            platform: state.platform?.name || 'Unknown',
            messages: messages.map(msg => ({
                role: msg.role,
                content: msg.text
            })),
            tableOfContents: state.toc.map(item => ({
                type: item.type,
                role: item.role,
                text: item.text,
                level: item.level
            }))
        };

        downloadFile(JSON.stringify(data, null, 2), 'chat-export.json', 'application/json');
    }

    // Download file
    function downloadFile(content, filename, contentType) {
        const blob = new Blob([content], { type: contentType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Create toggle button
    function createToggleButton() {
        const toggle = document.createElement('button');
        toggle.id = 'piri-toggle';
        toggle.className = `piri-toggle piri-platform-${state.platformKey}`;
        // Use Piri icon instead of hamburger menu
        toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 596 482" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M286.978 480.667L0 480.403V463.183V445.966L165.553 446.261C256.609 446.426 331.109 446.47 331.109 446.361C331.109 445.959 72.2464 361.499 18.4068 344.333C13.3078 342.706 8.967 340.909 8.75871 340.332C8.5525 339.759 10.6667 332.492 13.4557 324.187C18.2173 310.009 18.6797 309.107 21.0147 309.44C22.3811 309.632 38.0718 314.618 55.8808 320.519C112.961 339.43 241.518 381.274 302.233 400.704C315.937 405.088 327.378 408.446 327.657 408.167C327.938 407.888 324.481 404.944 319.978 401.626C315.472 398.31 304.689 389.956 296.015 383.063C274.397 365.885 243.226 341.367 199.376 307.045C187.695 297.903 166.376 281.12 152 269.75C137.625 258.379 111.82 237.975 94.6566 224.404C77.4933 210.834 62.5337 198.999 61.4131 198.105C59.4239 196.518 59.4697 196.362 63.2544 191.857C65.3894 189.313 69.9135 183.604 73.3066 179.163C76.6997 174.722 80.0428 171.106 80.7343 171.121C82.0695 171.152 88.7182 176.268 132.77 211.134C147.93 223.134 164.837 236.49 170.344 240.816C212.946 274.278 230.209 287.875 244.336 299.088C291.972 336.895 329.247 365.967 329.615 365.598C329.844 365.369 323.889 354.202 316.378 340.78C308.869 327.357 288.615 291.069 271.37 260.137C254.124 229.206 234.115 193.354 226.904 180.465C199.068 130.706 189.195 112.92 183.827 102.876C180.767 97.1479 176.272 88.8599 173.843 84.4545C168.909 75.5167 168.936 75.3896 176.522 71.6362C178.532 70.6426 184.304 67.4744 189.344 64.5979C194.387 61.7193 198.657 59.5468 198.832 59.7697C199.353 60.43 219.93 97.4332 238.154 130.475C247.473 147.374 264.597 178.07 276.209 198.691C287.821 219.312 304.987 250.008 314.354 266.907C335.412 304.889 350.411 331.411 352.205 333.842C353.761 335.945 353.754 334.862 352.005 291.381C351.428 277.061 350.484 252.455 349.907 236.704C349.33 220.953 348.393 197.753 347.828 185.152C347.262 172.55 346.31 149.586 345.714 134.12C345.116 118.654 344.187 96.1585 343.648 84.1296C343.106 72.1006 342.404 52.8856 342.086 41.4295C341.767 29.9734 341.236 16.5489 340.905 11.5957L340.305 2.59122L344.652 1.86009C352.086 0.606165 372.324 -0.52696 373.196 0.260388C373.653 0.670725 374.461 11.0396 374.994 23.3018C375.525 35.564 376.444 56.1392 377.033 69.0283C378.341 97.5936 379.831 133.987 381.253 172.133C381.841 187.884 382.78 211.788 383.34 225.248C383.901 238.708 384.844 263.782 385.44 280.966C387.192 331.561 389.002 349.072 394.401 367.647C405.7 406.527 433.605 434.516 470.921 444.399C491.438 449.834 515.64 452.119 562.062 453.004L595.08 453.633L595.647 466.759C595.959 473.977 595.997 480.236 595.732 480.667C595.466 481.096 590.456 481.332 584.601 481.19C578.748 481.048 444.816 480.813 286.978 480.667ZM588.059 466.868V460.619L566.907 460.602C520.387 460.567 479.126 455.972 458.382 448.517C439.304 441.66 419.785 427.236 407.104 410.629C399.4 400.537 390.197 381.024 386.477 366.887C380.962 345.939 379.751 330.996 376.512 243.994C371.361 105.682 367.804 18.611 367.037 12.1269L366.529 7.8173L357.437 8.35882C352.436 8.65459 348.22 8.99832 348.07 9.11913C347.768 9.36492 349.372 51.5588 350.94 84.6503C351.498 96.3918 352.438 118.185 353.025 133.078C355.319 191.013 356.254 215.356 357.235 242.432C358.497 277.332 361.128 340.805 361.919 355.431L362.511 366.366L356.6 356.473C344.625 336.424 335.756 321.023 323.012 298.151C315.833 285.261 305.366 266.515 299.752 256.492C294.137 246.469 284.851 229.83 279.119 219.52C273.384 209.209 264.347 193.042 259.031 183.589C248.55 164.947 248.021 163.991 218.337 110.166C207.281 90.118 197.564 73.013 196.745 72.1569C195.429 70.7801 194.344 71.0675 187.424 74.6189C178.499 79.1992 178.536 79.0222 184.364 88.8162C186.239 91.9655 191.9 102.043 196.943 111.208C201.986 120.373 212.909 140.056 221.215 154.949C229.522 169.842 238.916 186.714 242.088 192.442C245.263 198.17 251.951 210.122 256.952 218.999C261.955 227.877 271.118 244.28 277.313 255.45C283.51 266.621 298.311 293.099 310.202 314.293C322.096 335.487 336.07 360.559 341.257 370.012C346.445 379.464 351.967 389.429 353.529 392.155L356.37 397.115L342.871 386.427C335.445 380.549 317.205 366.133 302.335 354.39C287.465 342.646 266.063 325.729 254.773 316.793C243.484 307.857 228.427 296.051 221.313 290.556C214.2 285.061 203.167 276.44 196.793 271.393C190.421 266.348 173.264 252.872 158.669 241.445C131.212 219.947 87.5726 185.477 84.3128 182.708C82.6236 181.273 82.2944 181.361 80.6864 183.66C79.7137 185.054 77.1808 188.078 75.0583 190.382C72.0902 193.604 71.4257 194.975 72.1818 196.322C72.7234 197.285 83.8483 206.395 96.902 216.566C109.96 226.739 128.631 241.432 138.396 249.22C148.163 257.006 168.374 272.93 183.31 284.603C198.247 296.278 219.399 312.912 230.314 321.571C263.593 347.968 279.575 360.572 300.296 376.764C311.21 385.294 325.547 396.548 332.154 401.774C338.759 406.998 349.451 415.426 355.914 420.5C362.376 425.574 367.508 429.881 367.316 430.071C367.127 430.26 361.605 428.504 355.046 426.171C348.489 423.837 336.541 419.814 328.499 417.236C320.454 414.655 309.879 411.181 304.997 409.516C300.113 407.848 284.368 402.774 270.006 398.237C241.059 389.091 103.709 344.439 54.906 328.309C37.7093 322.625 23.4788 318.134 23.283 318.33C22.8477 318.763 18.7859 332.477 18.4922 334.504C18.3381 335.562 30.7003 340.024 62.6691 350.455C87.0852 358.424 123.278 370.253 143.097 376.748C229.52 405.059 350.057 444.153 366.346 449.157C372.228 450.963 377.235 452.758 377.477 453.145C377.716 453.531 294.645 453.995 192.873 454.174L7.83388 454.499L7.53187 463.808L7.23193 473.117H297.644H588.059V466.868Z" fill="#1a1a1a"/><rect x="346" y="5.46234" width="22.8295" height="470.67" transform="rotate(-2.5698 346 5.46234)" fill="#1a1a1a"/><rect x="177" y="80.1495" width="22.8295" height="386.977" transform="rotate(-29.2341 177 80.1495)" fill="#1a1a1a"/><rect x="67.5732" y="193.831" width="22.8295" height="379.778" transform="rotate(-51.7982 67.5732 193.831)" fill="#1a1a1a"/><rect x="15" y="338.718" width="22.8295" height="379.778" transform="rotate(-72.0501 15 338.718)" fill="#1a1a1a"/><path d="M6 476L6 450L591 455.5L591 476L6 476Z" fill="#1a1a1a"/><path d="M394.291 442.411L394.204 442.543" stroke="#1a1a1a" stroke-width="25" stroke-linecap="round"/><path d="M401.178 449.101V450.044" stroke="#1a1a1a" stroke-width="25" stroke-linecap="round"/><path d="M403.122 436.599C403.115 435.925 402.179 433.172 396.184 426.123C392.482 421.77 390.769 418.709 389.758 416.627C386.079 409.05 385.436 407.138 384.162 402.501C383.618 400.521 383.063 397.568 382.187 393.504C380.209 384.334 378.888 378.649 378.435 377.478C377.19 374.254 377.365 372.384 377.232 370.565C377.17 369.72 376.518 368.226 376.101 366.787C375.683 365.344 377.221 370.84 378.009 373.657C379.95 380.589 383.006 387.612 383.664 389.031C385.399 392.77 387.84 398.744 390.632 404.889C392.719 409.484 394.615 413.489 397.268 417.773C400.378 422.796 403.545 425.215 404.908 426.762C407.483 429.684 412.033 435.279 417.081 440.667C419.162 442.888 420.305 442.899 421.617 443.048C423.291 443.238 427.559 445.637 438.308 450.424C445.537 453.644 456.838 457.363 464.168 459.575C471.499 461.786 474.635 462.096 476.031 462.313C477.427 462.53 476.987 462.646 467.524 462.805C458.06 462.964 439.585 463.162 429.607 463.215C418.708 463.272 415.541 462.296 411.108 460.563C402.304 457.121 400.811 450.318 400.8 449.586C400.76 446.919 407.733 448.796 418.142 444.493C420.313 443.595 420.771 443.516 421.009 443.266C422.103 442.116 421.874 440.349 422.343 439.567C423.301 437.97 419.621 435.918 417.055 433.632C415.847 432.75 414.983 432.142 414.343 431.698C414 431.499 413.618 431.352 413.225 431.2" stroke="#1a1a1a" stroke-width="25" stroke-linecap="round"/></svg>`;
        toggle.title = 'Toggle Piri Sidebar';

        // Toggle button should be visible when sidebar is hidden
        if (state.visible) {
            toggle.classList.add('piri-hidden');
            toggle.style.display = 'none';
            toggle.style.visibility = 'hidden';
            toggle.style.opacity = '0';
        } else {
            toggle.classList.remove('piri-hidden');
            toggle.style.display = 'flex';
            toggle.style.visibility = 'visible';
            toggle.style.opacity = '1';
        }

        // Ensure toggle is always on top and visible when not hidden
        toggle.style.zIndex = '999999';
        toggle.style.pointerEvents = 'auto';

        return toggle;
    }

    // Create scroll meter
    function createScrollMeter() {
        const meter = document.createElement('div');
        meter.id = 'piri-scroll-meter';
        meter.className = `piri-scroll-meter piri-platform-${state.platformKey}`;
        meter.innerHTML = `
            <button class="piri-scroll-btn piri-scroll-up" title="Scroll to top">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 15l-6-6-6 6"/>
                </svg>
            </button>
            <div class="piri-scroll-track">
                <div class="piri-scroll-thumb"></div>
                <div class="piri-scroll-indicators"></div>
            </div>
            <button class="piri-scroll-btn piri-scroll-down" title="Scroll to bottom">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </button>
        `;
        
        // Create global tooltip element (outside scroll meter to avoid clipping)
        if (!document.getElementById('piri-global-tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.id = 'piri-global-tooltip';
            tooltip.className = 'piri-global-tooltip';
            document.body.appendChild(tooltip);
        }
        
        return meter;
    }

    // Update scroll meter position - hide when sidebar is on right and visible
    function updateScrollMeterPosition() {
        const meter = document.getElementById('piri-scroll-meter');
        if (!meter) return;

        const headings = buildScrollMeter();
        if (headings.length === 0) {
            meter.style.display = 'none';
            return;
        }

        // Hide scroll meter when sidebar is on right and visible
        const sidebar = document.getElementById('piri-sidebar');
        const isRight = state.settings.position === 'right';
        const sidebarVisible = sidebar && !sidebar.classList.contains('piri-hidden') && sidebar.style.display !== 'none';
        
        if (isRight && sidebarVisible) {
            meter.style.display = 'none';
            return;
        }

        meter.style.display = 'flex';
        meter.style.right = '12px';
        meter.style.left = 'auto';
        meter.style.top = '50%';
        meter.style.transform = 'translateY(-50%)';
        meter.style.height = 'auto';
        meter.style.maxHeight = '60vh';
    }

    // Update sidebar content
    function updateContent() {
        const content = document.querySelector('.piri-content');
        if (content) {
            content.innerHTML = renderTOC();
            attachItemListeners();
            updateScrollMeter();
        }
    }

    // Build scroll meter indicators - refresh element references
    function buildScrollMeter() {
        const filtered = getFilteredTOC();
        const headings = filtered.filter(item => item.type === 'heading' || item.type === 'code');
        
        // Refresh element references by finding them by ID
        return headings.map(heading => {
            if (heading.id) {
                const freshElement = findElementById(heading.id);
                if (freshElement) {
                    return { ...heading, element: freshElement };
                }
            }
            // If element is still in DOM, keep it; otherwise return without element
            if (heading.element && document.contains(heading.element)) {
                return heading;
            }
            return { ...heading, element: null };
        });
    }

    // Update scroll meter
    function updateScrollMeter() {
        const indicators = document.querySelector('.piri-scroll-indicators');
        if (!indicators) return;

        const headings = buildScrollMeter();
        if (headings.length === 0) {
            indicators.innerHTML = '';
            updateScrollMeterPosition();
            return;
        }

        // Calculate adaptive sizes based on count - more aggressive for large counts
        const count = headings.length;
        let dotSize = 4;
        let dotHeight = 14;
        
        if (count > 100) {
            dotSize = 2;
            dotHeight = 3;
        } else if (count > 70) {
            dotSize = 2;
            dotHeight = 4;
        } else if (count > 50) {
            dotSize = 2;
            dotHeight = 5;
        } else if (count > 35) {
            dotSize = 3;
            dotHeight = 6;
        } else if (count > 25) {
            dotSize = 3;
            dotHeight = 8;
        } else if (count > 15) {
            dotSize = 3;
            dotHeight = 10;
        }
        
        // Set CSS vars on indicators container
        indicators.style.setProperty('--dot-size', `${dotSize}px`);
        indicators.style.setProperty('--dot-height', `${dotHeight}px`);
        
        // Limit max height of scroll meter for very long chats
        const meter = document.getElementById('piri-scroll-meter');
        if (meter) {
            meter.style.maxHeight = count > 50 ? '40vh' : '50vh';
        }

        let html = '';
        headings.forEach((heading, index) => {
            if (heading.element) {
                const headingText = escapeHtml((heading.text || '').slice(0, 50));
                const fullText = headingText || 'Section ' + (index + 1);
                html += `
                    <div class="piri-scroll-dot-wrapper" data-index="${index}" data-tooltip="${fullText}${heading.text && heading.text.length > 50 ? '...' : ''}">
                        <div class="piri-scroll-dot" data-id="${heading.id || `heading-${index}`}" data-index="${index}"></div>
                    </div>
                `;
            }
        });

        indicators.innerHTML = html;
        attachScrollMeterListeners();
        updateScrollMeterPosition();
    }
    
    // Smooth scroll to element with better positioning - accepts element or ID
    function smoothScrollToElement(elementOrId, block = 'center') {
        let element = null;
        
        // If it's a string, treat it as an ID and find the element
        if (typeof elementOrId === 'string') {
            element = findElementById(elementOrId);
        } else {
            element = elementOrId;
        }
        
        if (!element) {
            console.warn('[Piri] smoothScrollToElement: Element not found', elementOrId);
            return;
        }
        
        // Verify element is still in DOM
        if (!document.contains(element)) {
            console.warn('[Piri] smoothScrollToElement: Element not in DOM', element);
            return;
        }
        
        try {
            const scrollContainer = state.platform?.getScrollContainer();
            let isWindowScroll = true;
            
            if (scrollContainer && scrollContainer !== document && scrollContainer !== document.body && scrollContainer !== window) {
                try {
                    const hasScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight;
                    if (hasScroll) {
                        isWindowScroll = false;
                    }
                } catch (e) {
                    isWindowScroll = true;
                }
            }
            
            if (isWindowScroll) {
                element.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: block,
                    inline: 'nearest'
                });
            } else {
                try {
                    const containerRect = scrollContainer.getBoundingClientRect();
                    const elementRect = element.getBoundingClientRect();
                    const scrollTop = scrollContainer.scrollTop;
                    const containerHeight = scrollContainer.clientHeight;
                    const elementHeight = elementRect.height;
                    
                    let targetScroll;
                    if (block === 'center') {
                        targetScroll = scrollTop + (elementRect.top - containerRect.top) - (containerHeight / 2) + (elementHeight / 2);
                    } else if (block === 'start') {
                        targetScroll = scrollTop + (elementRect.top - containerRect.top) - 20;
                    } else {
                        targetScroll = scrollTop + (elementRect.bottom - containerRect.bottom) + 20;
                    }
                    
                    scrollContainer.scrollTo({
                        top: Math.max(0, Math.min(targetScroll, scrollContainer.scrollHeight - containerHeight)),
                        behavior: 'smooth'
                    });
                } catch (e) {
                    element.scrollIntoView({ behavior: 'smooth', block: block });
                }
            }
            
            // Apply highlight to chat screen element
            applyHighlight(element);
        } catch (error) {
            // scroll error, element might not exist
        }
    }

    // Attach scroll meter listeners
    function attachScrollMeterListeners() {
        const wrappers = document.querySelectorAll('.piri-scroll-dot-wrapper');
        wrappers.forEach(wrapper => {
            // Show global tooltip on hover
            wrapper.addEventListener('mouseenter', (e) => {
                const tooltip = document.getElementById('piri-global-tooltip');
                const text = wrapper.dataset.tooltip;
                if (tooltip && text) {
                    const rect = wrapper.getBoundingClientRect();
                    tooltip.textContent = text;
                    
                    // Reset and measure
                    tooltip.style.left = '-9999px';
                    tooltip.style.top = '-9999px';
                    tooltip.style.display = 'block';
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                    
                    // Use double rAF to ensure layout is complete
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            const tooltipWidth = tooltip.offsetWidth || 200;
                            const scrollMeter = document.getElementById('piri-scroll-meter');
                            const meterRect = scrollMeter ? scrollMeter.getBoundingClientRect() : rect;
                            
                            // Position to the left of the scroll meter with gap
                            const leftPos = meterRect.left - tooltipWidth - 20;
                            const topPos = rect.top + rect.height / 2;
                            
                            tooltip.style.left = Math.max(10, leftPos) + 'px';
                            tooltip.style.top = topPos + 'px';
                            tooltip.style.opacity = '1';
                            tooltip.style.visibility = 'visible';
                        });
                    });
                }
            });
            
            wrapper.addEventListener('mouseleave', (e) => {
                const tooltip = document.getElementById('piri-global-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                }
            });
            
            wrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                
                const dot = wrapper.querySelector('.piri-scroll-dot');
                if (!dot) return;
                
                const index = parseInt(dot.dataset.index) || parseInt(wrapper.dataset.index);
                const id = dot.dataset.id;
                
                const headings = buildScrollMeter();
                let heading = null;
                
                if (id && index >= 0) {
                    heading = headings[index] || headings.find(h => h.id === id);
                } else if (index >= 0 && index < headings.length) {
                    heading = headings[index];
                }
                
                if (heading) {
                    // Find element by ID first, fallback to stored element
                    const targetElement = heading.id ? findElementById(heading.id) : heading.element;
                    
                    if (targetElement) {
                    // Add visual feedback on click
                    const dot = wrapper.querySelector('.piri-scroll-dot');
                    if (dot) {
                        dot.style.transform = 'scale(2.5)';
                        setTimeout(() => {
                            if (dot) {
                                dot.style.transform = '';
                            }
                        }, 200);
                    }
                    
                        smoothScrollToElement(targetElement, 'center');
                    } else {
                        console.warn('[Piri] Could not find element for scroll meter heading:', heading.id || heading.text);
                    }
                }
            });
        });
        
        const dots = document.querySelectorAll('.piri-scroll-dot');
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                
                const wrapper = dot.closest('.piri-scroll-dot-wrapper');
                if (wrapper) {
                    wrapper.click();
                }
            });
            
            // Add keyboard navigation
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const wrapper = dot.closest('.piri-scroll-dot-wrapper');
                    if (wrapper) {
                        wrapper.click();
                    }
                }
            });
            
            // Make dots focusable for accessibility
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', 'Navigate to section');
        });

        const scrollUp = document.querySelector('.piri-scroll-up');
        const scrollDown = document.querySelector('.piri-scroll-down');

        if (scrollUp) {
            scrollUp.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const headings = buildScrollMeter();
                const scrollContainer = state.platform?.getScrollContainer();
                const isWindowScroll = !scrollContainer || scrollContainer === document || scrollContainer === document.body || scrollContainer === window;
                
                // Add visual feedback
                scrollUp.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    if (scrollUp) scrollUp.style.transform = '';
                }, 150);
                
                if (headings.length > 0) {
                    const firstElement = headings[0].id ? findElementById(headings[0].id) : headings[0].element;
                    if (firstElement) {
                        smoothScrollToElement(firstElement, 'start');
                    }
                } else {
                    const scrollContainer = state.platform?.getScrollContainer();
                    const isWindowScroll = !scrollContainer || scrollContainer === document || scrollContainer === document.body || scrollContainer === window;
                    if (isWindowScroll) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }
            });
        }

        if (scrollDown) {
            scrollDown.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const headings = buildScrollMeter();
                const scrollContainer = state.platform?.getScrollContainer();
                const isWindowScroll = !scrollContainer || scrollContainer === document || scrollContainer === document.body || scrollContainer === window;
                
                // Add visual feedback
                scrollDown.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    if (scrollDown) scrollDown.style.transform = '';
                }, 150);
                
                if (headings.length > 0) {
                    const lastHeading = headings[headings.length - 1];
                    const lastElement = lastHeading.id ? findElementById(lastHeading.id) : lastHeading.element;
                    if (lastElement) {
                        smoothScrollToElement(lastElement, 'end');
                    }
                } else {
                    const scrollContainer = state.platform?.getScrollContainer();
                    const isWindowScroll = !scrollContainer || scrollContainer === document || scrollContainer === document.body || scrollContainer === window;
                    if (isWindowScroll) {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    } else {
                        scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
                    }
                }
            });
        }
    }

    // Track scroll position and update active indicator - track main page content
    function initScrollTracking() {
        let headings = buildScrollMeter();
        if (headings.length === 0) return;

        let lastActiveIndex = -1;
        let rafId = null;

        function updateActiveIndicator() {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                headings = buildScrollMeter();
                if (headings.length === 0) {
                    return;
                }

                const scrollContainer = state.platform?.getScrollContainer();
                let isWindowScroll = true;
                
                if (scrollContainer && scrollContainer !== document && scrollContainer !== document.body && scrollContainer !== window) {
                    try {
                        const hasScroll = scrollContainer.scrollHeight > scrollContainer.clientHeight;
                        if (hasScroll) {
                            isWindowScroll = false;
                        }
                    } catch (e) {
                        isWindowScroll = true;
                    }
                }
                
                let viewportTop, viewportBottom, viewportCenter;
                
                if (isWindowScroll) {
                    viewportTop = 0;
                    viewportBottom = window.innerHeight;
                    viewportCenter = window.innerHeight / 2;
                } else {
                    try {
                        const containerRect = scrollContainer.getBoundingClientRect();
                        viewportTop = containerRect.top;
                        viewportBottom = containerRect.bottom;
                        viewportCenter = containerRect.top + (containerRect.height / 2);
                    } catch (e) {
                        viewportTop = 0;
                        viewportBottom = window.innerHeight;
                        viewportCenter = window.innerHeight / 2;
                        isWindowScroll = true;
                    }
                }
                
                let activeIndex = -1;
                let minDistance = Infinity;

                headings.forEach((heading, index) => {
                    // Get fresh element reference
                    const element = heading.id ? findElementById(heading.id) : heading.element;
                    if (!element) return;
                    
                    try {
                        const rect = element.getBoundingClientRect();
                        
                        if (!rect) return;

                        const elementTop = rect.top;
                        const elementBottom = rect.bottom;
                        const elementCenter = elementTop + (rect.height / 2);
                        const distance = Math.abs(elementCenter - viewportCenter);

                        const isInViewport = elementTop < viewportBottom && elementBottom > viewportTop;

                        if (isInViewport && distance < minDistance) {
                            minDistance = distance;
                            activeIndex = index;
                        }
                    } catch (e) {
                        // heading tracking error
                    }
                });

                if (activeIndex === -1 && headings.length > 0) {
                    let closestIndex = 0;
                    let closestDist = Infinity;
                    
                    headings.forEach((heading, index) => {
                        // Get fresh element reference
                        const element = heading.id ? findElementById(heading.id) : heading.element;
                        if (!element) return;
                        try {
                            const rect = element.getBoundingClientRect();
                            if (rect) {
                                const dist = Math.abs(rect.top - viewportCenter);
                                if (dist < closestDist) {
                                    closestDist = dist;
                                    closestIndex = index;
                                }
                            }
                        } catch (e) {}
                    });
                    activeIndex = closestIndex;
                }

                const dots = document.querySelectorAll('.piri-scroll-dot');
                if (dots.length !== headings.length) {
                    return;
                }

                if (activeIndex >= 0 && activeIndex < dots.length) {
                    dots.forEach((dot, index) => {
                        if (index === activeIndex) {
                            dot.classList.add('piri-active');
                        } else {
                            dot.classList.remove('piri-active');
                        }
                    });

                    if (lastActiveIndex !== activeIndex) {
                        lastActiveIndex = activeIndex;
                        updateScrollThumb(activeIndex, headings.length);
                    }
                } else if (lastActiveIndex >= 0) {
                    dots.forEach(dot => dot.classList.remove('piri-active'));
                    lastActiveIndex = -1;
                }
            });
        }

        function updateScrollThumb(activeIndex, totalItems) {
            const thumb = document.querySelector('.piri-scroll-thumb');
            const track = document.querySelector('.piri-scroll-track');
            
            if (!thumb || !track || totalItems === 0) {
                if (thumb) thumb.style.opacity = '0';
                return;
            }

            const trackHeight = track.offsetHeight;
            const dots = document.querySelectorAll('.piri-scroll-dot-wrapper');
            
            if (activeIndex >= 0 && activeIndex < totalItems && dots.length > 0 && dots[activeIndex]) {
                const activeDot = dots[activeIndex];
                const dotRect = activeDot.getBoundingClientRect();
                const trackRect = track.getBoundingClientRect();
                const dotTop = dotRect.top - trackRect.top + track.scrollTop;
                const dotHeight = activeDot.offsetHeight || 12;
                
                // Calculate thumb position based on actual dot position
                const thumbTop = Math.max(0, dotTop - 4);
                const thumbHeight = Math.min(trackHeight - thumbTop, dotHeight + 8);
                
                thumb.style.top = `${thumbTop}px`;
                thumb.style.height = `${thumbHeight}px`;
                thumb.style.opacity = '0.7';
            } else {
                // Fallback: calculate based on index
                const thumbHeight = Math.max(30, trackHeight / totalItems);
                const thumbTop = (activeIndex / totalItems) * (trackHeight - thumbHeight);
                
                thumb.style.top = `${thumbTop}px`;
                thumb.style.height = `${thumbHeight}px`;
                thumb.style.opacity = activeIndex >= 0 ? '0.7' : '0';
            }
        }

        const handleScroll = () => {
            updateActiveIndicator();
        };

        window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        window.addEventListener('wheel', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        document.documentElement.addEventListener('scroll', handleScroll, { passive: true, capture: true });
        
        const content = document.querySelector('.piri-content');
        if (content) {
            content.addEventListener('scroll', handleScroll, { passive: true });
        }

        const scrollContainer = state.platform?.getScrollContainer();
        if (scrollContainer) {
            if (scrollContainer !== document && scrollContainer !== document.body && scrollContainer !== window) {
                try {
                    scrollContainer.addEventListener('scroll', handleScroll, { passive: true, capture: true });
                    scrollContainer.addEventListener('wheel', handleScroll, { passive: true });
                    
                    const scrollableChildren = scrollContainer.querySelectorAll('[class*="overflow"], [class*="scroll"]');
                    scrollableChildren.forEach(child => {
                        try {
                            child.addEventListener('scroll', handleScroll, { passive: true, capture: true });
                        } catch (e) {}
                    });
                } catch (e) {
                    // scroll listener attach failed
                }
            }
        }

        document.body.addEventListener('scroll', handleScroll, { passive: true, capture: true });

        updateActiveIndicator();

        const intervalId = setInterval(() => {
            updateActiveIndicator();
        }, 100);
    }

    // Update platform theme
    function updatePlatformTheme() {
        const oldKey = state.platformKey;
        const platform = detectPlatform();
        
        if (!platform) return;

        state.platform = platform;
        const newKey = state.platformKey;

        if (oldKey !== newKey) {
            const sidebar = document.getElementById('piri-sidebar');
            const toggle = document.getElementById('piri-toggle');

            if (sidebar) {
                sidebar.classList.remove(`piri-platform-${oldKey}`);
                sidebar.classList.add(`piri-platform-${state.platformKey}`);
                
                // Apply platform theme if on ChatGPT or Claude
                if (state.platformKey === 'chatgpt' || state.platformKey === 'claude') {
                    const currentTheme = getPlatformTheme();
                if (state.platformKey === 'chatgpt') {
                    sidebar.classList.remove('piri-chatgpt-dark', 'piri-chatgpt-light');
                    sidebar.classList.add(`piri-chatgpt-${currentTheme}`);
                    } else if (state.platformKey === 'claude') {
                        sidebar.classList.remove('piri-claude-dark', 'piri-claude-light');
                        sidebar.classList.add(`piri-claude-${currentTheme}`);
                    }
                } else {
                    sidebar.classList.remove('piri-chatgpt-dark', 'piri-chatgpt-light');
                }

                const logo = sidebar.querySelector('.piri-logo');
                if (logo) {
                    if (state.platformKey === 'chatgpt') {
                        logo.innerHTML = `<span class="piri-logo-text">ChatGPT X Piri</span>`;
                    } else {
                        const logoIcon = logo.querySelector('.piri-logo-icon');
                        if (logoIcon) {
                            logoIcon.innerHTML = getPlatformIcon();
                        }
                    }
                }

                if (state.settings.position === 'between') {
                    updateBetweenPosition();
                }
            }

            if (toggle) {
                toggle.classList.remove(`piri-platform-${oldKey}`);
                toggle.classList.add(`piri-platform-${state.platformKey}`);
            }

            const scrollMeter = document.getElementById('piri-scroll-meter');
            if (scrollMeter) {
                scrollMeter.classList.remove(`piri-platform-${oldKey}`);
                scrollMeter.classList.add(`piri-platform-${state.platformKey}`);
                
                // Apply platform theme if on ChatGPT or Claude
                if (state.platformKey === 'chatgpt' || state.platformKey === 'claude') {
                    const currentTheme = getPlatformTheme();
                if (state.platformKey === 'chatgpt') {
                    scrollMeter.classList.remove('piri-chatgpt-dark', 'piri-chatgpt-light');
                    scrollMeter.classList.add(`piri-chatgpt-${currentTheme}`);
                    } else if (state.platformKey === 'claude') {
                        scrollMeter.classList.remove('piri-claude-dark', 'piri-claude-light');
                        scrollMeter.classList.add(`piri-claude-${currentTheme}`);
                    }
                } else {
                    scrollMeter.classList.remove('piri-chatgpt-dark', 'piri-chatgpt-light');
                }
            }

            state.toc = buildTOC();
            updateContent();
        }
    }

    // Attach event listeners to TOC items
    function attachItemListeners() {
        const outlineItems = document.querySelectorAll('.piri-outline-item');
        const legacyItems = document.querySelectorAll('.piri-item');

        outlineItems.forEach((item) => {
            const id = item.dataset.id;
            const tocItem = state.toc.find(t => t.id === id);
            
            if (!tocItem) return;

            const toggleBtn = item.querySelector('[data-toggle]');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const itemId = toggleBtn.dataset.toggle;
                    if (state.expandedSections.has(itemId)) {
                        state.expandedSections.delete(itemId);
                    } else {
                        state.expandedSections.add(itemId);
                    }
                    updateContent();
                });
            }
            
            const textElement = item.querySelector('.piri-outline-text');
            if (textElement && tocItem) {
                textElement.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Use ID to find element reliably, fallback to stored element
                    const targetElement = tocItem.id ? findElementById(tocItem.id) : tocItem.element;
                    if (targetElement) {
                        scrollToElement(targetElement);
                    } else {
                        console.warn('[Piri] Could not find element for TOC item:', tocItem.id || tocItem.text);
                    }
                });
            }
        });

        legacyItems.forEach((item) => {
            const index = parseInt(item.dataset.index);
            const tocItem = getFilteredTOC()[index];

            if (!tocItem) return;

            item.addEventListener('click', () => {
                // Use ID to find element reliably, fallback to stored element
                const targetElement = tocItem.id ? findElementById(tocItem.id) : tocItem.element;
                if (targetElement) {
                    scrollToElement(targetElement);
                } else {
                    console.warn('[Piri] Could not find element for TOC item:', tocItem.id || tocItem.text);
                }
            });

        });
    }

    // Handle resize
    function initResize(sidebar) {
        const handle = sidebar.querySelector('.piri-resize-handle');
        if (!handle) return;

        let startX, startWidth;

        handle.addEventListener('mousedown', (e) => {
            state.isResizing = true;
            startX = e.clientX;
            startWidth = sidebar.offsetWidth;
            handle.classList.add('piri-resizing');
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!state.isResizing) return;

            const isLeft = sidebar.classList.contains('piri-position-left');
            const isBetween = sidebar.classList.contains('piri-position-between');
            const isRight = sidebar.classList.contains('piri-position-right');
            
            // Resize handle is always on the right side of the sidebar
            // For left/between: moving right increases width, moving left decreases width
            // For right: moving right decreases width, moving left increases width
            let diff;
            if (isRight) {
                // Sidebar on right: dragging right (positive diff) decreases width
                diff = startX - e.clientX;
            } else {
                // Sidebar on left or between: dragging right (positive diff) increases width
                diff = e.clientX - startX;
            }
            
            const newWidth = Math.max(280, Math.min(600, startWidth + diff));

            sidebar.style.width = `${newWidth}px`;
            state.settings.width = newWidth;
            
            // Update main content in real-time during resize
            if (isBetween || isRight || isLeft) {
                adjustMainContentForSidebar(true);
            }
        });

        document.addEventListener('mouseup', () => {
            if (state.isResizing) {
                state.isResizing = false;
                handle.classList.remove('piri-resizing');
                document.body.style.cursor = '';
                document.body.style.userSelect = '';

                try {
                if (chrome?.storage?.sync) {
                    chrome.storage.sync.set({ width: state.settings.width });
                    }
                } catch (error) {
                    // Extension context invalidated, settings won't persist
                    // width save failed
                }
                
                // Final adjustment after resize completes
                if (state.settings.position === 'between' || state.settings.position === 'right' || state.settings.position === 'left') {
                    adjustMainContentForSidebar(true);
                }
            }
        });
    }

    // Initialize
    async function init() {
        state.platform = detectPlatform();

        if (!state.platform) {
            console.log('Piri: No supported platform detected');
            return;
        }

        console.log(`Piri: Detected ${state.platform.name} (${state.platformKey})`);

        await loadSettings();

        if (!state.settings.enabled) {
            console.log('Piri: Extension disabled');
            return;
        }

        state.visible = state.settings.autoShow;
        
        // Initial TOC build
        state.toc = buildTOC();
        console.log('[Piri] Initial TOC build:', state.toc.length, 'items');

        const sidebar = createSidebar();
        const toggle = createToggleButton();
        const scrollMeter = createScrollMeter();
        
        // Force rebuild after delay to catch late-loading content
        setTimeout(() => {
            const delayedToc = buildTOC();
            if (delayedToc.length !== state.toc.length) {
                console.log('[Piri] Delayed rebuild found', delayedToc.length, 'items (was', state.toc.length, ')');
                state.toc = delayedToc;
                updateContent();
                setTimeout(() => updateScrollMeter(), 100);
            }
        }, 1500);
        
        // Apply platform theme if on ChatGPT or Claude
        if (state.platformKey === 'chatgpt' || state.platformKey === 'claude') {
            const currentTheme = getPlatformTheme();
        if (state.platformKey === 'chatgpt') {
            scrollMeter.classList.add(`piri-chatgpt-${currentTheme}`);
            } else if (state.platformKey === 'claude') {
                scrollMeter.classList.add(`piri-claude-${currentTheme}`);
            }
        }

        document.body.appendChild(sidebar);
        document.body.appendChild(toggle);
        document.body.appendChild(scrollMeter);

        // Ensure sidebar is interactive and properly positioned
        sidebar.style.pointerEvents = 'auto';
        sidebar.style.userSelect = 'auto';
        sidebar.style.zIndex = '999999';
        
        // Ensure toggle button is visible and properly positioned
        if (toggle) {
            toggle.style.position = 'fixed';
            toggle.style.right = '20px';
            toggle.style.bottom = '20px';
            toggle.style.zIndex = '999999';
            toggle.style.pointerEvents = 'auto';
            
            // Force visibility check
            if (!state.visible) {
                toggle.classList.remove('piri-hidden');
                toggle.style.display = 'flex';
                toggle.style.visibility = 'visible';
                toggle.style.opacity = '1';
            }
        }
        
        // Function to ensure sidebar is in correct state
        function ensureSidebarState() {
            if (!sidebar) return;
            
            // Don't force visibility if user manually closed
            if (state.manuallyClosed) return;
            
            // If sidebar should be visible but isn't, fix it
            if (state.visible && !sidebar.classList.contains('piri-hidden')) {
                if (sidebar.style.display === 'none') {
                    sidebar.style.display = 'flex';
                }
                if (sidebar.style.visibility === 'hidden') {
                    sidebar.style.visibility = 'visible';
                }
                sidebar.style.pointerEvents = 'auto';
            }
        }
        
        // Function to ensure toggle button is visible when sidebar is hidden
        function ensureToggleVisibility() {
            const toggleBtn = document.getElementById('piri-toggle');
            if (!toggleBtn) return;
            
            // In floating mode, toggle button should always be visible
            const isFloating = state.settings.position === 'floating';
            
            if (!state.visible && toggleBtn.classList.contains('piri-hidden')) {
                toggleBtn.classList.remove('piri-hidden');
                toggleBtn.style.display = 'flex';
                toggleBtn.style.visibility = 'visible';
                toggleBtn.style.opacity = '1';
                toggleBtn.style.pointerEvents = 'auto';
            } else if (state.visible && !isFloating && !toggleBtn.classList.contains('piri-hidden')) {
                // Only hide toggle button if sidebar is visible and NOT in floating mode
                toggleBtn.classList.add('piri-hidden');
                toggleBtn.style.display = 'none';
                toggleBtn.style.visibility = 'hidden';
                toggleBtn.style.opacity = '0';
            } else if (state.visible && isFloating && toggleBtn.classList.contains('piri-hidden')) {
                // Show toggle button if sidebar is visible and in floating mode
                toggleBtn.classList.remove('piri-hidden');
                toggleBtn.style.display = 'flex';
                toggleBtn.style.visibility = 'visible';
                toggleBtn.style.opacity = '1';
                toggleBtn.style.pointerEvents = 'auto';
            }
        }
        
        // Check sidebar state periodically (less frequent to avoid performance issues)
        const stateCheckInterval = setInterval(() => {
            if (document.getElementById('piri-sidebar')) {
                ensureSidebarState();
                ensureToggleVisibility();
            } else {
                clearInterval(stateCheckInterval);
            }
        }, 2000);
        
        // Also call immediately to ensure toggle is visible on init
        ensureToggleVisibility();

        initResize(sidebar);
        attachItemListeners();
        updateScrollMeter();
        initScrollTracking();
        updateScrollMeterPosition();

        // Update scroll meter on resize
        window.addEventListener('resize', () => {
            updateScrollMeterPosition();
        });

        // Search
        const searchInput = sidebar.querySelector('.piri-search-input');
        searchInput?.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            updateContent();
        });

        // Escape to clear search and unfocus
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const searchInput = document.querySelector('.piri-search-input');
                if (searchInput && document.activeElement === searchInput) {
                    if (searchInput.value) {
                        // First escape clears search
                        searchInput.value = '';
                        state.searchQuery = '';
                        updateContent();
                    } else {
                        // Second escape unfocuses
                        searchInput.blur();
                    }
                }
            }
        });

        // Filters
        const filterBtns = sidebar.querySelectorAll('.piri-filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;

                filterBtns.forEach(b => b.classList.remove('piri-active'));
                btn.classList.add('piri-active');

                if (filter === 'all') {
                    state.filters.role = 'all';
                    state.filters.level = 'all';
                } else if (filter === 'user' || filter === 'assistant') {
                    state.filters.role = filter;
                    state.filters.level = 'all';
                } else {
                    state.filters.role = 'all';
                    state.filters.level = filter;
                }

                updateContent();
            });
        });

        // Close button
        sidebar.querySelector('.piri-btn-close')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            sidebar.classList.add('piri-hidden');
            sidebar.style.display = 'none';
            sidebar.style.visibility = 'hidden';
            state.visible = false;
            // Show toggle button when sidebar is closed
            if (toggle) {
                toggle.classList.remove('piri-hidden');
                toggle.style.display = 'flex';
                toggle.style.visibility = 'visible';
                toggle.style.opacity = '1';
            }
            state.manuallyClosed = true;  // Mark as manually closed
            // Remove main content adjustment when sidebar is closed
            if (state.settings.position === 'between' || state.settings.position === 'right' || state.settings.position === 'left') {
                adjustMainContentForSidebar(false);
            }
            // Show scroll meter when sidebar is closed (especially for right position)
            updateScrollMeterPosition();
        });

        // Toggle button - draggable and clickable
        let isDragging = false;
        let dragStartX = 0;
        let dragStartY = 0;
        let toggleStartX = 0;
        let toggleStartY = 0;
        let hasDragged = false;
        
        toggle.addEventListener('mousedown', (e) => {
            isDragging = true;
            hasDragged = false;
            dragStartX = e.clientX;
            dragStartY = e.clientY;
            const rect = toggle.getBoundingClientRect();
            toggleStartX = rect.left;
            toggleStartY = rect.top;
            toggle.classList.add('piri-dragging');
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const dx = e.clientX - dragStartX;
            const dy = e.clientY - dragStartY;
            
            // Only consider it a drag if moved more than 5px
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                hasDragged = true;
            }
            
            if (hasDragged) {
                let newX = toggleStartX + dx;
                let newY = toggleStartY + dy;
                
                // Keep within viewport
                const maxX = window.innerWidth - toggle.offsetWidth - 10;
                const maxY = window.innerHeight - toggle.offsetHeight - 10;
                newX = Math.max(10, Math.min(newX, maxX));
                newY = Math.max(10, Math.min(newY, maxY));
                
                toggle.style.left = `${newX}px`;
                toggle.style.top = `${newY}px`;
                toggle.style.right = 'auto';
                toggle.style.bottom = 'auto';
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                toggle.classList.remove('piri-dragging');
            }
        });
        
        toggle.addEventListener('click', (e) => {
            // Only open sidebar if we didn't drag
            if (hasDragged) {
                hasDragged = false;
                return;
            }
            
            sidebar.classList.remove('piri-hidden');
            sidebar.style.display = 'flex';
            sidebar.style.visibility = 'visible';
            state.visible = true;
            // Hide toggle button when sidebar is opened (except in floating mode)
            if (toggle && state.settings.position !== 'floating') {
                toggle.classList.add('piri-hidden');
                toggle.style.display = 'none';
                toggle.style.visibility = 'hidden';
            } else if (toggle && state.settings.position === 'floating') {
                // In floating mode, keep toggle button visible
                toggle.classList.remove('piri-hidden');
                toggle.style.display = 'flex';
                toggle.style.visibility = 'visible';
                toggle.style.opacity = '1';
            }
            state.manuallyClosed = false;  // Reset manual close flag
            // Adjust main content when sidebar is opened
            if (state.settings.position === 'between' || state.settings.position === 'right' || state.settings.position === 'left') {
                adjustMainContentForSidebar(true);
            }

            state.toc = buildTOC();
            updateContent();
            setTimeout(() => {
                updateScrollMeter();
                // Hide scroll meter if sidebar is on right
                updateScrollMeterPosition();
            }, 100);
        });

        // Export buttons
        sidebar.querySelector('.piri-export-md')?.addEventListener('click', exportToMarkdown);
        sidebar.querySelector('.piri-export-json')?.addEventListener('click', exportToJSON);

        // Watch for DOM changes - increased debounce to prevent flicker
        let observerTimeout = null;
        const observer = new MutationObserver(() => {
            if (observerTimeout) return;
            observerTimeout = setTimeout(() => {
            updatePlatformTheme();
            state.toc = buildTOC();
            updateContent();
            setTimeout(() => {
                updateScrollMeter();
            }, 100);
                observerTimeout = null;
            }, 500); // Increased from 300ms to 500ms to reduce flicker
        });

        const container = state.platform.getConversationContainer();
        if (container) {
            observer.observe(container, {
                childList: true,
                subtree: true,
                characterData: true
            });
            console.log('[Piri] Observer attached to:', container);
        } else {
            console.log('[Piri] No container found for observer');
        }
        
        // Also observe main/document for Claude/Gemini since they scan the whole page
        if (state.platformKey === 'claude' || state.platformKey === 'gemini') {
            const mainEl = document.querySelector('main') || document.body;
            if (mainEl && mainEl !== container) {
                observer.observe(mainEl, {
                    childList: true,
                    subtree: true
                });
                console.log('[Piri] Also observing main/body for', state.platformKey);
            }
        }
        
        // Periodic check as backup (every 2 seconds) - force rebuild to catch late-loading content
        const periodicCheck = setInterval(() => {
            try {
                const currentToc = buildTOC();
                if (currentToc.length !== state.toc.length || currentToc.length === 0) {
                    console.log('[Piri] Periodic check found', currentToc.length, 'items (was', state.toc.length, ')');
                    state.toc = currentToc;
                    updateContent();
                    if (currentToc.length > 0) {
                        setTimeout(() => {
                            updateScrollMeter();
                        }, 100);
                    }
                }
            } catch (error) {
                console.error('[Piri] Error in periodic check:', error);
            }
        }, 2000);
        
        // Clear interval when page unloads
        window.addEventListener('beforeunload', () => {
            clearInterval(periodicCheck);
        });

        // Watch for platform theme changes (ChatGPT or Claude)
        if (state.platformKey === 'chatgpt' || state.platformKey === 'claude') {
            // Function to update theme
            const updateTheme = () => {
                const sidebar = document.getElementById('piri-sidebar');
                const scrollMeter = document.getElementById('piri-scroll-meter');
                const currentTheme = getPlatformTheme();
                
                if (sidebar) {
                    if (state.platformKey === 'chatgpt') {
                    sidebar.classList.remove('piri-chatgpt-dark', 'piri-chatgpt-light');
                    sidebar.classList.add(`piri-chatgpt-${currentTheme}`);
                    } else if (state.platformKey === 'claude') {
                        sidebar.classList.remove('piri-claude-dark', 'piri-claude-light');
                        sidebar.classList.add(`piri-claude-${currentTheme}`);
                    }
                }
                
                if (scrollMeter) {
                    if (state.platformKey === 'chatgpt') {
                    scrollMeter.classList.remove('piri-chatgpt-dark', 'piri-chatgpt-light');
                    scrollMeter.classList.add(`piri-chatgpt-${currentTheme}`);
                    } else if (state.platformKey === 'claude') {
                        scrollMeter.classList.remove('piri-claude-dark', 'piri-claude-light');
                        scrollMeter.classList.add(`piri-claude-${currentTheme}`);
                    }
                }
            };
            
            // Initial theme application
            updateTheme();
            
            // Watch for theme changes on html element (data-theme attribute)
            const htmlObserver = new MutationObserver(() => {
                updateTheme();
            });

            htmlObserver.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme', 'class', 'style'],
                childList: false,
                subtree: false
            });

            // Watch for theme changes on body
            const bodyObserver = new MutationObserver(() => {
                updateTheme();
            });

            bodyObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ['class', 'style'],
                childList: false,
                subtree: false
            });
            
            // Also watch main element for background color changes
            const mainObserver = new MutationObserver(() => {
                updateTheme();
            });
            
            const main = document.querySelector('main');
            if (main) {
                mainObserver.observe(main, {
                    attributes: true,
                    attributeFilter: ['class', 'style'],
                    childList: false,
                    subtree: false
                });
            }
        }

        // Watch for URL changes (SPA navigation)
        let lastUrl = location.href;
        const urlObserver = new MutationObserver(() => {
            const currentUrl = location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                setTimeout(() => {
                    updatePlatformTheme();
                }, 500);
            }
        });

        urlObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        setupBetweenPositionWatcher();

        // Listen for messages from popup
        try {
        if (chrome?.runtime?.onMessage) {
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                switch (message.type) {
                    case 'GET_CHATGPT_THEME':
                        if (state.platformKey === 'chatgpt' && state.platform?.getTheme) {
                            sendResponse({ theme: state.platform.getTheme() });
                        } else {
                            sendResponse({ theme: 'light' });
                        }
                        return true;
                    case 'TOGGLE_ENABLED':
                        if (!message.value) {
                            sidebar.remove();
                            toggle.remove();
                        }
                        break;
                    case 'CHANGE_POSITION':
                        sidebar.classList.remove('piri-position-left', 'piri-position-right', 'piri-position-floating', 'piri-position-between');
                        sidebar.classList.add(`piri-position-${message.value}`);
                        state.settings.position = message.value;
                        if (message.value === 'between') {
                            updateBetweenPosition();
                            setTimeout(() => setupBetweenPositionWatcher(), 100);
                        } else if (message.value === 'right' || message.value === 'left') {
                            // Adjust main content for right or left position
                            setTimeout(() => adjustMainContentForSidebar(true), 100);
                        } else {
                            // Reset main content adjustment when not in between, right, or left mode
                            adjustMainContentForSidebar(false);
                        }
                        updateScrollMeterPosition();
                        // Update toggle button visibility based on position mode
                        const toggleBtn = document.getElementById('piri-toggle');
                        if (toggleBtn) {
                            const isFloating = message.value === 'floating';
                            if (isFloating && state.visible) {
                                // In floating mode, keep toggle button visible
                                toggleBtn.classList.remove('piri-hidden');
                                toggleBtn.style.display = 'flex';
                                toggleBtn.style.visibility = 'visible';
                                toggleBtn.style.opacity = '1';
                                toggleBtn.style.pointerEvents = 'auto';
                            } else if (!isFloating && state.visible) {
                                // Hide toggle button when sidebar is visible (except in floating mode)
                                toggleBtn.classList.add('piri-hidden');
                                toggleBtn.style.display = 'none';
                                toggleBtn.style.visibility = 'hidden';
                                toggleBtn.style.opacity = '0';
                            } else if (!state.visible) {
                                // Show toggle button when sidebar is hidden
                                toggleBtn.classList.remove('piri-hidden');
                                toggleBtn.style.display = 'flex';
                                toggleBtn.style.visibility = 'visible';
                                toggleBtn.style.opacity = '1';
                                toggleBtn.style.pointerEvents = 'auto';
                            }
                        }
                        break;
                    case 'CHANGE_THEME':
                        sidebar.classList.remove('piri-theme-dark', 'piri-theme-light');
                        sidebar.classList.add(`piri-theme-${message.value}`);
                        break;
                }
            });
        }
        } catch (error) {
            // Extension context invalidated, message listener won't work
            // message listener setup failed
        }

        console.log('Piri: Initialized successfully');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }
})();

