"use client";

import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import ErrorDisplay from "@/src/shared/ui/error-display";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const ClanOverviewCard = ({ clanId }: { clanId: string }) => {
  const { data, isLoading, error } = useQuery(
    ClansQueries.getClanQuery(clanId),
  );

  if (error)
    return (
      <div className="relative mb-10 flex flex-row gap-5 rounded-md bg-neutral-900 md:mx-12 lg:mx-24 xl:mx-36 2xl:mx-64">
        <ErrorDisplay error={error} className="h-36" />
      </div>
    );

  return (
    <div className="relative mb-10 flex h-fit flex-row gap-5 rounded-md bg-neutral-900 p-3 md:mx-12 lg:mx-24 xl:mx-36 2xl:mx-64">
      {isLoading && (
        <Skeleton className="h-[128px] w-[128px] rounded-full bg-foreground/10" />
      )}
      {data && (
        <Image
          src={data.serverIcon}
          alt={data.serverName}
          width={128}
          height={128}
          className="rounded-full"
        />
      )}

      <div className="flex flex-col gap-2">
        {/* Clan name */}
        {isLoading && <Skeleton className="h-8 w-64 bg-foreground/10" />}
        {data && (
          <span className="text-lg font-bold sm:text-xl md:text-2xl">
            {data.serverName}
          </span>
        )}

        {/* Clan owner */}
        {isLoading && <Skeleton className="h-6 w-32 bg-foreground/10" />}
        {data && (
          <span className="text-sm text-foreground/50">
            Owner:{" "}
            <span className="font-medium text-foreground/80">
              {data.serverOwner.username}#{data.serverOwner.discriminator}
            </span>
          </span>
        )}

        {/* Clan member count */}
        {isLoading && <Skeleton className="h-6 w-32 bg-foreground/10" />}
        {data && (
          <span className="text-sm text-foreground/50">
            Members:{" "}
            <span className="font-medium text-foreground/80">
              {data.serverTotalMembers}
            </span>
          </span>
        )}
      </div>
    </div>
  );
};
