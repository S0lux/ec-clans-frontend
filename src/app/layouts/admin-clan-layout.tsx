"use client";

import { ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import { Gavel, Info, LucideIcon, ScanEye } from "lucide-react";
import ClanNavButton from "@/src/shared/ui/clan-nav-button";
import { OfficialClanDetailsWidget } from "@/src/widgets/official-clan-overview/ui";
import { UnOfficialClanDetailsWidget } from "@/src/widgets/unofficial-clan-overview/ui";

type ClanPathType = "clans" | "unofficial-clans";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  isAvailable: boolean;
  unavailableMessage: string;
}

const NAV_ITEMS: Record<ClanPathType, NavItem[]> = {
  clans: [
    {
      href: "info",
      icon: Info,
      label: "Information",
      isAvailable: true,
      unavailableMessage: "",
    },
    {
      href: "overseers",
      icon: ScanEye,
      label: "Overseers",
      isAvailable: false,
      unavailableMessage: "This feature is being worked on",
    },
    {
      href: "bans",
      icon: Gavel,
      label: "Bans",
      isAvailable: true,
      unavailableMessage: "",
    },
  ],
  "unofficial-clans": [
    {
      href: "info",
      icon: Info,
      label: "Information",
      isAvailable: false,
      unavailableMessage: "This feature is only for official clans",
    },
    {
      href: "overseers",
      icon: ScanEye,
      label: "Overseers",
      isAvailable: false,
      unavailableMessage: "This feature is only for official clans",
    },
    {
      href: "bans",
      icon: Gavel,
      label: "Bans",
      isAvailable: true,
      unavailableMessage: "",
    },
  ],
};

export default function AdminClanLayout({ children }: { children: ReactNode }) {
  const { clanId } = useParams<{ clanId: string }>()!;
  const pathName = usePathname();

  if (!clanId || !pathName) {
    throw new Error("Missing required route parameters");
  }

  const clanPath = pathName.includes("/unofficial-clans/")
    ? "unofficial-clans"
    : "clans";

  const ClanDetails =
    clanPath === "clans"
      ? OfficialClanDetailsWidget
      : UnOfficialClanDetailsWidget;

  return (
    <div className="mt-10 flex h-full w-full flex-col overflow-y-scroll">
      <ClanDetails clanId={clanId} />

      <div className="flex flex-row gap-2">
        <nav className="h-min w-full max-w-64 rounded-md bg-neutral-900 py-3 xl:ml-36 xl:px-0 2xl:ml-64 2xl:px-0">
          {NAV_ITEMS[clanPath].map(
            ({ href, icon: Icon, label, isAvailable, unavailableMessage }) => (
              <ClanNavButton
                key={href}
                href={`/admin/${clanPath}/${clanId}/${href}`}
                icon={Icon}
                label={label}
                isActive={pathName.includes(`${clanId}/${href}`)}
                isAvailable={isAvailable}
                unavailableMessage={unavailableMessage}
              />
            ),
          )}
        </nav>
        {children}
      </div>
    </div>
  );
}
