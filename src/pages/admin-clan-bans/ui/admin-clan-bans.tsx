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
import { useParams } from "next/navigation";
import { DataTable } from "./data-table";
import { BansTableColumns } from "./bans-table-columns";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { cn } from "@/src/shared/lib";

export default function AdminClanBansPage() {
  const params = useParams<{ clanId: string }>();
  const { data, isLoading, error } = useQuery(
    BanQueries.getClanBansQuery(params?.clanId),
  );

  if (!params || !params.clanId) {
    return null;
  }

  if (error) {
    return <div>Error loading bans list.</div>;
  }

  const totalBans = data?.length;
  const syncedBans = data?.filter((ban) => ban.isServerBanned).length;

  return (
    <Card className="w-full rounded-md border-none bg-neutral-900 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64">
      <CardHeader>
        <CardTitle className="text-foreground">Bans List</CardTitle>
        <CardDescription className="text-foreground/50">
          Compare this clan&apos;s bans with ECCD global bans list
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {isLoading && (
          <Skeleton className="h-96 w-full bg-foreground/5"></Skeleton>
        )}
        {data && (
          <div className="flex flex-col gap-5">
            <span className="ml-auto text-foreground">
              Sync status:{" "}
              <span
                className={cn("font-semibold", {
                  "text-green-500": syncedBans === totalBans,
                  "text-yellow-500": syncedBans! < totalBans!,
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
