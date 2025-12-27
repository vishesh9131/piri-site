'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Hero Section with Illustration */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/95 to-[#0a0a0a] z-10" />
          <img 
            src="/privacy-hero.png" 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-zinc-400">
            Your privacy matters to us. Here's how we protect it.
          </p>
          <p className="text-sm text-zinc-500 mt-4">
            Last updated: December 27, 2025
          </p>
        </div>
      </section>

      {/* Content Section */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        {/* Decorative Illustration 1 - positioned between sections */}
        <div className="relative my-20">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-64 h-64 opacity-10">
            <img 
              src="/privacy-decorative-1.png" 
              alt="" 
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">1. Introduction</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-lg text-zinc-300 leading-relaxed">
              Piri ("we", "us", or "our") operates the Piri Chrome extension and website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. By using Piri, you agree to the collection and use of information in accordance with this policy.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">2. Information We Collect</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Google Sign-In Information</h3>
              <p className="text-zinc-400 mb-4">
                When you use Google Sign-In to authenticate with our service, we collect the following information:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-300"><strong className="text-white">Email address:</strong> Used for account identification and communication</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-300"><strong className="text-white">Name:</strong> Used for personalization and display in your profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-zinc-300"><strong className="text-white">Profile picture:</strong> Used for display in your user profile</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-3 text-zinc-200">Extension Usage Information</h3>
              <p className="text-zinc-400 mb-4">
                When you use the extension, we also collect:
              </p>
              <ul className="space-y-3 ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-zinc-300"><strong className="text-white">Settings Data:</strong> We store your preferences (sidebar position, width, theme, auto-show settings) locally in your browser using Chrome's <code className="bg-zinc-900 px-2 py-1 rounded text-sm text-zinc-200">chrome.storage.sync</code> API</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-zinc-300"><strong className="text-white">Extension State:</strong> Information about panel open/closed status and other UI state preferences</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-zinc-900/50 border border-blue-500/20 rounded-xl backdrop-blur-sm">
              <p className="text-zinc-200 leading-relaxed">
                <strong className="text-white text-lg">Important:</strong> We do not collect, transmit, or store any chat content, conversation data, or messages from ChatGPT, Gemini, or Claude. All chat processing happens locally within your browser and is never sent to our servers.
              </p>
            </div>
          </div>
        </section>

        {/* Decorative Illustration 2 - between major sections */}
        <div className="relative my-20">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-80 h-80 opacity-10">
            <img 
              src="/privacy-decorative-2.png" 
              alt="" 
              className="w-full h-full object-contain"
              aria-hidden="true"
            />
          </div>
        </div>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-orange-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">3. How We Use Your Information</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-zinc-400 mb-6">
              We use the information we collect to:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Provide and maintain our service',
                'Authenticate your identity and manage your account',
                'Store and synchronize your preferences across devices',
                'Improve and personalize your experience',
                'Communicate with you about service updates',
                'Detect and prevent technical issues'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                  <span className="text-orange-400 mt-0.5">✓</span>
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-orange-500 to-yellow-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">4. Data Storage and Security</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800 space-y-4">
            <p className="text-lg text-zinc-300 leading-relaxed">
              Extension settings and preferences are stored locally in your browser using Chrome's storage APIs. Settings may be synchronized across your devices if you have Chrome sync enabled.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Authentication data and user information collected through Google Sign-In are stored securely. We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              We do not maintain servers that store your chat conversations or extension-generated content. All processing of chat conversations happens locally within your browser.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-yellow-500 to-green-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">5. Data Sharing and Disclosure</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800 space-y-4">
            <p className="text-lg text-zinc-300 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                'With your consent',
                'To comply with legal obligations',
                'To protect our rights and safety',
                'With service providers who assist us in operating our service, bound by confidentiality agreements'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-zinc-200">
                We do not share any chat content, conversation data, or messages with third parties, as this data never leaves your device.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-blue-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">6. Third-Party Services</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <ul className="space-y-4">
              <li className="text-zinc-300">
                <strong className="text-white">ChatGPT, Gemini, Claude:</strong> The extension interacts with these platforms' web interfaces. We do not collect or transmit any data from these platforms. All interactions happen locally in your browser.
              </li>
              <li className="text-zinc-300">
                <strong className="text-white">Google OAuth:</strong> Used for authentication. Google's privacy policy applies to the authentication process.
              </li>
              <li className="text-zinc-300">
                <strong className="text-white">Netlify:</strong> Our website (piri01.netlify.app) is hosted on Netlify. Used only for optional authentication and website hosting. No chat data is transmitted.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">7. Permissions Explained</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-zinc-400 mb-6">
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
                <div key={idx} className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                  <code className="text-blue-400 font-mono text-sm">{perm.name}</code>
                  <p className="text-zinc-300 mt-2">{perm.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">8. Your Rights</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
              You have the right to access, update, or delete your personal information at any time. You can manage your data through the following methods:
            </p>
            <ul className="space-y-3 ml-4">
              {[
                "You can disable or uninstall the extension at any time through Chrome's extension settings",
                'All stored extension data is removed when you uninstall the extension',
                "You can clear extension data through Chrome's extension settings",
                'You may revoke our access to your Google account at any time through your Google account settings',
                'Contact us directly if you need assistance with data management'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">9. Changes to This Policy</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-lg text-zinc-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this page. Your continued use of the service after any changes constitutes acceptance of the new Privacy Policy.
            </p>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-pink-500 to-red-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">10. Contact Us</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-lg text-zinc-300 mb-6">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                <span className="text-red-400 font-semibold">Email:</span>
                <a href="mailto:sciencely98@gmail.com" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  sciencely98@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                <span className="text-red-400 font-semibold">Website:</span>
                <a href="https://piri01.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  piri01.netlify.app
                </a>
              </div>
              <div className="flex items-center gap-4 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50">
                <span className="text-red-400 font-semibold">GitHub:</span>
                <a href="https://github.com/vishesh9131" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                  github.com/vishesh9131
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-pink-500 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-bold">11. Compliance</h2>
          </div>
          <div className="ml-6 pl-6 border-l border-zinc-800">
            <p className="text-lg text-zinc-300 mb-4">
              This extension complies with:
            </p>
            <div className="flex flex-wrap gap-3">
              {['Chrome Web Store Developer Program Policies', 'General Data Protection Regulation (GDPR)', 'California Consumer Privacy Act (CCPA)'].map((item, idx) => (
                <span key={idx} className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-full text-sm text-zinc-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-20 pt-12 border-t border-zinc-800 flex justify-center">
          <a 
            href="/" 
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-all hover:scale-105"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
