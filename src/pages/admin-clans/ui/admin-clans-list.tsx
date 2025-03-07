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
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import ErrorDisplay from "@/src/shared/ui/error-display";

export const AdminClanList = ({ className }: { className?: string }) => {
  const [clanName, setClanName] = useState("");
  const [queryType, setQueryType] = useState<"official" | "unofficial">(
    "official",
  );
  const debouncedClanName = useDebounce(clanName, 500);

  const clanQuery = useQuery(
    ClansQueries.getClansQuery(0, 10, queryType, debouncedClanName),
  );

  const renderClanList = () => {
    if (clanQuery.isFetching)
      return <Skeleton className="col-span-full h-48 w-full bg-foreground/5" />;

    if (clanQuery.isError)
      return <ErrorDisplay error={clanQuery.error} className="col-span-full" />;

    if (clanQuery.data)
      return (
        <>
          {clanQuery.data?.results.map((clan) => (
            <Link
              href={`/admin/clans/${clan.serverId}/info`}
              key={clan.serverId}
            >
              <div className="relative flex flex-row items-center gap-5 rounded-md p-2 text-white hover:bg-foreground/20">
                <Image
                  src={clan.serverIcon}
                  alt={clan.serverName}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>{clan.serverName}</div>
              </div>
            </Link>
          ))}
        </>
      );
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
          <SelectTrigger
            className={cn("flex-1 md:min-w-64", {
              "text-orange-500": queryType == "official",
            })}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-background text-foreground">
            <SelectItem value="official">OFFICIAL</SelectItem>
            <SelectItem value="unofficial">UNOFFICIAL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {renderClanList()}
      </div>
    </div>
  );
};
