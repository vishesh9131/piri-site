"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { FeatureShowcase } from '@/components/FeatureShowcase';
import { GoogleSignIn } from '@/components/GoogleSignIn';
import { getChromeWebStoreInstallUrl } from '@/lib/chrome-store';

// Piri Logo SVG Component
const PiriLogo = ({ className = "", size = 32 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 682 682"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M321.978 550.667L35 550.403V533.183V515.966L200.553 516.261C291.609 516.426 366.109 516.47 366.109 516.361C366.109 515.959 107.246 431.499 53.4068 414.333C48.3078 412.706 43.967 410.909 43.7587 410.332C43.5525 409.759 45.6667 402.492 48.4557 394.187C53.2173 380.009 53.6797 379.107 56.0147 379.44C57.3811 379.632 73.0718 384.618 90.8808 390.519C147.961 409.43 276.518 451.274 337.233 470.704C350.937 475.088 362.378 478.446 362.657 478.167C362.938 477.888 359.481 474.944 354.978 471.626C350.472 468.31 339.689 459.956 331.015 453.063C309.397 435.885 278.226 411.367 234.376 377.045C222.695 367.903 201.376 351.12 187 339.75C172.625 328.379 146.82 307.975 129.657 294.404C112.493 280.834 97.5337 268.999 96.4131 268.105C94.4239 266.518 94.4697 266.362 98.2544 261.857C100.389 259.313 104.914 253.604 108.307 249.163C111.7 244.722 115.043 241.106 115.734 241.121C117.069 241.152 123.718 246.268 167.77 281.134C182.93 293.134 199.837 306.49 205.344 310.816C247.946 344.278 265.209 357.875 279.336 369.088C326.972 406.895 364.247 435.967 364.615 435.598C364.844 435.369 358.889 424.202 351.378 410.78C343.869 397.357 323.615 361.069 306.37 330.137C289.124 299.206 269.115 263.354 261.904 250.465C234.068 200.706 224.195 182.92 218.827 172.876C215.767 167.148 211.272 158.86 208.843 154.455C203.909 145.517 203.936 145.39 211.522 141.636C213.532 140.643 219.304 137.474 224.344 134.598C229.387 131.719 233.657 129.547 233.832 129.77C234.353 130.43 254.93 167.433 273.154 200.475C282.473 217.374 299.597 248.07 311.209 268.691C322.821 289.312 339.987 320.008 349.354 336.907C370.412 374.889 385.411 401.411 387.205 403.842C388.761 405.945 388.754 404.862 387.005 361.381C386.428 347.061 385.484 322.455 384.907 306.704C384.33 290.953 383.393 267.753 382.828 255.152C382.262 242.55 381.31 219.586 380.714 204.12C380.116 188.654 379.187 166.158 378.648 154.13C378.106 142.101 377.404 122.886 377.086 111.43C376.767 99.9734 376.236 86.5489 375.905 81.5957L375.305 72.5912L379.652 71.8601C387.086 70.6062 407.324 69.473 408.196 70.2604C408.653 70.6707 409.461 81.0396 409.994 93.3018C410.525 105.564 411.444 126.139 412.033 139.028C413.341 167.594 414.831 203.987 416.253 242.133C416.841 257.884 417.78 281.788 418.34 295.248C418.901 308.708 419.844 333.782 420.44 350.966C422.192 401.561 424.002 419.072 429.401 437.647C440.7 476.527 468.605 504.516 505.921 514.399C526.438 519.834 550.64 522.119 597.062 523.004L630.08 523.633L630.647 536.759C630.959 543.977 630.997 550.236 630.732 550.667C630.466 551.096 625.456 551.332 619.601 551.19C613.748 551.048 479.816 550.813 321.978 550.667Z" fill="currentColor" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const MoonIcon = () => (
  <svg className="w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

const HERO_HEADINGS = [
  { main: "This is a Stupid Tool", sub: "for a Stupid Problem." },
  { main: "Stop Apologizing", sub: "for being slow." },
  { main: "I Can’t Believe", sub: "I had to build this." },
  { main: "OpenAI Forgot UX", sub: "so we fixed it." },
  { main: "It’s Not Magic", sub: "It’s just a list. Relax." },
  { main: "Your Memory Sucks", sub: "That's why you need this." },
  { main: "Stop Doom Scrolling", sub: "through your own prompts." },
  { main: "Be a 10x Engineer", sub: "by doing less work." },
  { main: "It's 2025", sub: "and we still need this." }
];

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const wordVariants: Variants = {
  hidden: { 
    opacity: 0, 
    filter: "blur(15px)", 
    scale: 1.1, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    scale: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  },
  exit: { 
    opacity: 0, 
    filter: "blur(15px)", 
    scale: 0.95, 
    y: -20,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });
  const [headingIndex, setHeadingIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % HERO_HEADINGS.length);
    }, 3500); // Changed to 2.5s for readability with animations
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <div className="min-h-screen bg-transparent selection:bg-blue-500/30">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg)] backdrop-blur-xl">
        <nav className={`max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-6'}`}>
          <div className="flex items-center gap-2">
            <PiriLogo size={isScrolled ? 24 : 32} className={`text-[var(--color-text-primary)] transition-all duration-300`} />
            <span className={`font-semibold tracking-wide transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>Piri</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-[var(--color-bg-card)] transition-colors" title="Toggle Theme">
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">Features</a>
            <GoogleSignIn />
            <a
              href={getChromeWebStoreInstallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 bg-white text-black text-xs font-semibold rounded-full hover:bg-zinc-200 transition-all hover:scale-105"
            >
              Add to Chrome
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-20">

        {/* Intro Section */}
        <section className="text-center py-16 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center mb-6"
          >
            <PiriLogo size={64} className="text-[var(--color-text-primary)] opacity-90" />
          </motion.div>
          <div className="h-[140px] md:h-[180px] flex items-center justify-center mb-8 relative">
            <AnimatePresence>
              <motion.div
                key={headingIndex}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="flex flex-col items-center justify-center w-full absolute top-1/2 left-0 right-0 -translate-y-1/2"
              >
                <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                  <span className="block text-[var(--color-text-primary)] mb-2 md:mb-4">
                    {HERO_HEADINGS[headingIndex].main.split(" ").map((word, i) => (
                      <motion.span 
                        key={`main-${i}`} 
                        variants={wordVariants} 
                        className="inline-block mx-[0.15em] text-[var(--color-text-primary)]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                  <span className="block text-[var(--color-text-secondary)]">
                    {HERO_HEADINGS[headingIndex].sub.split(" ").map((word, i) => (
                      <motion.span 
                        key={`sub-${i}`} 
                        variants={wordVariants} 
                        className="inline-block mx-[0.15em] text-[var(--color-text-secondary)]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-8">
            You scroll. You lose. Piri auto-indexes your AI chats. Now you don&apos;t. You&apos;re welcome.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={getChromeWebStoreInstallUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-zinc-200 transition-all"
            >
              Add to Chrome
            </a>
            <button 
              onClick={() => {
                const demoSection = document.getElementById('demo-section');
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-6 py-2.5 bg-zinc-800 text-white text-sm font-medium rounded-full hover:bg-zinc-700 transition-all"
            >
              Try Interactive Demo
            </button>
          </div>
        </section>

        {/* Demo Workspace - Centered with Padding */}
        <section id="demo-section" className="w-full px-6 md:px-12 lg:px-20 pb-20">
          <div className="relative w-full max-w-7xl mx-auto h-[900px] rounded-3xl overflow-hidden border border-[var(--color-border-subtle)] bg-black shadow-2xl">
            {/* Background Image */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
              style={{ backgroundImage: "url('/demo-bg.jpg')" }}
            />

            {/* Demo Container - Centered */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              {/* Interactive Demo Component */}
              <InteractiveDemo />
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center z-20 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full text-xs text-white/70 border border-white/10">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                Drag, Resize, & Interact
              </span>
            </div>
          </div>
        </section>

        {/* Abstract Features Showcase */}
        <FeatureShowcase />

      </main>

      <footer className="relative overflow-hidden bg-[#050505] min-h-[100vh] flex flex-col justify-between">
        
        {/* Massive Text Background - Positioned to be behind content */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none overflow-hidden z-0 pb-[5vh]">
          <h2 
            className="text-[45vw] font-black leading-none tracking-tighter"
            style={{
              background: 'linear-gradient(to bottom, #1a1a1a 0%, #050505 80%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.8
            }}
          >
            Piri
          </h2>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full">
          
          {/* Background glow effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#A0816C]/5 rounded-full blur-[120px]" />
          
          {/* Tagline & CTAs */}
          <div className="text-center space-y-10 relative">
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Ready to try Piri?
            </h3>
            <p className="text-xl text-zinc-400 font-medium tracking-wide max-w-lg mx-auto">
              Free Chrome extension. Works with ChatGPT, Claude, and Gemini.
            </p>
            
            <div className="flex justify-center gap-4 pt-4">
              <a 
                href={getChromeWebStoreInstallUrl()} 
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-4 bg-white text-black rounded-full font-bold text-base hover:bg-zinc-200 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Add to Chrome
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="relative z-20 w-full border-t border-white/[0.06] bg-[#050505]/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-zinc-500">
              <PiriLogo size={20} className="text-[#A0816C]" />
              <span className="text-sm font-medium">© 2024 Piri</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-zinc-500 font-medium">
              <a href="https://github.com/vishesh9131" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
