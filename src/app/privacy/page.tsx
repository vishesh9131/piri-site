'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy for Piri Extension</h1>
        <p className="text-zinc-400 mb-8">Last updated: December 27, 2025</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-zinc-300 leading-relaxed">
            Piri ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use the Piri browser extension.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-4">Local Storage Only</h3>
          <ul className="list-disc list-inside text-zinc-300 space-y-2 mb-4">
            <li>
              <strong>Settings Data:</strong> We store your preferences (sidebar position, width, theme, auto-show settings) locally in your browser using Chrome's <code className="bg-zinc-800 px-1 rounded">chrome.storage.sync</code> API
            </li>
            <li>
              <strong>No Personal Data:</strong> We do not collect, transmit, or store any personal information, chat content, or conversation data
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-4">Authentication (Optional)</h3>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>If you choose to authenticate with our service at <code className="bg-zinc-800 px-1 rounded">piri01.netlify.app</code>, authentication tokens are stored locally in your browser</li>
            <li>We do not have access to your chat conversations or messages from ChatGPT, Gemini, or Claude</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li><strong>Local Settings:</strong> Your preferences are stored locally to provide a personalized experience</li>
            <li><strong>No External Transmission:</strong> All data remains on your device. We do not send any data to external servers except for optional authentication</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>All extension data is stored locally in your browser</li>
            <li>Settings are synchronized across your devices using Chrome's built-in sync (if enabled)</li>
            <li>We do not maintain any servers that store your data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li><strong>ChatGPT, Gemini, Claude:</strong> The extension interacts with these platforms' web interfaces. We do not collect or transmit any data from these platforms</li>
            <li><strong>Netlify (piri01.netlify.app):</strong> Used only for optional authentication. No chat data is transmitted</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Permissions Explained</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li><strong>activeTab:</strong> Allows the extension to interact with the current tab to display the sidebar</li>
            <li><strong>storage:</strong> Stores your preferences locally</li>
            <li><strong>tabs:</strong> Enables navigation and communication between extension components</li>
            <li><strong>windows:</strong> Allows opening the sidebar in a separate window (standalone mode)</li>
            <li><strong>host_permissions:</strong> Required to inject the sidebar UI into ChatGPT, Gemini, and Claude pages</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>You can disable or uninstall the extension at any time</li>
            <li>All stored data is removed when you uninstall the extension</li>
            <li>You can clear extension data through Chrome's extension settings</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-zinc-300 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-zinc-300 leading-relaxed">
            If you have questions about this Privacy Policy, please contact us through the extension's support channels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Compliance</h2>
          <p className="text-zinc-300 leading-relaxed mb-2">
            This extension complies with:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-1">
            <li>Chrome Web Store Developer Program Policies</li>
            <li>General Data Protection Regulation (GDPR) - as we do not collect personal data</li>
            <li>California Consumer Privacy Act (CCPA) - as we do not sell or share user data</li>
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
