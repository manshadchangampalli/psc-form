import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSC വിജയം — ദിവസവും 10 ട്രെൻഡിങ് PSC ചോദ്യങ്ങൾ",
  description:
    "നിങ്ങൾ PSC പരീക്ഷയ്ക്ക് തയ്യാറെടുക്കുകയാണോ? ദിവസവും 10 ട്രെൻഡിങ് PSC ചോദ്യങ്ങൾ വാട്സാപ്പിലൂടെ ലഭിക്കും. ആദ്യ 100 പേർക്ക് ഒരു മാസം സൗജന്യം.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <html lang="ml" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        {recaptchaSiteKey && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
