"use client";

import { Input } from "@/src/shared/ui/components/shadcn/input";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/src/shared/lib";
import Link from "next/link";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/src/shared/ui/components/shadcn/select";
import { SelectValue } from "@radix-ui/react-select";

export const AdminClanList = ({ className }: { className?: string }) => {
  const [clanName, setClanName] = useState("");
  const [queryType, setQueryType] = useState<"official" | "unofficial">(
    "official",
  );
  const debouncedClanName = useDebounce(clanName, 500);

  const officialQuery = useQuery({
    ...ClansQueries.getClansQuery(0, 10, debouncedClanName),
    enabled: queryType === "official",
  });

  const unofficialQuery = useQuery({
    ...ClansQueries.getUnofficialClansQuery(debouncedClanName),
    enabled: queryType === "unofficial",
  });

  // Get the active query based on queryType
  const activeQuery =
    queryType === "official" ? officialQuery : unofficialQuery;

  const renderClanList = () => {
    if (queryType === "official" && officialQuery.data) {
      return officialQuery.data.results.map((clan) => (
        <Link href={`/admin/clans/${clan.clanId}/info`} key={clan.clanId}>
          <div className="relative flex flex-row items-center gap-5 rounded-md p-2 text-white hover:bg-foreground/20">
            <Image
              src={
                clan.serverLogo || "https://placehold.co/400/png?text=No+Logo"
              }
              alt={clan.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>{clan.name}</div>
          </div>
        </Link>
      ));
    }

    if (queryType === "unofficial" && unofficialQuery.data) {
      return unofficialQuery.data.map((clan) => (
        <Link href={`/admin/unofficial-clans/${clan.id}/bans`} key={clan.id}>
          <div className="relative flex flex-row items-center gap-5 rounded-md p-2 text-white hover:bg-foreground/20">
            <Image
              src={clan.iconUrl || "https://placehold.co/400/png?text=No+Logo"}
              alt={clan.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>{clan.name}</div>
          </div>
        </Link>
      ));
    }

    return null;
  };

  return (
    <div className={cn("space-y-5", className)}>
      <div className="flex w-full flex-row gap-2">
        <Input
          type="text"
          placeholder="Search clan..."
          value={clanName}
          onChange={(e) => setClanName(e.target.value)}
        />

        <Select
          onValueChange={(value) =>
            setQueryType(value as "official" | "unofficial")
          }
          defaultValue="official"
        >
          <SelectTrigger className="flex-1 md:min-w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            <SelectItem value="official">OFFICIAL</SelectItem>
            <SelectItem value="unofficial">UNOFFICIAL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        {activeQuery.isLoading && (
          <div className="text-neutral-500">Loading...</div>
        )}
        {activeQuery.error && (
          <div className="text-red-500">
            Error: {(activeQuery.error as Error).message}
          </div>
        )}

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {renderClanList()}
        </div>
      </div>
    </div>
  );
};
