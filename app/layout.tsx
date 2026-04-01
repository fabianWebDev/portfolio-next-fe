import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import SideBar from "@/components/layout/SideBar";
import MainSection from "@/components/layout/MainSection";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <div className="grid h-[calc(100vh-3.5rem)] min-h-0 grid-cols-12 pt-14">
            <SideBar />
            <MainSection>{children}</MainSection>
          </div>
        </Providers>
      </body>
    </html>
  );
}
