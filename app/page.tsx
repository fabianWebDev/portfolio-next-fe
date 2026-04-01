import Description from "@/components/home/Description";
import MissionStatement from "@/components/home/MissionStatement";
import Wizard from "@/components/home/Wizard";

export default function Home() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <Wizard />
      <Description />
      <MissionStatement />
    </div>
  );
}
