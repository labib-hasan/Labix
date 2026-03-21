import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Labib Hasan | Fullstack Developer",
  description: "Premium portfolio showcasing modern web development projects and skills by Labib Hasan.",
/*   viewport: "width=device-width, initial-scale=1",
  themeColor: "#0f172a", */
  icons: {
    icon: "/favicon.ico",
  },
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-[#0a0a0f] text-white antialiased">
        <Navbar />
        <main className="pt-20 pb-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
