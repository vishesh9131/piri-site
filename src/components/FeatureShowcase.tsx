"use client";

import { motion } from "framer-motion";
import { ChatGPTMockup } from "./ChatGPTMockup";
import { getChromeWebStoreInstallUrl } from '@/lib/chrome-store';

const BRONZE = "#A0816C";

const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
};

const revealTransition = (delay = 0) => ({
    duration: 0.9,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
});

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center gap-4">
            <span className="hairline-fade w-12 md:w-20" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#A0816C]">
                {children}
            </span>
            <span className="hairline-fade w-12 md:w-20" />
        </div>
    );
}

/* ---------- icons for the release grid ---------- */

const icon = "w-5 h-5";
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const Icons = {
    handoff: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <path d="M13 5l7 7-7 7M4 12h16" />
        </svg>
    ),
    scrollSync: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <path d="M4 6h10M4 12h10M4 18h10" />
            <path d="M19 4v16M19 4l-2.5 2.5M19 4l2.5 2.5" />
        </svg>
    ),
    pin: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <path d="M12 17v5M9 4h6l1 7 2 2H6l2-2 1-7z" />
        </svg>
    ),
    flag: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <path d="M5 21V4M5 4h12l-2.5 4L17 12H5" />
        </svg>
    ),
    search: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
        </svg>
    ),
    composer: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <rect x="3" y="9" width="18" height="7" rx="3.5" />
            <circle cx="17" cy="12.5" r="1" fill="currentColor" stroke="none" />
        </svg>
    ),
    pdf: (
        <svg className={icon} viewBox="0 0 24 24" {...stroke}>
            <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5z" />
            <path d="M14 3v5h5M9 13h6M9 17h4" />
        </svg>
    ),
};

/* ---------- v1.0.5 release data ---------- */

const RELEASE_FEATURES = [
    {
        title: "Handoff",
        desc: "Continue any conversation in another AI. Piri builds the full continuation prompt, opens the tab, and auto-pastes it into the composer for you.",
        icon: Icons.handoff,
        span: "md:col-span-4",
        big: true,
    },
    {
        title: "Scroll-sync highlighting",
        desc: "The index follows you as you read — the section on screen stays softly highlighted in the sidebar.",
        icon: Icons.scrollSync,
        span: "md:col-span-2",
    },
    {
        title: "Custom marks",
        desc: "Select any text, click “Mark in Piri”, and that exact spot is pinned to your index. Saved per conversation.",
        icon: Icons.pin,
        span: "md:col-span-2",
    },
    {
        title: "Red-dot markers",
        desc: "Flag the sections that matter. The red dot stays on the row and echoes in the scroll meter.",
        icon: Icons.flag,
        span: "md:col-span-2",
    },
    {
        title: "Fuzzy search",
        desc: "Typo-tolerant matching — “rspn” finds “response”, “api err” finds “API error handling”.",
        icon: Icons.search,
        span: "md:col-span-2",
    },
    {
        title: "Redesigned PDF export",
        desc: "Conversations laid out like a typeset interview — real headings, lists, tables and code blocks, with a serif title page and proper page breaks.",
        icon: Icons.pdf,
        span: "md:col-span-4",
        big: true,
    },
    {
        title: "Piri in the message bar",
        desc: "A small toggle now lives next to the send button on ChatGPT, Claude and Gemini.",
        icon: Icons.composer,
        span: "md:col-span-2",
    },
];

const RELEASE_STATS = [
    { value: "~0%", label: "idle CPU — every polling loop removed" },
    { value: "1.6 MB", label: "package size, down from 16 MB" },
    { value: "2", label: "browsers — Chrome & Firefox, one codebase" },
];

/* ---------- feature panel ---------- */

type PanelProps = {
    badge: string;
    titleLines: [string, string];
    body: string;
    stats: { value: string; label: string }[];
    mockup: "indexing" | "search" | "layout";
    flip?: boolean;
};

function FeaturePanel({ badge, titleLines, body, stats, mockup, flip }: PanelProps) {
    return (
        <div className="relative min-h-[90vh] py-20 lg:py-0 lg:sticky lg:top-0 lg:h-screen flex items-center overflow-hidden bg-[var(--color-bg)]">
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_30%,var(--color-bg)_100%)]" />
            <div className="absolute top-0 left-0 right-0 hairline-fade" />

            <div className="relative max-w-6xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center w-full">

                    <div className={`lg:col-span-5 space-y-8 text-center lg:text-left ${flip ? "order-1 lg:order-2" : "order-1"}`}>
                        <motion.div {...reveal} transition={revealTransition()}>
                            <span className="inline-block text-[11px] font-medium uppercase tracking-[0.3em] text-[#A0816C] mb-6">
                                {badge}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] leading-[1.12] tracking-tight">
                                {titleLines[0]} <br />
                                <span className="font-serif-display italic font-normal text-[var(--color-text-secondary)]">
                                    {titleLines[1]}
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            {...reveal}
                            transition={revealTransition(0.1)}
                            className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-md mx-auto lg:mx-0"
                        >
                            {body}
                        </motion.p>

                        <motion.div
                            {...reveal}
                            transition={revealTransition(0.2)}
                            className="pt-2"
                        >
                            <div className="hairline-fade mb-6 max-w-md mx-auto lg:mx-0" />
                            <div className="flex items-start justify-center lg:justify-start gap-10">
                                {stats.map((s) => (
                                    <div key={s.label}>
                                        <div className="text-3xl font-light text-[var(--color-text-primary)] tracking-tight">
                                            {s.value}
                                        </div>
                                        <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-2">
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 48, scale: 0.97 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, margin: "-10%" }}
                        className={`lg:col-span-7 relative ${flip ? "order-2 lg:order-1" : "order-2"}`}
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)]">
                            <div
                                className="absolute inset-0"
                                style={{ background: `radial-gradient(ellipse 80% 70% at ${flip ? "20%" : "80%"} 0%, ${BRONZE}14, transparent 60%)` }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8 lg:p-10">
                                <div className="w-full h-full">
                                    <ChatGPTMockup feature={mockup} />
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-3/4 h-32 rounded-full blur-[90px] pointer-events-none"
                            style={{ background: `${BRONZE}26` }}
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/* ---------- showcase ---------- */

export function FeatureShowcase() {
    return (
        <section id="features" className="relative bg-[var(--color-bg)]">

            {/* Section intro */}
            <div className="relative py-24 md:py-32 px-6 text-center overflow-hidden">
                <motion.div {...reveal} transition={revealTransition()} className="space-y-6">
                    <Eyebrow>Why Piri</Eyebrow>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[var(--color-text-primary)] max-w-3xl mx-auto leading-[1.1]">
                        Your conversations, <br />
                        <span className="font-serif-display italic font-normal text-[var(--color-text-secondary)]">finally legible.</span>
                    </h2>
                    <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
                        Piri reads along with you and keeps a live table of contents at your side —
                        on ChatGPT, Claude, and Gemini.
                    </p>
                </motion.div>
            </div>

            <FeaturePanel
                badge="Navigation"
                titleLines={["Stop apologizing", "for being slow."]}
                body="“Sorry, scrolling…” Never again. Piri indexes every section of your conversation as it happens — one click and you're there."
                stats={[
                    { value: "50×", label: "faster navigation" },
                    { value: "0", label: "apologies given" },
                ]}
                mockup="indexing"
            />

            <FeaturePanel
                badge="Search"
                titleLines={["Your Ctrl+F", "is garbage."]}
                body="Chats aren't documents — they're a headache. Piri's index makes them searchable, and the search is typo-tolerant: “rspn” finds “response”."
                stats={[
                    { value: "0.1s", label: "latency" },
                    { value: "fuzzy", label: "by default" },
                ]}
                mockup="search"
                flip
            />

            <FeaturePanel
                badge="Layout"
                titleLines={["Sits exactly", "where you want it."]}
                body="Docked to the edge, floating anywhere on screen, or integrated between panels. The chat makes room for it instantly — no jostling."
                stats={[
                    { value: "3", label: "layout modes" },
                    { value: "1", label: "drag to move" },
                ]}
                mockup="layout"
                flip={false}
            />

            {/* What's new — v1.0.5 */}
            <div id="whats-new" className="relative z-10 bg-[var(--color-bg)] py-24 md:py-36 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 hairline-fade" />
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] pointer-events-none"
                    style={{ background: `${BRONZE}14` }}
                />

                <div className="relative max-w-5xl mx-auto">
                    <motion.div {...reveal} transition={revealTransition()} className="text-center space-y-6 mb-16 md:mb-20">
                        <div className="flex justify-center">
                            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#A0816C]/30 bg-[#A0816C]/10 text-[#A0816C] text-xs font-medium tracking-wide">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A0816C] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#A0816C]" />
                                </span>
                                Released today
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                            What&apos;s new in{" "}
                            <span className="font-serif-display italic font-normal">v1.0.5</span>
                        </h2>
                        <p className="text-sm uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
                            June 2026 · Chrome + Firefox
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        {RELEASE_FEATURES.map((f, i) => (
                            <motion.div
                                key={f.title}
                                {...reveal}
                                transition={revealTransition(0.05 * (i % 3))}
                                className={`${f.span} group relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] p-7 md:p-8 overflow-hidden transition-colors duration-300 hover:border-[#A0816C]/30`}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${BRONZE}0D, transparent 70%)` }}
                                />
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-xl border border-[#A0816C]/25 bg-[#A0816C]/10 flex items-center justify-center text-[#A0816C] mb-5">
                                        {f.icon}
                                    </div>
                                    <h3 className={`font-semibold text-[var(--color-text-primary)] tracking-tight mb-2 ${f.big ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
                                        {f.title}
                                    </h3>
                                    <p className={`text-[var(--color-text-secondary)] leading-relaxed ${f.big ? "text-sm md:text-base max-w-lg" : "text-sm"}`}>
                                        {f.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Performance strip */}
                    <motion.div {...reveal} transition={revealTransition(0.1)} className="mt-16 md:mt-20">
                        <div className="hairline-fade mb-10" />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
                            {RELEASE_STATS.map((s) => (
                                <div key={s.label}>
                                    <div className="text-4xl md:text-5xl font-light text-[var(--color-text-primary)] tracking-tight font-serif-display">
                                        {s.value}
                                    </div>
                                    <div className="text-xs uppercase tracking-[0.15em] text-[var(--color-text-muted)] mt-3 max-w-[220px] mx-auto leading-relaxed">
                                        {s.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-sm text-[var(--color-text-muted)] mt-12 max-w-2xl mx-auto leading-relaxed">
                            Also in this release: live loading indicators while chats stream, readable
                            highlighted code blocks, instant sidebar layout, and a long list of fixes —
                            fully event-driven, with every constant polling loop removed.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="relative z-10 bg-[var(--color-bg)] py-28 md:py-40 flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 left-0 right-0 hairline-fade" />
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[700px] h-[300px] md:h-[400px] rounded-full blur-[130px] pointer-events-none"
                    style={{ background: `${BRONZE}1A` }}
                />
                <div className="relative z-10 text-center px-6">
                    <motion.div {...reveal} transition={revealTransition()}>
                        <Eyebrow>Two clicks away</Eyebrow>
                        <h3 className="text-4xl md:text-6xl font-semibold text-[var(--color-text-primary)] mt-8 mb-6 tracking-tight leading-[1.1] max-w-3xl mx-auto">
                            Scroll less. <br />
                            <span className="font-serif-display italic font-normal text-[var(--color-text-secondary)]">Find everything.</span>
                        </h3>
                        <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-10 max-w-md mx-auto leading-relaxed">
                            Free on Chrome and Firefox. Works with ChatGPT, Claude, and Gemini.
                        </p>
                        <a
                            href={getChromeWebStoreInstallUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-9 py-3.5 bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-full font-semibold text-base hover:opacity-90 transition-all hover:scale-[1.03]"
                        >
                            Add to Chrome — it&apos;s free
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
