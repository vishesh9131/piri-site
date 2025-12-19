"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getChromeWebStoreInstallUrl } from '@/lib/chrome-store';
import { SignInSuccessModal } from '@/components/SignInSuccessModal';

function PostInstallContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const [isChecking, setIsChecking] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const userEmail = document.cookie
          .split('; ')
          .find(row => row.startsWith('user_email='));

        const nameCookie = document.cookie
          .split('; ')
          .find(row => row.startsWith('user_name='));

        if (userEmail || nameCookie) {
          setIsAuthenticated(true);
        }
      }
    };

    checkAuth();

    // If user came directly from Chrome Web Store (not from our site)
    // Redirect them to Chrome Web Store first, then they'll come back here after install
    if (source === 'direct') {
      // Redirect to Chrome Web Store with return URL
      window.location.href = getChromeWebStoreInstallUrl();
      return;
    }

    // If user came from Chrome Web Store after installation
    // Check if extension is installed
    const checkInstallation = async () => {
      try {
        // Small delay to allow extension to initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to detect if extension is installed
        setIsInstalled(true);
        setIsChecking(false);
      } catch (error) {
        setIsChecking(false);
      }
    };

    checkInstallation();
  }, [source]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-text-primary)] mx-auto mb-4"></div>
          <p className="text-[var(--color-text-secondary)]">Verifying installation...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SignInSuccessModal />
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4">
        <div className="text-center max-w-md w-full">
          {!isAuthenticated ? (
            <>
              <div className="mb-8">
                <svg className="w-16 h-16 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                  Extension Installed!
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                  You need to sign in to continue. Please sign in with Google to use Piri.
                </p>
              </div>
              
              <div className="flex justify-center">
                <a
                  href="/api/auth/google?return_to=post-install"
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-black text-base font-semibold rounded-full hover:bg-zinc-200 transition-all hover:scale-105"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                  You&apos;re All Set!
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                  Now you can go back to ChatGPT, Gemini, or Claude and refresh the page to toggle Piri.
                </p>
              </div>
              
              <div className="space-y-3">
                <a
                  href="https://chat.openai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all"
                >
                  Go to ChatGPT
                </a>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  or
                </div>
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all"
                >
                  Go to Claude
                </a>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  or
                </div>
                <a
                  href="https://gemini.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all"
                >
                  Go to Gemini
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-text-primary)] mx-auto mb-4"></div>
        <p className="text-[var(--color-text-secondary)]">Loading...</p>
      </div>
    </div>
  );
}

export default function PostInstallPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PostInstallContent />
    </Suspense>
  );
}
