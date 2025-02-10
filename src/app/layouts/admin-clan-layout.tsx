"use client";

import ClanNavButton from "@/src/shared/ui/clan-nav-button";
import { ClanDetailsWidget } from "@/src/widgets/clan-overview/ui";
import { Gavel, Info, ScanEye } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

export default function AdminClanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { clanId } = useParams<{ clanId: string }>()!;
  const pathName = usePathname()!;

  return (
    <div className="mt-10 flex h-full w-full flex-col overflow-y-scroll">
      <ClanDetailsWidget clanId={clanId} />

      <div className="flex flex-row">
        <div className="w-full max-w-64 rounded-md bg-neutral-900 py-3 xl:ml-36 xl:px-0 2xl:ml-64 2xl:px-0">
          <ClanNavButton
            href={`/admin/clans/${clanId}/info`}
            icon={Info}
            label="Information"
            isActive={pathName === `/admin/clans/${clanId}/info`}
          />

          <ClanNavButton
            href={`/admin/clans/${clanId}/overseers`}
            icon={ScanEye}
            label="Overseers"
            isActive={pathName === `/admin/clans/${clanId}/overseers`}
          />

          <ClanNavButton
            href={`/admin/clans/${clanId}/bans`}
            icon={Gavel}
            label="Bans"
            isActive={pathName === `/admin/clans/${clanId}/bans`}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
