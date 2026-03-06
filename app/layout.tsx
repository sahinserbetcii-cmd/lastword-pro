import "./globals.css";
import GlobalShell from "./components/GlobalShell";
import type { Metadata } from "next";
import SaaSFooter from "./components/SaaSFooter";

export const metadata: Metadata = {
  title: {
    default: "LastWord Pro | Professional Communication Risk Analysis",
    template: "%s | LastWord Pro",
  },
  description:
    "AI-powered professional communication risk analysis. Detect tone risks, hierarchy friction, and escalation signals before you send.",

  keywords: [
    "communication risk analysis",
    "tone analysis tool",
    "professional email risk checker",
    "workplace communication AI",
    "corporate communication risk engine",
    "message tone analyzer",
  ],

  metadataBase: new URL("https://yourdomain.com"), // şimdilik placeholder
alternates: {
  canonical: "/",
},
robots: {
  index: true,
  follow: true,
},
  openGraph: {
  title: "LastWord Pro",
  description:
    "AI-powered communication risk analysis for professionals.",
  type: "website",
  images: [
    {
      url: "/og.png",
      width: 1200,
      height: 630,
      alt: "LastWord Pro - Communication Risk Detection",
    },
  ],
},
  twitter: {
  card: "summary_large_image",
  title: "LastWord Pro",
  description:
    "Stop risky emails before they damage your reputation.",
  images: ["/og.png"],
},
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B1220] text-[#ededed] antialiased overscroll-none">
  <div className="min-h-screen w-full">
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6">
      <>
  <GlobalShell>{children}</GlobalShell>
  <SaaSFooter />
</>
    </div>
  </div>
</body>


    </html>
  );
}
