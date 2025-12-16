import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Piri - AI Chat Navigator | Stop Scrolling, Start Navigating",
  description: "Piri indexes your AI conversations. Dynamic table of contents for ChatGPT, Claude, and Gemini. Stop scrolling, start navigating.",
  keywords: ["AI", "ChatGPT", "Claude", "Gemini", "Chrome Extension", "Table of Contents", "Navigation"],
  icons: {
    icon: '/piri-icon.png',
  },
  openGraph: {
    title: "Piri - AI Chat Navigator",
    description: "Stop scrolling through endless AI chats. Piri creates a table of contents for instant navigation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-057V4CF2V8"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-057V4CF2V8');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
