import ClanNavButton from "@/src/shared/ui/clan-nav-button";
import { Gavel, Info, ScanEye } from "lucide-react";

export default async function AdminClanLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ clanId: string }>;
}) {
  const { clanId } = await params;
  return (
    <div className="mt-10 flex h-full w-full flex-row overflow-y-scroll">
      <div className="w-full max-w-64 rounded-md bg-neutral-900 pt-3 xl:ml-36 xl:px-0 2xl:ml-64 2xl:px-0">
        <ClanNavButton
          href={`/admin/clans/${clanId}/info`}
          icon={Info}
          label="Information"
        />

        <ClanNavButton
          href={`/admin/clans/${clanId}/overseers`}
          icon={ScanEye}
          label="Overseers"
        />

        <ClanNavButton
          href={`/admin/clans/${clanId}/bans`}
          icon={Gavel}
          label="Bans"
          isUnavailable
        />
      </div>
      {children}
    </div>
  );
}
