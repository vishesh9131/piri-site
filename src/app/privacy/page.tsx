'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] relative">
      {/* Subtle background illustration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.015]">
          <img 
            src="/privacy-hero.png" 
            alt="" 
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.012]">
          <img 
            src="/privacy-decorative-1.png" 
            alt="" 
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-24 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--color-text-primary)]">
          Privacy Policy
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          Last updated: December 27, 2025
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-24">
        
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">1. Introduction</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Piri ("we", "us", or "our") operates the Piri Chrome extension and website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. By using Piri, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">2. Information We Collect</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Google Sign-In Information</h3>
              <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                When you use Google Sign-In to authenticate with our service, we collect the following information:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Email address:</strong> Used for account identification and communication
                </li>
                <li className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Name:</strong> Used for personalization and display in your profile
                </li>
                <li className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Profile picture:</strong> Used for display in your user profile
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 text-[var(--color-text-primary)]">Extension Usage Information</h3>
              <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
                When you use the extension, we also collect:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Settings Data:</strong> We store your preferences (sidebar position, width, theme, auto-show settings) locally in your browser using Chrome's <code className="bg-[var(--color-bg-card)] px-1.5 py-0.5 rounded text-xs text-[var(--color-text-secondary)]">chrome.storage.sync</code> API
                </li>
                <li className="text-[var(--color-text-secondary)] leading-relaxed">
                  <strong className="text-[var(--color-text-primary)]">Extension State:</strong> Information about panel open/closed status and other UI state preferences
                </li>
              </ul>
            </div>

            <div className="pt-6 border-t border-[var(--color-border)]">
              <p className="text-[var(--color-text-primary)] leading-relaxed">
                <strong>Important:</strong> We do not collect, transmit, or store any chat content, conversation data, or messages from ChatGPT, Gemini, or Claude. All chat processing happens locally within your browser and is never sent to our servers.
              </p>
            </div>
          </div>
        </section>

        {/* Subtle decorative break */}
        <div className="my-20 relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-32 h-32 opacity-[0.02]">
            <img 
              src="/privacy-decorative-2.png" 
              alt="" 
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">3. How We Use Your Information</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="space-y-3 ml-6">
              {[
                'Provide and maintain our service',
                'Authenticate your identity and manage your account',
                'Store and synchronize your preferences across devices using Chrome\'s built-in sync',
                'Improve and personalize your experience',
                'Communicate with you about service updates (if applicable)',
                'Detect and prevent technical issues'
              ].map((item, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">4. Data Storage and Security</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Extension settings and preferences are stored locally in your browser using Chrome's storage APIs. Settings may be synchronized across your devices if you have Chrome sync enabled.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Authentication data and user information collected through Google Sign-In are stored securely. We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We do not maintain servers that store your chat conversations or extension-generated content. All processing of chat conversations happens locally within your browser.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">5. Data Sharing and Disclosure</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-3 ml-6">
              {[
                'With your consent',
                'To comply with legal obligations',
                'To protect our rights and safety',
                'With service providers who assist us in operating our service, bound by confidentiality agreements'
              ].map((item, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[var(--color-text-primary)] pt-4 leading-relaxed">
              We do not share any chat content, conversation data, or messages with third parties, as this data never leaves your device.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">6. Third-Party Services</h2>
          <div className="space-y-4">
            <div className="text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text-primary)]">ChatGPT, Gemini, Claude:</strong> The extension interacts with these platforms' web interfaces. We do not collect or transmit any data from these platforms. All interactions happen locally in your browser.
            </div>
            <div className="text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text-primary)]">Google OAuth:</strong> Used for authentication. Google's privacy policy applies to the authentication process.
            </div>
            <div className="text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text-primary)]">Netlify:</strong> Our website (piri01.netlify.app) is hosted on Netlify. Used only for optional authentication and website hosting. No chat data is transmitted.
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">7. Permissions Explained</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              The extension requires the following permissions:
            </p>
            <div className="space-y-4">
              {[
                { name: 'activeTab', desc: 'Allows the extension to interact with the current tab to display the sidebar' },
                { name: 'storage', desc: 'Stores your preferences locally in your browser' },
                { name: 'tabs', desc: 'Enables navigation and communication between extension components' },
                { name: 'windows', desc: 'Allows opening the sidebar in a separate window (standalone mode)' },
                { name: 'host_permissions', desc: 'Required to inject the sidebar UI into ChatGPT, Gemini, and Claude pages' }
              ].map((perm, idx) => (
                <div key={idx} className="pb-4 border-b border-[var(--color-border)] last:border-0">
                  <code className="text-sm text-[var(--color-text-primary)] font-mono">{perm.name}</code>
                  <p className="text-[var(--color-text-secondary)] mt-2 leading-relaxed">{perm.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">8. Your Rights</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. You can manage your data through the following methods:
            </p>
            <ul className="space-y-3 ml-6">
              {[
                "You can disable or uninstall the extension at any time through Chrome's extension settings",
                'All stored extension data is removed when you uninstall the extension',
                "You can clear extension data through Chrome's extension settings",
                'You may revoke our access to your Google account at any time through your Google account settings',
                'Contact us directly if you need assistance with data management'
              ].map((item, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">9. Changes to This Policy</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this page. Your continued use of the service after any changes constitutes acceptance of the new Privacy Policy.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">10. Contact Us</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-3">
              <div className="text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-text-primary)]">Email:</span>{' '}
                <a href="mailto:sciencely98@gmail.com" className="underline hover:no-underline">
                  sciencely98@gmail.com
                </a>
              </div>
              <div className="text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-text-primary)]">Website:</span>{' '}
                <a href="https://piri01.netlify.app" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  piri01.netlify.app
                </a>
              </div>
              <div className="text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-text-primary)]">GitHub:</span>{' '}
                <a href="https://github.com/vishesh9131" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                  github.com/vishesh9131
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--color-text-primary)]">11. Compliance</h2>
          <div className="space-y-4">
            <p className="text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              This extension complies with:
            </p>
            <ul className="space-y-2 ml-6">
              {[
                'Chrome Web Store Developer Program Policies',
                'General Data Protection Regulation (GDPR)',
                'California Consumer Privacy Act (CCPA)'
              ].map((item, idx) => (
                <li key={idx} className="text-[var(--color-text-secondary)] leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-24 pt-12 border-t border-[var(--color-border)]">
          <a 
            href="/" 
            className="inline-block text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
