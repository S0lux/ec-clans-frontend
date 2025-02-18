"use client";

import { ReactNode } from "react";
import { Gavel, Info, LucideIcon, ScanEye } from "lucide-react";
import ClanNavButton from "@/src/shared/ui/clan-nav-button";
import { ClanOverviewCard } from "@/src/widgets/clan-overview-card/ui";
import { useQuery } from "@tanstack/react-query";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { useParams, usePathname } from "next/navigation";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";

type ClanPathType = "OFFICIAL" | "UNOFFICIAL";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  isAvailable: boolean;
  unavailableMessage: string;
}

const NAV_ITEMS: Record<ClanPathType, NavItem[]> = {
  OFFICIAL: [
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
  UNOFFICIAL: [
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
  const query = useQuery(ClansQueries.getClanQuery(clanId));
  const pathName = usePathname();

  const renderClanNavMenu = () => {
    if (query.isLoading) {
      return <Skeleton className="h-36 w-full bg-foreground/5" />;
    }

    if (query.data) {
      return (
        <>
          {NAV_ITEMS[query.data.status].map(
            ({ href, icon: Icon, label, isAvailable, unavailableMessage }) => (
              <ClanNavButton
                key={href}
                href={`/admin/clans/${clanId}/${href}`}
                icon={Icon}
                label={label}
                isActive={pathName!.includes(`${clanId}/${href}`)}
                isAvailable={isAvailable}
                unavailableMessage={unavailableMessage}
              />
            ),
          )}
        </>
      );
    }
  };

  return (
    <div className="mt-10 flex h-full w-full flex-col overflow-y-scroll">
      <ClanOverviewCard clanId={clanId} />

      <div className="flex flex-row gap-2">
        <nav className="h-min w-full max-w-64 rounded-md bg-neutral-900 py-3 xl:ml-36 xl:px-0 2xl:ml-64 2xl:px-0">
          {renderClanNavMenu()}
        </nav>
        {children}
      </div>
    </div>
  );
}
