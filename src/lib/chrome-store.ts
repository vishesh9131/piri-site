// Chrome Web Store utility functions

// TypeScript declaration for Chrome Web Store API
declare global {
  interface Window {
    chrome?: {
      webstore?: {
        install: (url: string, onSuccess: () => void, onFailure: (error: string) => void) => void;
      };
    };
  }
}

const CHROME_WEB_STORE_EXTENSION_ID = 'hmcjeomjpobkoobpfcammdebhpoaaogg';

export function getChromeWebStoreUrl(returnUrl?: string): string {
  const baseUrl = `https://chromewebstore.google.com/detail/piri-ai-chat-navigator/${CHROME_WEB_STORE_EXTENSION_ID}`;
  
  if (returnUrl) {
    const encodedReturnUrl = encodeURIComponent(returnUrl);
    return `${baseUrl}?return_url=${encodedReturnUrl}`;
  }
  
  return baseUrl;
}

export function getChromeWebStoreInstallUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const returnUrl = `${baseUrl}/post-install?source=install`;
  return getChromeWebStoreUrl(returnUrl);
}

export function handleChromeInstall(onSuccess?: () => void, onFailure?: (error: string) => void) {
  if (typeof window === 'undefined') return;

  // Check if chrome.webstore is available (only works on Chrome)
  if (window.chrome && window.chrome.webstore && window.chrome.webstore.install) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const returnUrl = `${baseUrl}/post-install?source=install`;
    
    window.chrome.webstore.install(
      returnUrl,
      () => {
        // Installation successful
        if (onSuccess) onSuccess();
        window.location.href = returnUrl;
      },
      (error: string) => {
        // Installation failed or cancelled
        if (onFailure) onFailure(error);
        console.error('Chrome extension installation failed:', error);
      }
    );
  } else {
    // Fallback: redirect to Chrome Web Store
    window.location.href = getChromeWebStoreInstallUrl();
  }
}
