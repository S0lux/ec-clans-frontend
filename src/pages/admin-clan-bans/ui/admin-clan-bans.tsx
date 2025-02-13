"use client";

import { BanQueries } from "@/src/entities/ban/ban.queries";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/shared/ui/components/shadcn/card";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { DataTable } from "./data-table";
import { BansTableColumns } from "./bans-table-columns";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { cn } from "@/src/shared/lib";

export default function AdminClanBansPage() {
  const params = useParams<{ clanId: string }>();
  const pathName = usePathname();

  const officialQuery = useQuery({
    ...BanQueries.getClanBansQuery(params?.clanId),
    enabled: !!params?.clanId && pathName?.includes("/clans/"),
  });

  const unOfficialQuery = useQuery({
    ...BanQueries.getGuildBansQuery(params?.clanId),
    enabled: !!params?.clanId && pathName?.includes("/unofficial-clans/"),
  });

  if (!params || !params.clanId) {
    return null;
  }

  // Determine which query to use based on the path
  const { data, isLoading, error } = pathName?.includes("/unofficial-clans/")
    ? unOfficialQuery
    : officialQuery;

  if (error) {
    return <div>Error loading bans list.</div>;
  }

  const totalBans = data?.length ?? 0;
  const syncedBans = data?.filter((ban) => ban.isServerBanned)?.length ?? 0;

  return (
    <Card className="w-full rounded-md border-none bg-neutral-900 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64">
      <CardHeader>
        <CardTitle className="text-foreground">Bans List</CardTitle>
        <CardDescription className="text-foreground/50">
          Compare this clan&apos;s bans with ECCD global bans list
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-96 w-full bg-foreground/5" />}
        {data && (
          <div className="flex flex-col gap-5">
            <span className="ml-auto text-foreground">
              Sync status:{" "}
              <span
                className={cn("font-semibold", {
                  "text-green-500": syncedBans === totalBans,
                  "text-yellow-500": syncedBans < totalBans,
                })}
              >
                {syncedBans}/{totalBans}
              </span>
            </span>
            <DataTable data={data} columns={BansTableColumns} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
