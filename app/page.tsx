import Description from "@/components/home/Description";
import MissionStatement from "@/components/home/MissionStatement";
import Wizard from "@/components/home/Wizard";
import { defaultDescription, getSiteUrl, siteName } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: defaultDescription,
  openGraph: {
    title: siteName,
    description: defaultDescription,
    url: getSiteUrl(),
  },
  alternates: { canonical: getSiteUrl() },
};

export default function Home() {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl md:text-5xl mt-8 mb-8 font-semibold text-purple-400/90 dark:text-teal-500/90 font-[family-name:var(--font-sekuya)] tracking-wider text-center text-shadow-md dark:text-shadow-purple-600">WizOfCode</h1>
      <Wizard />
      <Description />
      <MissionStatement />
    </>
  );
}
