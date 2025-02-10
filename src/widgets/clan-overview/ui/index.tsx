"use client";

import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export const ClanDetailsWidget = ({ clanId }: { clanId: string }) => {
  const { data, isLoading, error } = useQuery(
    ClansQueries.getClanQuery(clanId),
  );

  if (error)
    return (
      <div className="relative mb-10 flex flex-row gap-5 rounded-md bg-neutral-900 p-3 md:mx-12 lg:mx-24 xl:mx-36 2xl:mx-64">
        <span className="text-2xl font-bold">Clan not found</span>
      </div>
    );

  return (
    <div className="relative mb-10 flex flex-row gap-5 rounded-md bg-neutral-900 p-3 md:mx-12 lg:mx-24 xl:mx-36 2xl:mx-64">
      {isLoading && (
        <Skeleton className="h-[128px] w-[128px] rounded-full bg-foreground/10" />
      )}
      {data && (
        <Image
          src={data.serverLogo || "https://placehold.co/400/png?text=No+Logo"}
          alt={data.name}
          width={128}
          height={128}
          className="rounded-full"
        />
      )}

      <div className="flex flex-col gap-2">
        {isLoading && <Skeleton className="h-8 w-64 bg-foreground/10" />}
        {data && <span className="text-2xl font-bold">{data.name}</span>}
      </div>
    </div>
  );
};
