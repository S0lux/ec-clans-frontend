"use client";

import { Input } from "@/src/shared/ui/components/shadcn/input";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/src/shared/lib";
import Link from "next/link";
import { ClansQueries } from "@/src/entities/clan/clan.queries";

export const AdminOfficialClanList = ({
  className,
}: {
  className?: string;
}) => {
  const [clanName, setClanName] = useState("");
  const debouncedClanName = useDebounce(clanName, 500);

  const { data, isLoading, error } = useQuery(
    ClansQueries.getClansQuery(0, 10, debouncedClanName),
  );

  return (
    <div className={cn("space-y-5", className)}>
      <Input
        type="text"
        placeholder="Search clan..."
        value={clanName}
        onChange={(e) => setClanName(e.target.value)}
      />
      <div>
        {isLoading && <div className="text-neutral-500">Loading...</div>}
        {error && <div className="text-red-500">Error: {error.message}</div>}
        {data && (
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {data.results.map((clan) => (
              <Link href={`/admin/clans/${clan.clanId}`} key={clan.clanId}>
                <div className="relative flex flex-row items-center gap-5 rounded-md p-2 text-white hover:bg-foreground/20">
                  <Image
                    src={
                      clan.serverLogo ||
                      "https://placehold.co/400/png?text=No+Logo"
                    }
                    alt={clan.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>{clan.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
