'use client';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated: December 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <p className="text-zinc-300 leading-relaxed">
            Piri is a browser extension that creates a table of contents for AI chat 
            conversations on ChatGPT, Claude, and Gemini. We are committed to protecting 
            your privacy and being transparent about our data practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Piri processes your AI chat conversations locally within your browser to 
            generate navigation headings. We do not collect, store, or transmit your 
            conversation content to any external servers.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            The extension stores the following data locally on your device:
          </p>
          <ul className="list-disc list-inside text-zinc-300 mt-2 space-y-1">
            <li>User preferences (theme settings, panel position)</li>
            <li>Extension state (panel open/closed)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Permissions</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Piri requires the following browser permissions:
          </p>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            <li>
              <strong>activeTab:</strong> To access the current tab when you click the 
              extension icon and read chat content for generating the table of contents.
            </li>
            <li>
              <strong>Host permissions:</strong> To run on ChatGPT, Claude, and Gemini 
              websites and read conversation messages.
            </li>
            <li>
              <strong>Storage:</strong> To save your preferences locally on your device.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="text-zinc-300 leading-relaxed">
            Piri does not share any data with third parties. All processing happens 
            locally in your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-zinc-300 leading-relaxed">
            Since all data is processed and stored locally on your device, your 
            information remains under your control. We do not have access to your 
            conversations or preferences.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-zinc-300 leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be 
            posted on this page with an updated revision date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-zinc-300 leading-relaxed">
            If you have questions about this privacy policy, you can reach us at{' '}
            <a 
              href="https://github.com/vishesh9131" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              github.com/vishesh9131
            </a>
          </p>
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

