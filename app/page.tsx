import Description from "@/components/home/Description";
import MissionStatement from "@/components/home/MissionStatement";
import Wizard from "@/components/home/Wizard";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl mt-8 mb-8 font-semibold text-purple-400/90 dark:text-teal-500/90 font-[family-name:var(--font-sekuya)] tracking-wider text-center text-shadow-md dark:text-shadow-purple-600">WizOfCode</h1>
      <Wizard />
      <Description />
      <MissionStatement />
    </>
  );
}
