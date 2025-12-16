"use client";

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getChromeWebStoreInstallUrl } from '@/lib/chrome-store';

function PostInstallContent() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');
  const [isChecking, setIsChecking] = useState(true);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // If user came directly from Chrome Web Store (not from our site)
    // Redirect them to Chrome Web Store first, then they'll come back here after install
    if (source === 'direct') {
      // Redirect to Chrome Web Store with return URL
      window.location.href = getChromeWebStoreInstallUrl();
      return;
    }

    // If user came from Chrome Web Store after installation
    // Check if extension is installed and redirect to auth
    const checkInstallation = async () => {
      try {
        // Small delay to allow extension to initialize
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to detect if extension is installed
        // You can customize this based on your extension's behavior
        setIsInstalled(true);
        setIsChecking(false);
        
        // Redirect to Google auth after a short delay
        setTimeout(() => {
          window.location.href = '/api/auth/google';
        }, 1500);
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
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="mb-6">
          <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
            Extension Installed!
          </h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            {isInstalled 
              ? 'Redirecting you to sign in...' 
              : 'Please make sure the extension is installed and try again.'}
          </p>
        </div>
        
        {!isInstalled && (
          <a
            href="/api/auth/google"
            className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all"
          >
            Continue to Sign In
          </a>
        )}
      </div>
    </div>
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
