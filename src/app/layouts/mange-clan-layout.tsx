"use client";

import { ReactNode } from "react";
import {
  Gavel,
  Info,
  LoaderCircle,
  LucideIcon,
  MailWarning,
  ScanEye,
} from "lucide-react";
import ClanNavButton from "@/src/shared/ui/clan-nav-button";
import { ClanOverviewCard } from "@/src/widgets/clan-overview-card/ui";
import { useQuery } from "@tanstack/react-query";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { useParams, usePathname } from "next/navigation";

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
      href: "strikes",
      icon: MailWarning,
      label: "Strikes",
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
      href: "strikes",
      icon: MailWarning,
      label: "Strikes",
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

export default function ManageClanLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { serverId } = useParams<{ serverId: string }>()!;
  const query = useQuery(ClansQueries.getClanQuery(serverId));
  const pathName = usePathname();

  const renderClanNavMenu = () => {
    if (query.isLoading) {
      return (
        <div className="flex h-32 w-full items-center justify-center">
          <LoaderCircle className="animate-spin text-foreground/10" />
        </div>
      );
    }

    if (query.data) {
      return (
        <>
          {NAV_ITEMS[query.data.status].map(
            ({ href, icon: Icon, label, isAvailable, unavailableMessage }) => (
              <ClanNavButton
                key={href}
                href={`/manage/${serverId}/${href}`}
                icon={Icon}
                label={label}
                isActive={pathName!.includes(`${serverId}/${href}`)}
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
      <ClanOverviewCard clanId={serverId} />

      <div className="flex flex-row gap-2">
        {!query.isError && (
          <>
            <nav className="h-min w-full max-w-64 rounded-md bg-neutral-900 py-3 xl:ml-36 xl:px-0 2xl:ml-64 2xl:px-0">
              {renderClanNavMenu()}
            </nav>
            {children}
          </>
        )}
      </div>
    </div>
  );
}
