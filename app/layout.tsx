import "./globals.css";
import type { Metadata } from "next";



export const metadata = {
  title: "LastWord Pro",
  description:
    "Analyze messages for tone and risk. Get a safer final version and professional response options.",
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
      <body className="min-h-screen bg-white text-black antialiased overscroll-none">
  <div className="mx-auto min-h-screen max-w-md">
    {children}
  </div>
</body>

    </html>
  );
}
