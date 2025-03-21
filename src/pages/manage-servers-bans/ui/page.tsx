"use client";

import { cn } from "@/src/shared/lib";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/shared/ui/components/shadcn/card";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { BansTableColumns } from "./bans-table-columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/dist/client/components/navigation";
import { BanQueries } from "@/src/entities/ban/ban.queries";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import ErrorDisplay from "@/src/shared/ui/error-display";
import { useSynchronizeBans } from "@/src/features/clans/synchronize-bans/synchronize-bans.mutation";
import { useCallback, useState } from "react";

export default function ManageClanBansPage() {
  const params = useParams<{ serverId: string }>()!;

  const bansQuery = useQuery(BanQueries.getClanBansQuery(params.serverId));
  const synchronizeBans = useSynchronizeBans();

  const [failedBans, setFailedBans] = useState<string[]>([]);

  const permissionsQuery = useQuery(
    ClansQueries.getClanPermissionsQuery(params.serverId),
  );

  const totalBans = bansQuery.data?.length || 0;
  const syncedBans =
    bansQuery.data?.filter((ban) => ban.isServerBanned)?.length || 0;

  const handleSynchronizeBans = useCallback(async () => {
    try {
      const result = await synchronizeBans.mutateAsync({
        serverId: params.serverId,
      });

      setFailedBans(result.failedUsers);
    } catch {}
  }, [params.serverId, synchronizeBans]);

  if (
    permissionsQuery.data &&
    (!permissionsQuery.data.BanMembers || !permissionsQuery.data.ManageGuild)
  ) {
    return (
      <ErrorDisplay
        className="rounded-md bg-neutral-900 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64"
        errorMessage="This feature requires BAN_MEMBERS and MANAGE_SERVER permissions"
      />
    );
  }

  return (
    <Card className="w-full rounded-md border-none bg-neutral-900 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64">
      <CardHeader>
        <CardTitle className="text-foreground">Bans List</CardTitle>
        <CardDescription className="text-foreground/50">
          Compare this clan&apos;s bans with ECCD global bans list
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bansQuery.isLoading && (
          <Skeleton className="h-96 w-full bg-foreground/5" />
        )}
        {bansQuery.data && (
          <div className="flex flex-col gap-5">
            <div className="flex w-full flex-row">
              <Button
                className="bg-yellow-700 font-semibold hover:bg-yellow-800"
                onClick={() => handleSynchronizeBans()}
                disabled={synchronizeBans.isPending}
              >
                Sync All
              </Button>
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
            </div>
            {failedBans.length > 0 && (
              <div className="flex flex-col gap-2 rounded-md border border-red-700 bg-red-700/5 p-2 text-red-400">
                <p>
                  Failed to ban the following ids, make sure these users do not
                  have higher permission levels than the bot.
                </p>
                <p>IDs: {failedBans.toString()}</p>
              </div>
            )}
            <DataTable data={bansQuery.data} columns={BansTableColumns} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
