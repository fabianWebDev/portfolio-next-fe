import Description from "@/components/home/Description";
import MissionStatement from "@/components/home/MissionStatement";
import Wizard from "@/components/home/Wizard";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto w-full">
      <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">WizOfCode</h1>
      <Wizard />
      <Description />
      <MissionStatement />
    </div>
  );
}
