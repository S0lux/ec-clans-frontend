"use client";

import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { cn } from "@/src/shared/lib";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import ErrorDisplay from "@/src/shared/ui/error-display";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { LevelDisplay } from "@/src/shared/ui/level-display";

export const ClanOverviewCard = ({
  clanId,
  className,
}: {
  clanId: string;
  className?: string;
}) => {
  const { data, isLoading, error } = useQuery(
    ClansQueries.getClanQuery(clanId),
  );

  if (error)
    return (
      <div
        className={cn(
          "relative mb-10 flex flex-row gap-5 rounded-md bg-neutral-900 md:mx-12 lg:mx-24 xl:mx-36 2xl:mx-64",
          className,
        )}
      >
        <ErrorDisplay error={error} className="h-36" />
      </div>
    );

  return (
    <div
      className={cn(
        "relative mb-10 flex h-fit flex-row gap-5 rounded-md bg-neutral-900 p-3 md:mx-12 lg:mx-24 xl:mx-36 2xl:mx-64",
        className,
      )}
    >
      {isLoading && (
        <Skeleton className="aspect-square h-[116px] w-[116px] rounded-full bg-foreground/10" />
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

      <div className="flex w-full flex-col gap-2 overflow-hidden">
        {/* Clan name */}
        {isLoading && <Skeleton className="h-7 w-64 bg-foreground/10" />}
        {data && (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold sm:text-xl md:w-auto md:text-2xl">
            {data.serverName}
          </span>
        )}

        {/* Status */}
        {isLoading && <Skeleton className="h-5 w-32 bg-foreground/10" />}
        {data && (
          <span className="text-sm text-foreground/50">
            Status:{" "}
            <span
              className={cn("font-semibold text-foreground/80", {
                "text-orange-500": data.status == "OFFICIAL",
                "text-gray-500": data.status == "UNOFFICIAL",
              })}
            >
              {data.status}
            </span>
          </span>
        )}

        {/* Clan owner */}
        {isLoading && <Skeleton className="h-5 w-44 bg-foreground/10" />}
        {data && (
          <span className="text-sm text-foreground/50">
            Owner:{" "}
            <span className="font-medium text-foreground/80">
              {data.serverOwner.username}#{data.serverOwner.discriminator}
            </span>
          </span>
        )}

        {/* Clan level - Now using our unified LevelDisplay component */}
        {isLoading && (
          <Skeleton className="hidden h-5 w-36 bg-foreground/10 sm:block" />
        )}
        {data && (
          <div className="hidden sm:block">
            <LevelDisplay
              points={data.status == "OFFICIAL" ? data.points : 0}
              mode="bar"
              status={data.status}
            />
          </div>
        )}
      </div>
    </div>
  );
};
