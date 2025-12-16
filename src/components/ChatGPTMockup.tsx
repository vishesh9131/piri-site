"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ==========================================
// Types 
// ==========================================
type FeatureType = 'indexing' | 'search' | 'layout';

interface Props {
    feature: FeatureType;
}

// ==========================================
// SHARED UI ELEMENTS
// ==========================================

// A transparent wrapper so the parent wallpaper shows through
const BackgroundBase = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full h-full bg-transparent relative overflow-visible font-sans select-none flex items-center justify-center">
        {children}
    </div>
);

// ==========================================
// FEATURE 1: SCROLL METER (Contextual Navigator)
// Description: "interactive scroll meter in a bg"
// ==========================================

// Feature 1: High-Density Scroll Meter with Chat Context
const ScrollMeterView = () => {
    // 25 dots to simulate a long conversation; mapped to ~5 visual messages for demo
    const dots = Array.from({ length: 25 }, (_, i) => i);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(8);

    // Tooltip content simulation
    const getTooltipText = (i: number) => {
        if (i === 8) return "Casual but Respectful (Good for WhatsApp...)";
        if (i === 2) return "Introduction & Context";
        if (i === 15) return "Technical Constraints";
        if (i === 22) return "Final Summary";
        return `Conversation Segment ${i + 1}`;
    };

    // Auto-scroll simulation
    useEffect(() => {
        if (hoveredIndex !== null) return;
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % dots.length);
        }, 800);
        return () => clearInterval(interval);
    }, [hoveredIndex, dots.length]);

    const currentIdx = hoveredIndex ?? activeIndex;

    // Derived active message index (0-4) based on scroll position (0-24)
    const activeMsgIdx = Math.floor(currentIdx / 5);

    return (
        <BackgroundBase>
            <div className="flex w-full max-w-2xl h-[450px] relative bg-[#09090b] rounded-xl border border-white/10 shadow-2xl overflow-hidden">

                {/* A. Mock Chat Screen */}
                <div className="flex-1 flex flex-col gap-6 p-6 mask-image-linear-to-b from-black via-black to-transparent overflow-hidden relative">
                    {/* Overlay gradient to simulate 'scrolling' focus */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b] opacity-10 pointer-events-none z-10" />

                    {Array.from({ length: 5 }).map((_, i) => {
                        const isUser = i % 2 === 0;
                        const isActive = i === activeMsgIdx;

                        return (
                            <div key={i} className={`flex gap-4 transition-all duration-500 ${isActive ? 'opacity-100 blur-none scale-100' : 'opacity-30 blur-[1px] scale-98'}`}>
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-sm flex-shrink-0 ${isUser ? 'bg-zinc-700' : 'bg-emerald-600/80'} shadow-lg`} />
                                {/* Message Body */}
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-24 bg-zinc-800 rounded-full" />
                                    <div className="space-y-1.5">
                                        <div className="h-2 w-full bg-zinc-800/80 rounded-full" />
                                        <div className="h-2 w-[90%] bg-zinc-800/80 rounded-full" />
                                        {!isUser && <div className="h-2 w-[80%] bg-zinc-800/80 rounded-full" />}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* B. The High-Density Scroll Meter (Right Sidebar) */}
                <div className="w-14 h-full border-l border-white/5 bg-[#0c0c0c] flex flex-col items-center justify-center gap-1 z-20 relative">
                    {/* Up Arrow */}
                    <div className="text-zinc-700 text-[10px] mb-2 font-mono">▲</div>

                    {/* Dot Column */}
                    <div className="flex flex-col gap-[4px] items-center"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {dots.map((i) => {
                            const isCurrent = i === currentIdx;
                            return (
                                <div
                                    key={i}
                                    className="relative group/dot px-2 py-[1px] cursor-pointer flex items-center justify-center"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                >
                                    {/* The Dot */}
                                    <div className={`
                                        rounded-full transition-all duration-200
                                        ${isCurrent ? 'w-2 h-2 bg-[#A0816C] shadow-[0_0_8px_rgba(160,129,108,0.6)] scale-125' : 'w-1 h-1 bg-zinc-700 group-hover/dot:bg-zinc-500'}
                                    `} />

                                    {/* Tooltip (Only for Current) */}
                                    {isCurrent && (
                                        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30">
                                            <div className="bg-[#1e1e1e] border border-white/10 px-3 py-2 rounded-lg shadow-2xl flex items-center whitespace-nowrap min-w-[max-content]">
                                                <span className="text-[10px] text-zinc-300 font-medium tracking-wide">
                                                    {getTooltipText(i)}
                                                </span>
                                                {/* Tooltip Tail */}
                                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1e1e1e] border-t border-r border-white/10 rotate-45" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Down Arrow */}
                    <div className="text-zinc-700 text-[10px] mt-2 font-mono">▼</div>
                </div>
            </div>
        </BackgroundBase>
    );
};

// ==========================================
// FEATURE 2: SEARCH SIDEBAR
// Description: "Only show the sidebar and how it handles find"
// ==========================================

// Feature 2: Neural Ctrl+F (Search Panel)
const SidebarView = () => {
    const results = [
        { type: 'H2', label: 'Top Research Institutions in India', preview: 'IISc Bengaluru, IIT Madras, IIT Delhi...', match: true, shortcut: '1' },
        { type: 'H2', label: 'Other Highly Respected Research Orgs', preview: 'TIFR, CSIR Labs, ICAR, BARC...', match: false, shortcut: '2' },
        { type: 'H3', label: 'PARAM Pravega Supercomputer', preview: '3.3 petaflops, commissioned 2022...', match: false, shortcut: '3' },
        { type: 'User', label: 'IISc has supercomputers??', preview: 'Your question about computing...', match: false, shortcut: '4' },
    ];

    return (
        <BackgroundBase>
            <div className="relative w-full max-w-[360px] flex flex-col">
                
                {/* Floating Command Palette */}
                <div className="relative bg-[#0c0c0e]/95 backdrop-blur-2xl rounded-[28px] border border-white/[0.06] shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.04)]">
                    
                    {/* Top glow accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#A0816C]/50 to-transparent" />
                    
                    {/* Search Header - Made more prominent */}
                    <div className="relative px-4 pt-5 pb-3">
                        <div className="relative group">
                            {/* Search input container - Made larger and more visible */}
                            <div className="relative flex items-center gap-2.5 bg-[#141416] border-2 border-white/[0.12] rounded-xl px-3.5 py-3 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(160,129,108,0.1)] group-hover:border-[#A0816C]/30 group-hover:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_rgba(160,129,108,0.2),0_0_20px_rgba(160,129,108,0.1)] transition-all duration-200">
                                {/* Search icon with glow */}
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-[#A0816C]/30 blur-lg rounded-full" />
                                    <div className="relative w-5 h-5 text-[#A0816C]">
                                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.35-4.35" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Input field */}
                                <input
                                    type="text"
                                    disabled
                                    className="flex-1 bg-transparent border-none outline-none text-[14px] text-white font-medium tracking-tight placeholder-zinc-500"
                                    placeholder="Search sections..."
                                    value="Indian Institute of Science"
                                />
                                
                                {/* Keyboard hint */}
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                    <span className="px-1.5 py-0.5 rounded-md bg-white/[0.08] border border-white/[0.1] text-[9px] text-zinc-400 font-mono font-semibold">esc</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Subtle divider */}
                        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                    </div>
                    
                    {/* Filter Pills */}
                    <div className="px-4 py-2.5 flex items-center gap-1.5">
                        {['All', 'Headers', 'User', 'Code'].map((tab, i) => (
                            <button key={tab} className={`
                                px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200
                                ${i === 0
                                    ? 'bg-white text-[#0c0c0e] shadow-[0_2px_10px_rgba(255,255,255,0.2)]'
                                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]'}
                            `}>
                                {tab}
                            </button>
                        ))}
                        
                        {/* Result count */}
                        <div className="ml-auto text-[10px] text-zinc-600">
                            4 results
                        </div>
                    </div>
                    
                    {/* Results */}
                    <div className="px-2 pb-2.5">
                        {results.map((item, i) => (
                            <div key={i} className={`
                                group relative flex items-start gap-2.5 px-2.5 py-2.5 mx-1 rounded-xl cursor-default transition-all duration-150
                                ${item.match 
                                    ? 'bg-white/[0.04]' 
                                    : 'hover:bg-white/[0.02]'}
                            `}>
                                {/* Active indicator */}
                                {item.match && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#A0816C] rounded-full shadow-[0_0_8px_rgba(160,129,108,0.5)]" />
                                )}
                                
                                {/* Type badge */}
                                <div className={`
                                    flex-shrink-0 w-9 h-5 rounded-md flex items-center justify-center text-[9px] font-semibold tracking-wide
                                    ${item.type === 'User' 
                                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                        : item.match
                                            ? 'bg-[#A0816C]/15 text-[#A0816C] border border-[#A0816C]/20'
                                            : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/30'}
                                `}>
                                    {item.type}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className={`text-[12px] leading-tight truncate ${item.match ? 'text-white font-medium' : 'text-zinc-300'}`}>
                                        {item.label}
                                    </div>
                                    <div className="text-[10px] text-zinc-600 mt-0.5 truncate">
                                        {item.preview}
                                    </div>
                                </div>
                                
                                {/* Jump shortcut */}
                                <div className={`
                                    flex-shrink-0 w-4.5 h-4.5 rounded-md flex items-center justify-center text-[9px] font-mono transition-opacity
                                    ${item.match 
                                        ? 'bg-[#A0816C]/20 text-[#A0816C]' 
                                        : 'bg-zinc-800/50 text-zinc-600 opacity-0 group-hover:opacity-100'}
                                `}>
                                    {item.shortcut}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Footer hint */}
                    <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between text-[9px] text-zinc-600 rounded-b-[28px]">
                        <div className="flex items-center gap-2.5">
                            <span className="flex items-center gap-1">
                                <span className="px-1 py-0.5 rounded-md bg-white/[0.04] text-zinc-500 font-mono">enter</span>
                                <span>to jump</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="px-1 py-0.5 rounded-md bg-white/[0.04] text-zinc-500 font-mono">tab</span>
                                <span>preview</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A0816C] animate-pulse" />
                            <span>Piri</span>
                        </div>
                    </div>
                </div>
            </div>
        </BackgroundBase>
    );
};

// ==========================================
// FEATURE 3: LAYOUT (Adaptive)
// Description: "show the same side bar ... attached in right, then floates, then b/w gpt"
// ==========================================

interface LayoutProps {
    layoutMode: 'right' | 'floating' | 'between';
}

const LayoutView = () => {
    const [mode, setMode] = useState<'right' | 'floating' | 'between'>('between');

    useEffect(() => {
        const modes: ('right' | 'floating' | 'between')[] = ['between', 'floating', 'right'];
        let idx = 0;
        const interval = setInterval(() => {
            idx = (idx + 1) % modes.length;
            setMode(modes[idx]);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

    return (
        <BackgroundBase>
            {/* Context Container (Browser Window) */}
            <div className="w-[90%] h-[70%] bg-[#0f0f0f] rounded-xl border border-white/10 relative overflow-hidden flex shadow-2xl">
                {/* 1. GPT Sidebar (Static, left) */}
                <div className={`
                    bg-[#000000] border-r border-white/10 flex flex-col p-3 gap-3 transition-all duration-500
                    ${mode === 'between' ? 'w-48 opacity-100' : 'w-48 opacity-100'} 
                    hidden md:flex
                `}>
                    <div className="h-8 w-8 bg-white/10 rounded-full mb-4" />
                    <div className="space-y-2">
                        <div className="h-2 w-24 bg-zinc-800 rounded-full" />
                        <div className="h-2 w-32 bg-zinc-800 rounded-full" />
                        <div className="h-2 w-20 bg-zinc-800 rounded-full" />
                    </div>
                </div>

                {/* 2. PIRI SIDEBAR (The Dynamic Element) */}
                <div className={`
                    absolute z-30 flex flex-col bg-[#18181b] border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    ${mode === 'between' ? "relative w-60 border-y-0 border-l border-r-0 h-full" : ""}
                    ${mode === 'floating' ? "top-[15%] left-[30%] w-60 h-[70%] rounded-xl" : ""}
                    ${mode === 'right' ? "top-0 right-0 h-full w-60 border-y-0 border-l" : ""}
                `}>
                    {/* Piri Header */}
                    <div className="h-10 border-b border-white/5 flex items-center px-3 gap-2 bg-white/[0.02]">
                        <div className="w-3 h-3 bg-[#A0816C] rounded-full" />
                        <span className="text-[10px] font-bold text-zinc-400 tracking-wider">STRUCTURE</span>
                    </div>
                    {/* Tree Content */}
                    <div className="p-4 space-y-3">
                        <div className="h-1.5 w-24 bg-zinc-700 rounded-full" />
                        <div className="pl-3 space-y-2">
                            <div className="h-1.5 w-full bg-zinc-800/80 rounded-full" />
                            <div className="h-1.5 w-3/4 bg-zinc-800/80 rounded-full" />
                        </div>
                        <div className="h-1.5 w-20 bg-zinc-700 rounded-full mt-2" />
                        <div className="pl-3 space-y-2">
                            <div className="h-1.5 w-5/6 bg-zinc-800/80 rounded-full" />
                        </div>
                    </div>
                </div>

                {/* 3. Main Chat Area */}
                <div className="flex-1 bg-[#09090b] relative flex flex-col">
                    <div className="h-14 border-b border-white/5 flex items-center px-4">
                        <span className="text-xs text-zinc-500 font-medium">GPT-4o</span>
                    </div>
                    <div className="flex-1 p-6 space-y-4">
                        <div className="h-16 w-3/4 bg-white/5 rounded-lg rounded-tl-none ml-0" />
                        <div className="h-24 w-2/3 bg-white/5 rounded-lg rounded-tr-none ml-auto" />
                    </div>
                </div>

            </div>
        </BackgroundBase>
    );
};


// ==========================================
// MAIN EXPORT
// ==========================================

export function ChatGPTMockup({ feature }: Props) {
    if (feature === 'indexing') {
        return <ScrollMeterView />;
    }
    if (feature === 'search') {
        return <SidebarView />;
    }
    if (feature === 'layout') {
        return <LayoutView />;
    }
    return null;
}
