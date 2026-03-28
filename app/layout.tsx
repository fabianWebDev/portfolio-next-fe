import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/layout/SideBar";
import MainSection from "@/components/layout/MainSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WizOfCode",
  description: "WizOfCode is a portfolio website for a software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-12 pt-14">
            <SideBar />
            <MainSection>{children}</MainSection>
          </div>
        </Providers>
      </body>
    </html>
  );
}
