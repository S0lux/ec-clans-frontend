"use client";
import { useState } from "react";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/components/shadcn/card";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { PaginatedDataTable } from "@/src/shared/ui/paginated-data-table";
import { PointsHistoryTableColumns } from "@/src/pages/admin-clan-points/ui/points-history-table-columns";
import { PaginationState } from "@tanstack/react-table";
import { cn } from "@/src/shared/lib";

export default function ManageClanPointsPage() {
  const params = useParams<{ serverId: string }>();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: clanData,
    isLoading: clanLoading,
    isError: clanError,
  } = useQuery(ClansQueries.getClanQuery(params?.serverId));

  const {
    data: pointsHistory,
    isLoading: historyLoading,
    isError: historyError,
    error: historyErrorDetails,
  } = useQuery(
    ClansQueries.getClanPointsHistoryQuery(
      params?.serverId,
      pagination.pageIndex,
      pagination.pageSize,
    ),
  );

  if (!params || !params.serverId) {
    return null;
  }

  if (clanError || historyError) {
    console.error(historyErrorDetails);
    return <div>Error loading clan information.</div>;
  }

  if (clanLoading || historyLoading) {
    return (
      <div className="w-full space-y-6">
        <Skeleton className="h-64 bg-foreground/5" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <Card className="rounded-md border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">Points History</CardTitle>
          <CardDescription className="text-foreground/50">
            Track all point modifications for this clan.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-foreground/80">
          <div className={"mb-5 flex w-full flex-row-reverse"}>
            <div>
              Current points:
              <span
                className={cn("ml-2 font-bold text-red-500", {
                  "text-green-500":
                    clanData?.status == "OFFICIAL" && clanData.points > 0,
                })}
              >
                {clanData?.status == "OFFICIAL" ? clanData.points : 0}
              </span>
            </div>
          </div>
          <PaginatedDataTable
            columns={PointsHistoryTableColumns}
            data={pointsHistory?.results || []}
            pagination={pagination}
            setPaginationAction={setPagination}
            pageCount={pointsHistory?.totalPages || 0}
          />
        </CardContent>
      </Card>
    </div>
  );
}
