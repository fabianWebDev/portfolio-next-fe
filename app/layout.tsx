import type { Metadata } from "next";
import { Inter, Sekuya } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import Container from "@/components/layout/Container";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const sekuya = Sekuya({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sekuya",
  weight: "400",
  fallback: ["system-ui", "sans-serif"],
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
    <html
      lang="en"
      className={`${inter.variable} ${sekuya.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <Container>
            <Navbar />
            <main>{children}</main>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
