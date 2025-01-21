import { ResponsiveContainer } from "@/src/shared/ui";
import { LandingContent } from "./landing-content";
import { OfficialServersList } from "./official-servers-list";

export function Homepage() {
  return (
    <ResponsiveContainer className="justify-center overflow-y-scroll pb-5 pt-5">
      <LandingContent />
      <OfficialServersList />
    </ResponsiveContainer>
  );
}
