"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";

// --- Icons (UI) ---
const RefreshIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></svg>
);
const UserIcon = () => (
    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const LayoutRightIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M15 3v18" /></svg>
);
const LayoutPopupIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="13" y="8" width="6" height="8" rx="1" /></svg>
);
const LayoutMiddleIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /></svg>
);
const SendIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);

// --- Data ---
interface Section { id: string; type: "h1" | "h2" | "h3" | "code"; text: string; content: string; }
interface Message { role: "user" | "assistant"; content?: string; sections?: Section[]; }

const DATA: Message[] = [
    { role: "user", content: "what is best indian research institute in india " },
    {
        role: "assistant", sections: [
            { type: "h2", id: "intro-text", text: "", content: "Here’s the reality: there isn’t a single “best” research institute in India for every field — different places dominate in different areas (science, engineering, agriculture, medicine, fundamental research, etc.). But if you want a straight answer to which ones are top across research output and reputation right now, the rankings and expert lists point clearly to a handful of leaders." },
            { type: "h2", id: "top-research-inst", text: "Top Research Institutions in India (general research focus)", content: "1. Indian Institute of Science (IISc), Bengaluru\nUniversally ranked #1 for research in India. Known for foundational science, engineering, advanced materials, environmental science, nanotechnology — huge research output and citations.\n\n2. Indian Institute of Technology Madras (IIT Madras)\nOne of the most research-intensive technical universities in India, strong in engineering, computer science, AI, and materials.\n\n3. Indian Institute of Technology Delhi (IIT Delhi)\nBig research programs across engineering, science, policy, and interdisciplinary labs.\n\n4. Indian Institute of Technology Bombay (IIT Bombay)\nTop research output in tech fields — energy, computing, materials.\n\n5. Indian Institute of Technology Kharagpur (IIT Kharagpur)\nStrong research footprint and collaboration networks in engineering and science." },
            { type: "h2", id: "other-orgs", text: "Other Highly Respected Research Organizations", content: "Tata Institute of Fundamental Research (TIFR), Mumbai\nWorld-class in math, physics, theoretical computer science and fundamental research.\n\nCSIR Labs (Council of Scientific & Industrial Research)\nNetwork of labs focused on materials, chemicals, biology, environment.\n\nIndian Council of Agricultural Research (ICAR)\nOversees agricultural research institutes.\n\nBhabha Atomic Research Centre (BARC)\nBig player in nuclear science, radiological research, advanced physics." },
            { type: "h2", id: "reality-check", text: "Quick reality check", content: "If your priority is core scientific and engineering research output, citations, global reputation → IISc Bengaluru sits at the top.\n\nIf you want broad, interdisciplinary research with real-world tech impact → IIT Madras, IIT Delhi, IIT Bombay are major players.\n\nIf your interest is fundamental theoretical research → TIFR beats most Indian universities in that niche." }
        ]
    },
    { role: "user", content: "IISc has supercomputers??" },
    {
        role: "assistant", sections: [
            { type: "h2", id: "iisc-intro", text: "", content: "Short answer: yes, IISc doesn’t just have supercomputers — it has some of the most powerful machines in the entire country." },
            { type: "h2", id: "what-iisc-has", text: "What IISc actually has", content: "" },
            { type: "h3", id: "param-pravega", text: "1. PARAM Pravega — India’s largest academic supercomputer", content: "Commissioned in 2022. 3.3 petaflops peak performance. Funded by the National Supercomputing Mission. Built by CDAC + IISc. Used heavily for AI, CFD, material science, climate models, quantum sims, genomics, everything." },
            { type: "h3", id: "sahasrat", text: "2. SahasraT cluster (older system)", content: "An earlier supercomputer IISc used before Pravega. Was among India’s top HPC systems at its time." },
            { type: "h3", id: "gpu-clusters", text: "3. Multiple department-level GPU clusters", content: "IISc labs run NVIDIA A100 clusters, V100 clusters, and distributed compute farms for deep learning and simulations. Every major department — CSA, ECE, Physics, Mechanical, Materials, CDS — has their own dedicated HPC or GPU racks." },
            { type: "h2", id: "powerhouse", text: "So, is IISc a supercomputing powerhouse?", content: "Absolutely. If you're doing hardcore ML, molecular dynamics, numerical simulation, CFD, reinforcement learning at scale — IISc is one of the best-equipped campuses in India to support it." }
        ]
    },
    { role: "user", content: "i love walking in Gulmohar marg of IISc! tell me more places to walk nearby" },
    {
        role: "assistant", sections: [
            { type: "h3", id: "nearby-intro", text: "", content: "If you love Gulmohar Marg inside the IISc campus for its peace and greenery, you’ll be happy to know there are a bunch of great walking spots nearby and in greater Bangalore." },
            { type: "h3", id: "nearby-parks", text: "Close to IISc (great for regular walks)", content: "Jaya Prakash Narayana Park — nice shady trees and paths, good for everyday walking near Mathikere.\n\nMariyappanapalya Park — simple local park with green space for a quiet walk.\n\nNandini Layout Park — broader walking paths, benches, and morning walkers crowd.\n\nHigh Tension Line Park — longer open green strip good for walking if you want somewhere a bit less crowded.\n\nRichards Park — quiet and leafy, perfect if you’re around Richards Town area after a walk." },
            { type: "h3", id: "scenic-places", text: "Larger, scenic places worth dedicated walks", content: "If you’re willing to go a bit further (metro/taxi), these are some of Bangalore’s most-loved walking spots:\n\nLalbagh Botanical Garden — big lake and loop, seasonal flowers and heritage trees.\n\nUlsoor Lake — good path around the water, quieter than the big parks.\n\nAvalahalli Forest & trails — more rugged and nature-oriented walking." },
            { type: "h3", id: "vibe", text: "What makes it nice", content: "IISc’s campus itself is huge, green, and quietly beautiful — it’s often spoken about as one of the greenest parts of the city with old trees and shaded paths all around. Walking spots around here roll that vibe into the city’s wider park network and lakes." }
        ]
    }
];

const FLAT_SECTIONS = DATA.filter(m => m.role === "assistant" && m.sections).flatMap(m => m.sections || []).filter(s => s.text !== "");

// --- Themes ---
const THEMES = {
    chatgpt: {
        name: "ChatGPT 5.0",
        bg: "var(--theme-chatgpt-bg)",
        sidebar: "var(--theme-chatgpt-sidebar)",
        msgBotBg: "transparent",
        msgBotIconColor: "var(--theme-icon-color)",
        msgUserBg: "var(--theme-chatgpt-msg-user)",
        accent: "blue",
        icon: "/llm_icons/gpt.png",
        font: "font-sans"
    },
    claude: {
        name: "Claude 3.5 Sonnet",
        bg: "var(--theme-claude-bg)",
        sidebar: "var(--theme-claude-sidebar)",
        msgBotBg: "#D97757",
        msgBotIconColor: "white",
        msgUserBg: "var(--theme-claude-msg-user)",
        accent: "orange",
        icon: "/llm_icons/claude.png",
        font: "font-serif"
    },
    gemini: {
        name: "Gemini Advanced",
        bg: "var(--theme-gemini-bg)",
        sidebar: "var(--theme-gemini-sidebar)",
        msgBotBg: "transparent",
        msgBotIconColor: "var(--theme-icon-color)",
        msgUserBg: "var(--theme-gemini-msg-user)",
        accent: "cyan",
        icon: "/llm_icons/gemini.png",
        font: "font-sans"
    }
};

type Platform = keyof typeof THEMES;
type LayoutMode = 'right' | 'popup' | 'middle';

// --- Window Component ---
function DemoWindow({
    id, platform, initialPos, zIndex, onFocus, defaultPlay = false, layoutMode, activeWindowId,
    requestReplay
}: {
    id: string, platform: Platform, initialPos: { x: number, y: number }, zIndex: number,
    onFocus: () => void, defaultPlay?: boolean, layoutMode: LayoutMode, activeWindowId: string,
    requestReplay: (cb: () => void) => void
}) {
    const theme = THEMES[platform];
    const [messages, setMessages] = useState<Message[]>(DATA);
    const [inputValue, setInputValue] = useState("");
    const [position, setPosition] = useState(initialPos);

    // Adaptive initial size
    const [size, setSize] = useState({ width: 900, height: 650 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const updateSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setSize({ width: window.innerWidth - 32, height: 500 });
            } else {
                setSize({ width: 900, height: 650 });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const [isMaximized, setIsMaximized] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Sidebar widths
    const [leftW, setLeftW] = useState(180);
    const [piriW, setPiriW] = useState(280); // Widened default

    // State
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeRole, setResizeRole] = useState<string | null>(null);

    const windowRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const autoPlayTimer = useRef<any>(null);

    // Chat Logic
    const handleSend = () => {
        if (!inputValue.trim()) return;
        setMessages(prev => [...prev, { role: 'user', content: inputValue }]);
        setInputValue("");
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Download Piri to continue' }]);
        }, 600);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    // --- Piri Sidebar Logic ---
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const hierarchicalTOC = useMemo(() => {
        const result: Array<{ id: string; type: string; text: string; children?: Array<{ id: string; type: string; text: string }> }> = [];

        messages.forEach((m, i) => {
            if (m.role === 'user') {
                result.push({ id: `msg-${i}`, type: 'user', text: m.content || "User Message" });
            }
            if (m.role === 'assistant' && m.sections) {
                let currentH2: { id: string; type: string; text: string; children?: Array<{ id: string; type: string; text: string }> } | null = null;

                m.sections.forEach(s => {
                    if (!s.text) return;

                    if (s.type === 'h2') {
                        if (currentH2) result.push(currentH2);
                        currentH2 = { id: s.id, type: s.type, text: s.text, children: [] };
                    } else if (s.type === 'h3' && currentH2) {
                        currentH2.children = currentH2.children || [];
                        currentH2.children.push({ id: s.id, type: s.type, text: s.text });
                    } else if (s.type === 'h1' || s.type === 'h3') {
                        if (currentH2) {
                            result.push(currentH2);
                            currentH2 = null;
                        }
                        result.push({ id: s.id, type: s.type, text: s.text });
                    }
                });

                if (currentH2) result.push(currentH2);
            }
        });

        return result;
    }, [messages]);

    const filteredTOC = useMemo(() => {
        const filterItem = (item: { id: string; type: string; text: string; children?: Array<{ id: string; type: string; text: string }> }): boolean => {
            const matchesSearch = !searchQuery || item.text.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFilter = activeFilter === 'All' ||
                (activeFilter === 'User' && item.type === 'user') ||
                (activeFilter === 'Assistant' && item.type !== 'user') ||
                (['H1', 'H2', 'H3'].includes(activeFilter) && item.type === activeFilter.toLowerCase());

            if (item.children) {
                const hasMatchingChild = item.children.some(child => filterItem(child));
                return (matchesSearch && matchesFilter) || hasMatchingChild;
            }

            return matchesSearch && matchesFilter;
        };

        return hierarchicalTOC.filter(filterItem);
    }, [hierarchicalTOC, searchQuery, activeFilter]);

    const handleDownload = (format: 'json' | 'md') => {
        const content = format === 'json'
            ? JSON.stringify(messages, null, 2)
            : messages.map(m => `### ${m.role.toUpperCase()}\n\n${m.content || ''}\n${m.sections?.map(s => `#### ${s.text}\n${s.content}`).join('\n') || ''}`).join('\n\n');

        const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `piri-chat.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Replay Logic
    const scrollToSection = useCallback((sectionId: string) => {
        setActiveSection(sectionId);
        if (!windowRef.current || !chatContainerRef.current) return;

        const el = windowRef.current.querySelector(`[id="${id}-${sectionId}"]`) as HTMLElement;
        if (el) {
            // Manual scroll calculation to prevent whole-page scrolling
            const container = chatContainerRef.current;
            const containerRect = container.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();

            // Calculate relative position
            const offset = elRect.top - containerRect.top;
            const targetScroll = container.scrollTop + offset - (container.clientHeight / 2) + (el.clientHeight / 2);

            container.scrollTo({ top: targetScroll, behavior: 'smooth' });

            // Animation effect
            el.classList.remove('highlight-flash');
            void el.offsetWidth;
            el.classList.add('highlight-flash');
        }
    }, [id]);

    const startAutoPlay = useCallback(() => {
        if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
        let idx = 0;
        autoPlayTimer.current = setInterval(() => {
            const s = FLAT_SECTIONS[idx];
            if (s) {
                scrollToSection(s.id);
            }
            idx = (idx + 1) % FLAT_SECTIONS.length;
        }, 2200);
    }, [scrollToSection]);

    // Register replay handler if active
    useEffect(() => {
        if (activeWindowId === id) {
            requestReplay(startAutoPlay);
        }
    }, [activeWindowId, id, requestReplay, startAutoPlay]);

    // Default Autoplay
    useEffect(() => {
        if (defaultPlay) startAutoPlay();
        return () => clearInterval(autoPlayTimer.current);
    }, [defaultPlay, startAutoPlay]);


    // Mouse Handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (isMaximized || isMobile) return;
        if ((e.target as HTMLElement).closest('button')) return;
        if ((e.target as HTMLElement).closest('.resize-handle')) return;

        onFocus();
        setIsDragging(true);
        setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
        clearInterval(autoPlayTimer.current); // Stop animation on interaction
    }, [position, isMaximized, onFocus, isMobile]);

    // Global Move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
            }
            if (resizeRole && windowRef.current) {
                const rect = windowRef.current.getBoundingClientRect();
                if (resizeRole === 'window') {
                    setSize({ width: Math.max(400, e.clientX - rect.left), height: Math.max(300, e.clientY - rect.top) });
                }
                if (resizeRole === 'left') setLeftW(Math.max(100, Math.min(300, e.clientX - rect.left)));
                if (resizeRole === 'piri') {
                    // Logic depends on layout, but let's assume right-side resize for simplicity
                    setPiriW(Math.max(150, Math.min(400, rect.right - e.clientX)));
                }
            }
        };
        const handleMouseUp = () => { setIsDragging(false); setResizeRole(null); };

        if (isDragging || resizeRole) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, resizeRole, dragOffset]);

    const SearchIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
    );
    const DownloadIcon = () => (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
    );
    const CloseIcon = () => (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
    );
    const ChevronDownIcon = () => (
        <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
    );
    const ChevronRightIcon = () => (
        <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
    );
    const ChevronLeftIcon = () => (
        <svg className="w-3 h-3 text-[var(--color-text-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
    );

    // Piri Component
    const PiriSidebar = (
        <div className={`flex flex-col flex-shrink-0 relative z-20 font-sans overflow-hidden transition-all duration-300
            ${layoutMode === 'popup'
                ? 'rounded-[28px] border border-[var(--color-border-subtle)] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04)] bg-[var(--piri-bg)]/95 backdrop-blur-2xl'
                : 'border-l border-[var(--color-border-subtle)] bg-[var(--piri-bg)]/95'}`}
            style={{
                width: isMobile ? '100%' : piriW,
                height: layoutMode === 'popup' ? '500px' : 'auto',
                maxHeight: '100%',
                position: layoutMode === 'popup' ? 'absolute' : 'relative',
                right: layoutMode === 'popup' ? '20px' : 'auto',
                top: layoutMode === 'popup' ? '60px' : 'auto',
            }}
        >
            {/* Top Glow (Popup only) */}
            {layoutMode === 'popup' && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#A0816C]/50 to-transparent pointer-events-none" />
            )}

            {/* Header with Title and Close Button */}
            <div className="px-4 pt-4 pb-3 flex items-center justify-between flex-shrink-0 border-b border-[var(--color-border-subtle)]">
                <h3 className="text-sm font-light text-[var(--color-text-primary)]" style={{ fontWeight: 300 }}>
                    {theme.name} X Piri
                </h3>
                <button
                    onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                    className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--piri-item-hover)] transition-colors"
                    title="Close"
                >
                    <CloseIcon />
                </button>
            </div>

            {/* Search Section */}
            <div className="relative px-4 pt-4 pb-3 flex-shrink-0">
                <div className="relative group">
                    {/* Search Input */}
                    <div className="relative flex items-center gap-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 group-focus-within:border-[var(--color-border)] transition-all duration-200">
                        {/* Icon */}
                        <div className="relative flex-shrink-0">
                            <div className="relative w-4 h-4 text-[var(--color-text-muted)]">
                                <SearchIcon />
                            </div>
                        </div>

                        <input
                            className="flex-1 bg-transparent border-none outline-none text-[14px] text-[var(--color-text-primary)] font-medium tracking-tight placeholder-[var(--color-text-muted)]"
                            placeholder="Search sections..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-shrink-0">
                {['All', 'User', 'Assistant', 'H1', 'H2', 'H3'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`
                            px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200 flex-shrink-0
                            ${activeFilter === filter
                                ? 'bg-[var(--color-bg-card)] text-[var(--color-text-primary)]'
                                : 'text-[var(--color-text-primary)] hover:bg-[var(--piri-item-hover)]'
                            }
                        `}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Resize Handle (if not popup and not mobile) */}
            {layoutMode !== 'popup' && !isMobile && <div className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#A0816C]/50 z-20" onMouseDown={(e) => { e.stopPropagation(); setResizeRole('piri') }} />}

            {/* Results List */}
            <div className="flex-1 overflow-y-auto px-4 pb-2 custom-scrollbar">
                <div className="flex flex-col gap-0.5">
                    {filteredTOC.length === 0 && (
                        <div className="text-center text-[var(--color-text-muted)] text-xs py-8 px-4">
                            <div className="opacity-50">No results found</div>
                        </div>
                    )}
                    {filteredTOC.map((item, idx) => {
                        const isUser = item.type === 'user';
                        const isH2 = item.type === 'h2';
                        const isH3 = item.type === 'h3';
                        const isActive = activeSection === item.id;
                        const hasChildren = item.children && item.children.length > 0;

                        return (
                            <div key={`${item.id}-${idx}`} className="flex flex-col">
                                {/* Main Item */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        clearInterval(autoPlayTimer.current);
                                        scrollToSection(item.id);
                                    }}
                                    className={`
                                        group relative flex items-center gap-2 px-2 py-2 rounded cursor-pointer transition-all duration-150
                                        ${isActive
                                            ? 'bg-[var(--piri-active-bg)]'
                                            : 'hover:bg-[var(--piri-item-hover)]'
                                        }
                                        ${isH3 ? 'ml-6' : ''}
                                    `}
                                >
                                    {/* Left Arrow for H2 */}
                                    {isH2 && (
                                        <div className="flex-shrink-0">
                                            <ChevronLeftIcon />
                                        </div>
                                    )}

                                    {/* Type Badge */}
                                    <div className={`
                                        flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide border
                                        ${isUser
                                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                            : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]'
                                        }
                                    `}>
                                        {isUser ? 'User' : item.type.toUpperCase()}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-[12px] leading-tight truncate transition-colors ${'text-[var(--color-text-primary)]'
                                            }`}>
                                            {item.text || "Introduction"}
                                        </div>
                                    </div>
                                </div>

                                {/* H3 Children */}
                                {hasChildren && item.children && item.children.map((child, childIdx) => {
                                    const isChildActive = activeSection === child.id;
                                    return (
                                        <div
                                            key={`${child.id}-${childIdx}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearInterval(autoPlayTimer.current);
                                                scrollToSection(child.id);
                                            }}
                                            className={`
                                                group relative flex items-center gap-2 px-2 py-2 ml-6 rounded cursor-pointer transition-all duration-150
                                                ${isChildActive
                                                    ? 'bg-[var(--piri-active-bg)]'
                                                    : 'hover:bg-[var(--piri-item-hover)]'
                                                }
                                            `}
                                        >
                                            {/* Type Badge */}
                                            <div className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wide border bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border-[var(--color-border-subtle)]">
                                                {child.type.toUpperCase()}
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[12px] leading-tight truncate transition-colors text-[var(--color-text-primary)]">
                                                    {child.text}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );

    return (
        <div
            className="relative perspective-1000 w-full"
            style={{
                transform: isMaximized ? 'none' : `translate3d(${isMobile ? 0 : position.x}px, ${isMobile ? 0 : position.y}px, 0)`,
                width: isMaximized || isMobile ? '100%' : 'auto',
                height: isMaximized ? '100%' : 'auto',
                zIndex: zIndex,
                transition: isDragging || resizeRole ? 'none' : 'transform 0.15s ease-out'
            }}
            onMouseDown={() => { onFocus(); clearInterval(autoPlayTimer.current); }}
        >
            <div
                ref={windowRef}
                className={`relative rounded-xl overflow-hidden shadow-2xl border flex flex-col transition-all group ${theme.font} ${activeWindowId === id ? 'ring-2 ring-white/10' : ''}`}
                style={{
                    backgroundColor: theme.bg,
                    borderColor: theme.bg === '#212121' ? '#333' : '#444',
                    width: isMaximized ? '100vw' : size.width,
                    height: isMinimized ? '44px' : (isMaximized ? '100vh' : size.height),
                    maxHeight: '100vh', maxWidth: '100vw'
                }}
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between px-3 py-2 border-b select-none cursor-grab active:cursor-grabbing"
                    style={{ backgroundColor: theme.sidebar, borderColor: 'rgba(255,255,255,0.05)' }}
                    onMouseDown={handleMouseDown}
                    onDoubleClick={() => setIsMaximized(!isMaximized)}
                >
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-500" onClick={(e) => { e.stopPropagation(); setIsMinimized(true) }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-500" onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized) }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-500" onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized) }} />
                    </div>
                    <div className="text-xs font-semibold text-zinc-400 flex items-center gap-2">
                        <img src={theme.icon} alt={theme.name} className="w-4 h-4 rounded-sm" />
                        {theme.name}
                    </div>
                    <div className="w-10"></div> {/* Spacer */}
                </div>

                {/* Content */}
                {!isMinimized && (
                    <div className="flex flex-1 overflow-hidden relative">

                        {/* Left Sidebar */}
                        <div className="hidden md:flex flex-col flex-shrink-0 border-r border-[var(--color-border-subtle)] relative"
                            style={{ width: leftW, backgroundColor: theme.sidebar }}>
                            <div className="p-3">
                                <div className="h-2 w-16 bg-white/10 rounded mb-2"></div>
                                <div className="h-2 w-12 bg-[var(--color-overlay)] rounded"></div>
                            </div>
                            <div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500/50 z-20 resize-handle" onMouseDown={(e) => { e.stopPropagation(); setResizeRole('left') }} />
                        </div>

                        {/* Middle Piri */}
                        {layoutMode === 'middle' && PiriSidebar}

                        {/* Chat Area */}
                        <div className="flex-1 flex flex-col relative" style={{ backgroundColor: theme.bg }}>
                            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                {messages.map((m, i) => (
                                    <div key={i} id={`${id}-msg-${i}`} className="mb-6 flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {m.role === 'user' ? <UserIcon /> :
                                                <div className={`w-6 h-6 rounded flex items-center justify-center`} style={{ background: m.role === 'assistant' ? theme.msgBotBg : 'transparent', color: theme.msgBotIconColor }}>
                                                    <img src={theme.icon} className="w-4 h-4 rounded-sm" />
                                                </div>
                                            }
                                        </div>
                                        <div className="flex-1 text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                            <div className="font-semibold mb-1 text-[var(--color-text-primary)]">{m.role === 'user' ? 'You' : theme.name.split(' ')[0]}</div>
                                            {m.content}
                                            {m.sections && <div className="mt-2 space-y-2">
                                                {m.sections.map(s => (
                                                    <div key={s.id} id={`${id}-${s.id}`}
                                                        className={`p-2 rounded transition-colors duration-500 ${activeSection === s.id ? 'bg-blue-500/20' : ''}`}>
                                                        <div className="font-bold text-[var(--color-text-primary)]">{s.text}</div>
                                                        <div>{s.content}</div>
                                                    </div>
                                                ))}
                                            </div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Input */}
                            <div className="p-3 border-t border-[var(--color-border-subtle)]">
                                <div className="bg-[var(--color-overlay)] rounded-lg border border-[var(--color-border-subtle)] p-2 flex items-center gap-2">
                                    <input
                                        className="bg-transparent border-none outline-none w-full text-xs text-[var(--color-text-secondary)]"
                                        placeholder={`Message ${theme.name}...`}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim()}
                                        className={`p-1.5 rounded-md transition-all ${inputValue.trim() ? 'bg-[var(--color-text-primary)] text-[var(--color-bg)]' : 'bg-transparent text-zinc-600'}`}
                                    >
                                        <SendIcon />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right/Popup Piri */}
                        {(layoutMode === 'right' || layoutMode === 'popup') && PiriSidebar}

                    </div>
                )}

                {/* Resize Handle */}
                {!isMaximized && !isMinimized && !isMobile && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-30 resize-handle opacity-50 hover:opacity-100 p-0.5" onMouseDown={(e) => { e.stopPropagation(); setResizeRole('window') }}>
                        <div className="w-full h-full border-r-2 border-b-2 border-zinc-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Main Container ---
export function InteractiveDemo() {
    const [layoutMode, setLayoutMode] = useState<LayoutMode>('right');
    const [activePlatform, setActivePlatform] = useState<Platform>('chatgpt');

    // We keep track of the replay function
    const replayRef = useRef<(() => void) | null>(null);

    return (
        <div className="w-full h-full flex flex-col relative group/container">

            {/* Controls Container */}
            <div className="absolute top-4 left-0 right-0 px-8 flex justify-between items-start z-50 pointer-events-none">

                {/* Layout Switcher (Left) */}
                <div className="flex items-center gap-1 bg-black/50 backdrop-blur-xl border border-white/10 p-1 rounded-full shadow-2xl pointer-events-auto transition-all hover:bg-black/70">
                    <button onClick={() => setLayoutMode('right')} className={`p-2 rounded-full transition-all ${layoutMode === 'right' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`} title="Right Sidebar">
                        <LayoutRightIcon />
                    </button>
                    <button onClick={() => setLayoutMode('middle')} className={`p-2 rounded-full transition-all ${layoutMode === 'middle' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`} title="Between Sidebar">
                        <LayoutMiddleIcon />
                    </button>
                    <button onClick={() => setLayoutMode('popup')} className={`p-2 rounded-full transition-all ${layoutMode === 'popup' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`} title="Popup Mode">
                        <LayoutPopupIcon />
                    </button>
                </div>

                {/* Platform Switcher (Right) */}
                <div className="flex flex-col gap-2 pointer-events-auto">
                    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl shadow-2xl transition-all hover:bg-black/70">
                        <button
                            onClick={() => setActivePlatform('chatgpt')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border ${activePlatform === 'chatgpt' ? 'bg-[var(--theme-chatgpt-bg)] border-white/20 text-[var(--color-text-primary)] shadow-inner' : 'border-transparent text-zinc-400 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-overlay)]'}`}
                        >
                            <img src="/llm_icons/gpt.png" className="w-5 h-5 rounded-full" style={{ filter: 'var(--icon-filter)' }} />
                            <span className="text-xs font-medium">ChatGPT</span>
                        </button>
                        <button
                            onClick={() => setActivePlatform('claude')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border ${activePlatform === 'claude' ? 'bg-[var(--theme-claude-bg)] border-white/20 text-[var(--color-text-primary)] shadow-inner' : 'border-transparent text-zinc-400 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-overlay)]'}`}
                        >
                            <img src="/llm_icons/claude.png" className="w-4 h-4 rounded-full bg-white/10" />
                            <span className="text-xs font-medium">Claude</span>
                        </button>
                        <button
                            onClick={() => setActivePlatform('gemini')}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all border ${activePlatform === 'gemini' ? 'bg-[var(--theme-gemini-bg)] border-white/20 text-[var(--color-text-primary)] shadow-inner' : 'border-transparent text-zinc-400 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-overlay)]'}`}
                        >
                            <img src="/llm_icons/gemini.png" className="w-4 h-4 rounded-full bg-white/10" />
                            <span className="text-xs font-medium">Gemini</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Single Active Window */}
            <div className="relative flex-1 flex items-center justify-center pt-10">
                <DemoWindow
                    key={activePlatform} // Force re-mount on switch for clean state? Or remove key for smooth transition. Let's force remount to reset size/pos if needed, or keep it. User wants "real". Let's keep position but switch theme.
                    // Actually, force remount (key) is safer to switch internal theme state completely.
                    id="main-window"
                    platform={activePlatform}
                    initialPos={{ x: 0, y: 0 }} // Center
                    zIndex={10}
                    defaultPlay={true}
                    layoutMode={layoutMode}
                    activeWindowId="main-window"
                    onFocus={() => { }}
                    requestReplay={(cb) => { replayRef.current = cb; }}
                />
            </div>

            {/* Global Reply Button (FAB) */}
            <button
                onClick={() => replayRef.current?.()}
                className="absolute bottom-10 right-10 w-12 h-12 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group border border-white/20"
                title="Replay Animation"
            >
                <RefreshIcon />
            </button>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
                .highlight-flash { animation: flash 1s ease-out; }
                @keyframes flash { 0% { background: rgba(59,130,246,0.3); } 100% { background: transparent; } }
             `}</style>
        </div>
    );
}
