"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChatGPTMockup } from "./ChatGPTMockup";
import { getChromeWebStoreInstallUrl } from '@/lib/chrome-store';

export function FeatureShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    return (
        <section ref={containerRef} className="relative bg-[var(--color-bg)]">
            
            {/* Feature 1: Scroll Navigator */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)] opacity-80" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#A0816C]/10 via-transparent to-transparent" />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-6 w-full h-full flex items-center">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center w-full">
                        
                        {/* Left content */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-[#A0816C]/10 text-[#A0816C] text-xs font-semibold tracking-wide border border-[#A0816C]/20 mb-6">
                                    Productivity
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] leading-[1.1] tracking-tight">
                                    Stop apologizing <br/>
                                    <span className="text-[var(--color-text-secondary)]">for being slow.</span>
                                </h2>
                            </motion.div>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-md"
                            >
                                "Sorry, scrolling." Pathetic. Piri indexes your AI convos. Find it fast. Look competent for once.
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="pt-4 flex items-center gap-8"
                            >
                                <div>
                                    <div className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">50x</div>
                                    <div className="text-sm text-[var(--color-text-secondary)] font-medium mt-1">faster navigation</div>
                                </div>
                                <div className="w-px h-12 bg-zinc-800 dark:bg-white/10" />
                                <div>
                                    <div className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">0</div>
                                    <div className="text-sm text-[var(--color-text-secondary)] font-medium mt-1">apologies given</div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Right mockup */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 60, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="lg:col-span-3 relative"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-2xl">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-[10s] ease-linear hover:scale-105"
                                    style={{ backgroundImage: "url('/bg2.jpg')" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-bg)]/80 via-[var(--color-bg)]/20 to-transparent" />
                                
                                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                                    <div className="w-full h-full transform transition-transform hover:scale-[1.02] duration-500">
                                        <ChatGPTMockup feature="indexing" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Ambient Glow */}
                            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#A0816C]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Feature 2: Search */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden border-t border-[var(--color-border-subtle)]">
                <div className="absolute inset-0 bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#6366F1]/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-6 w-full h-full flex items-center">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center w-full">
                        
                        {/* Left content */}
                        <div className="lg:col-span-2 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-[#6366F1]/10 text-[#6366F1] text-xs font-semibold tracking-wide border border-[#6366F1]/20 mb-6">
                                    Reality Check
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] leading-[1.1] tracking-tight">
                                    Your Ctrl+F <br/>
                                    <span className="text-[var(--color-text-secondary)]">is garbage.</span>
                                </h2>
                            </motion.div>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-md"
                            >
                                Because your chats aren't a document, they're a headache. Piri indexes them. Search works now. Duh.
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="pt-4 flex items-center gap-8"
                            >
                                <div>
                                    <div className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">0.1s</div>
                                    <div className="text-sm text-[var(--color-text-secondary)] font-medium mt-1">latency</div>
                                </div>
                                <div className="w-px h-12 bg-zinc-800 dark:bg-white/10" />
                                <div>
                                    <div className="text-4xl font-bold text-[var(--color-text-primary)] tracking-tight">4+</div>
                                    <div className="text-sm text-[var(--color-text-secondary)] font-medium mt-1">smart filters</div>
                                </div>
                            </motion.div>
                        </div>
                        
                        {/* Right mockup */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 60, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="lg:col-span-3 relative"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-2xl group">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:scale-105 transition-transform duration-1000"
                                    style={{ backgroundImage: "url('/bg3.jpg')" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)]/80 via-[var(--color-bg)]/20 to-transparent" />
                                
                                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                                    <div className="w-full h-full transform transition-transform hover:scale-[1.02] duration-500">
                                        <ChatGPTMockup feature="search" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Ambient Glow */}
                            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#6366F1]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Feature 3: Layout */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden border-t border-[var(--color-border-subtle)]">
                <div className="absolute inset-0 bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#10B981]/10 via-transparent to-transparent" />
                </div>
                
                <div className="relative max-w-7xl mx-auto px-6 w-full h-full flex items-center">
                    <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center w-full">
                        
                        {/* Left mockup - Order changed for variety */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 60, filter: "blur(20px)" }}
                            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true, margin: "-10%" }}
                            className="lg:col-span-3 relative order-2 lg:order-1"
                        >
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] shadow-2xl group">
                                <div 
                                    className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                    style={{ backgroundImage: "url('/bg4.jpg')" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-bl from-[var(--color-bg)]/80 via-[var(--color-bg)]/20 to-transparent" />
                                
                                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
                                    <div className="w-full h-full transform transition-transform hover:scale-[1.02] duration-500">
                                        <ChatGPTMockup feature="layout" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Ambient Glow */}
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#10B981]/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
                        </motion.div>
                        
                        {/* Right content */}
                        <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
                            <motion.div 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-[#10B981]/10 text-[#10B981] text-xs font-semibold tracking-wide border border-[#10B981]/20 mb-6">
                                    Common Sense
                                </span>
                                <h2 className="text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] leading-[1.1] tracking-tight">
                                    I can't believe <br/>
                                    <span className="text-[var(--color-text-secondary)]">I had to build this.</span>
                                </h2>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 40, filter: "blur(20px)" }}
                                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-10%" }}
                                className="pt-4 space-y-4"
                            >
                                {[
                                    { name: 'Docked', desc: 'Fixed to the right edge' },
                                    { name: 'Floating', desc: 'Drag anywhere you want' },
                                    { name: 'Integrated', desc: 'Seamlessly between panels' },
                                ].map((layout, i) => (
                                    <div key={layout.name} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border-subtle)] hover:bg-[var(--color-bg-card-hover)] transition-colors cursor-default group">
                                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 flex items-center justify-center text-[#10B981] text-sm font-bold group-hover:scale-110 transition-transform">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <div className="text-[var(--color-text-primary)] font-medium">{layout.name}</div>
                                            <div className="text-sm text-[var(--color-text-secondary)]">{layout.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple CTA - Final Sticky Card */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg-elevated)]/90 backdrop-blur-xl border-t border-[var(--color-border-subtle)]">
                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true, margin: "-10%" }}
                    >
                        <h3 className="text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-8 tracking-tighter leading-tight max-w-4xl mx-auto">
                            This tool is for people who <br/>
                            <span className="text-[var(--color-text-secondary)]">hate themselves a little less.</span>
                        </h3>
                        <p className="text-xl text-[var(--color-text-secondary)] mb-12 max-w-xl mx-auto">
                            You clearly don't. You're still scrolling. Piri auto-indexes. Do better.
                        </p>
                        <a 
                            href={getChromeWebStoreInstallUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-10 py-4 bg-[var(--color-text-primary)] text-[var(--color-bg)] rounded-full font-bold text-lg hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.3)] dark:shadow-[0_0_50px_rgba(0,0,0,0.3)]"
                        >
                            Add to Chrome - It's Free
                        </a>
                    </motion.div>
                </div>
                
                {/* Background effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 dark:bg-white/5 rounded-full blur-[120px] animate-pulse" />
                </div>
            </div>
        </section>
    );
}
