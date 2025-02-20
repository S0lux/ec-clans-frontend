"use client";

import { ReactNode, useState } from "react";
import {
  Gavel,
  Info,
  LoaderCircle,
  LucideIcon,
  MailWarning,
  Menu,
  ScanEye,
  X,
} from "lucide-react";
import ClanNavButton from "@/src/shared/ui/clan-nav-button";
import { ClanOverviewCard } from "@/src/widgets/clan-overview-card/ui";
import { useQuery } from "@tanstack/react-query";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/src/shared/lib";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
      <ClanOverviewCard clanId={serverId} className="mb-5 md:mb-10" />

      <div className="flex flex-col gap-2 md:flex-row">
        {!query.isError && (
          <>
            {/* Mobile Hamburger Menu Button */}
            <div className="flex items-center justify-between p-4 pt-0 md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="rounded-md bg-neutral-800 p-2 transition-colors hover:bg-neutral-700"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Navigation Menu - Mobile Dropdown / Desktop Sidebar */}
            <nav
              className={`${
                mobileMenuOpen ? "block" : "hidden"
              } z-10 h-min w-full rounded-md bg-neutral-900 py-3 md:z-auto md:ml-12 md:block md:max-w-64 lg:ml-24 xl:ml-36 2xl:ml-64`}
            >
              {renderClanNavMenu()}
            </nav>

            {/* Main Content */}
            <div
              className={cn("w-full md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64", {
                "mt-4 md:mt-0": mobileMenuOpen,
              })}
            >
              {children}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
