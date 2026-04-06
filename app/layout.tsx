import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
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

          <MainSection>
            <Navbar />
            {children}
          </MainSection>
        </Providers>
      </body>
    </html>
  );
}
