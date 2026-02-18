import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Clarify — Deepfake Detection for Everyone",
  description: "Clarify detects deepfakes in video, audio, and images. Enterprise-grade AI detection built for everyday people.",
  keywords: ["deepfake detection", "AI authentication", "media verification", "synthetic media", "clarify"],
  openGraph: {
    title: "Clarify — Deepfake Detection for Everyone",
    description: "Detect deepfakes in video, audio, and images. Built for everyday people.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
