import type { Metadata } from "next";
import { Inter, Sekuya} from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import Container from "@/components/layout/Container";
import Footer from "@/components/footer/Footer";

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
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Providers>
          <Container>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </Container>
        </Providers>
      </body>
    </html>
  );
}
