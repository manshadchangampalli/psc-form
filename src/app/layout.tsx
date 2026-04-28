import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "PSC വിജയം | ദിവസവും 10 ചോദ്യങ്ങൾ വാട്സാപ്പിൽ | Kerala PSC Prep",
  description:
    "Kerala PSC പരീക്ഷയ്ക്ക് തയ്യാറെടുക്കുകയാണോ? ദിവസവും 10 ട്രെൻഡിങ് ചോദ്യങ്ങൾ നേരിട്ട് നിങ്ങളുടെ വാട്സാപ്പിൽ ലഭിക്കും. ആദ്യ 100 പേർക്ക് 1 മാസം പൂർണ്ണമായും സൗജന്യം. ഇപ്പോൾ തന്നെ ജോയിൻ ചെയ്യൂ!",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "PSC വിജയം | ദിവസവും 10 ചോദ്യങ്ങൾ വാട്സാപ്പിൽ",
    description: "ദിവസവും 10 ട്രെൻഡിങ് ചോദ്യങ്ങൾ നേരിട്ട് നിങ്ങളുടെ വാട്സാപ്പിൽ. ആദ്യ 100 പേർക്ക് 1 മാസം സൗജന്യം.",
    siteName: "PSC വിജയം",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kerala PSC Exam Prep - WhatsApp Questions",
      },
    ],
    locale: "ml_IN",
    type: "website",
  },
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
