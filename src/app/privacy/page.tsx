'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6 relative overflow-hidden">
      {/* Decorative background SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/4">
          <img 
            src="/vector-decoration.svg" 
            alt="" 
            className="w-[800px] h-auto opacity-30"
            aria-hidden="true"
          />
        </div>
        <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 rotate-180">
          <img 
            src="/vector-decoration.svg" 
            alt="" 
            className="w-[600px] h-auto opacity-20"
            aria-hidden="true"
          />
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated: December 27, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-zinc-300 leading-relaxed">
            Piri ("we", "us", or "our") operates the Piri Chrome extension and website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. By using Piri, you agree to the collection and use of information in accordance with this policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
          
          <p className="text-zinc-300 leading-relaxed mb-4">
            When you use Google Sign-In to authenticate with our service, we collect the following information:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
            <li><strong>Email address:</strong> Used for account identification and communication</li>
            <li><strong>Name:</strong> Used for personalization and display in your profile</li>
            <li><strong>Profile picture:</strong> Used for display in your user profile</li>
          </ul>

          <p className="text-zinc-300 leading-relaxed mb-4">
            When you use the extension, we also collect:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
            <li><strong>Settings Data:</strong> We store your preferences (sidebar position, width, theme, auto-show settings) locally in your browser using Chrome's <code className="bg-zinc-800 px-1 rounded">chrome.storage.sync</code> API</li>
            <li><strong>Extension State:</strong> Information about panel open/closed status and other UI state preferences</li>
          </ul>

          <p className="text-zinc-300 leading-relaxed">
            <strong>Important:</strong> We do not collect, transmit, or store any chat content, conversation data, or messages from ChatGPT, Gemini, or Claude. All chat processing happens locally within your browser and is never sent to our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>Provide and maintain our service</li>
            <li>Authenticate your identity and manage your account</li>
            <li>Store and synchronize your preferences across devices using Chrome's built-in sync</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you about service updates (if applicable)</li>
            <li>Detect and prevent technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Extension settings and preferences are stored locally in your browser using Chrome's storage APIs. Settings may be synchronized across your devices if you have Chrome sync enabled.
          </p>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Authentication data and user information collected through Google Sign-In are stored securely. We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            We do not maintain servers that store your chat conversations or extension-generated content. All processing of chat conversations happens locally within your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
            <li>With service providers who assist us in operating our service, bound by confidentiality agreements</li>
          </ul>
          <p className="text-zinc-300 leading-relaxed mt-4">
            We do not share any chat content, conversation data, or messages with third parties, as this data never leaves your device.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li><strong>ChatGPT, Gemini, Claude:</strong> The extension interacts with these platforms' web interfaces. We do not collect or transmit any data from these platforms. All interactions happen locally in your browser.</li>
            <li><strong>Google OAuth:</strong> Used for authentication. Google's privacy policy applies to the authentication process.</li>
            <li><strong>Netlify:</strong> Our website (piri01.netlify.app) is hosted on Netlify. Used only for optional authentication and website hosting. No chat data is transmitted.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Permissions Explained</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            The extension requires the following permissions:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li><strong>activeTab:</strong> Allows the extension to interact with the current tab to display the sidebar</li>
            <li><strong>storage:</strong> Stores your preferences locally in your browser</li>
            <li><strong>tabs:</strong> Enables navigation and communication between extension components</li>
            <li><strong>windows:</strong> Allows opening the sidebar in a separate window (standalone mode)</li>
            <li><strong>host_permissions:</strong> Required to inject the sidebar UI into ChatGPT, Gemini, and Claude pages</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            You have the right to access, update, or delete your personal information at any time. You can manage your data through the following methods:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>You can disable or uninstall the extension at any time through Chrome's extension settings</li>
            <li>All stored extension data is removed when you uninstall the extension</li>
            <li>You can clear extension data through Chrome's extension settings</li>
            <li>You may revoke our access to your Google account at any time through your Google account settings</li>
            <li>Contact us directly if you need assistance with data management</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
          <p className="text-zinc-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date at the top of this page. Your continued use of the service after any changes constitutes acceptance of the new Privacy Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            If you have questions about this Privacy Policy, please contact us:
          </p>
          <div className="text-zinc-300 space-y-2">
            <p><strong>Email:</strong> <a href="mailto:sciencely98@gmail.com" className="text-blue-400 hover:underline">sciencely98@gmail.com</a></p>
            <p><strong>Website:</strong> <a href="https://piri01.netlify.app" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">piri01.netlify.app</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/vishesh9131" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/vishesh9131</a></p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Compliance</h2>
          <p className="text-zinc-300 leading-relaxed mb-2">
            This extension complies with:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-1">
            <li>Chrome Web Store Developer Program Policies</li>
            <li>General Data Protection Regulation (GDPR)</li>
            <li>California Consumer Privacy Act (CCPA)</li>
          </ul>
        </section>

        <div className="mt-12 pt-8 border-t border-zinc-800">
          <a 
            href="/" 
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
