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
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/src/shared/ui/components/shadcn/button";

export const AdminClanList = ({ className }: { className?: string }) => {
  const [clanName, setClanName] = useState("");
  const [queryType, setQueryType] = useState<"official" | "unofficial">(
    "official",
  );
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const debouncedClanName = useDebounce(clanName, 500);

  const clanQuery = useQuery(
    ClansQueries.getClansQuery(
      currentPage,
      pageSize,
      queryType,
      debouncedClanName,
    ),
  );

  const totalPages = clanQuery.data?.totalPages || 1;

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

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
                  src={clan.serverIcon || "/placeholder.svg"}
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

  const renderPagination = () => {
    if (!clanQuery.data || clanQuery.isLoading || clanQuery.isError)
      return null;

    return (
      <div className="mt-6 flex items-center justify-center gap-2">
        <Button
          size="icon"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            // Show pages around current page if there are many pages
            let pageToShow = i;
            if (totalPages > 5) {
              const startPage = Math.max(
                0,
                Math.min(currentPage - 2, totalPages - 5),
              );
              pageToShow = startPage + i;
            }

            return (
              <Button
                key={pageToShow}
                variant={currentPage === pageToShow ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageToShow)}
                className="h-8 w-8 p-0"
              >
                {pageToShow + 1}
              </Button>
            );
          })}
        </div>

        <Button
          size="icon"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
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

      {renderPagination()}

      {clanQuery.data && (
        <div className="text-center text-sm text-muted-foreground">
          Showing page {currentPage + 1} of {totalPages}
        </div>
      )}
    </div>
  );
};
