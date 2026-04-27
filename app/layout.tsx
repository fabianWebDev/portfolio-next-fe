import type { Metadata } from "next";
import { Inter, Sekuya} from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "@/components/Navbar";
import Container from "@/components/layout/Container";
import Footer from "@/components/footer/Footer";
import { defaultDescription, getSiteUrl, siteName } from "@/lib/site";

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

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  applicationName: siteName,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName,
    title: siteName,
    description: defaultDescription,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: defaultDescription,
  },
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
