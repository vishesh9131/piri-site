"use client";

import { useEffect, useState } from 'react';

export function SignInSuccessModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('auth') === 'success') {
        setIsOpen(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[var(--color-bg)] border border-[var(--color-border-subtle)] rounded-2xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              Sign in Successful!
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Now you can go back to ChatGPT, Gemini, or Claude and refresh the page to toggle Piri.
            </p>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}


