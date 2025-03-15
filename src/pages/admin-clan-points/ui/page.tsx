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
import { Input } from "@/src/shared/ui/components/shadcn/input";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { cn } from "@/src/shared/lib";
import { PaginatedDataTable } from "@/src/shared/ui/paginated-data-table";
import { PointsHistoryTableColumns } from "@/src/pages/admin-clan-points/ui/points-history-table-columns";
import { useUpdateClanPoints } from "@/src/features/clans/update-official-clan-points/update-official-clan-points.mutation";
import { PaginationState } from "@tanstack/react-table";

export default function AdminClanPointsPage() {
  const params = useParams<{ clanId: string }>();
  const [points, setPoints] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [pointAction, setPointAction] = useState<"add" | "subtract">("add");
  const updatePoints = useUpdateClanPoints();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const {
    data: clanData,
    isLoading: clanLoading,
    isError: clanError,
  } = useQuery(ClansQueries.getClanQuery(params?.clanId));

  const {
    data: pointsHistory,
    isLoading: historyLoading,
    isError: historyError,
    error: historyErrorDetails,
  } = useQuery(
    ClansQueries.getClanPointsHistoryQuery(
      params?.clanId,
      pagination.pageIndex,
      pagination.pageSize,
    ),
  );

  if (!params || !params.clanId) {
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
        <Skeleton className="h-96 bg-foreground/5" />
      </div>
    );
  }

  const handleSubmit = () => {
    updatePoints.mutate({
      clanId: params.clanId,
      body: {
        action: pointAction,
        reason: reason,
        points: points,
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Points Modification Panel */}
      <Card className="rounded-md border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">
            Clan Points Management
          </CardTitle>
          <CardDescription className="text-foreground/50">
            Modify the clan&#39;s point balance.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-foreground/80">
          <div className="flex items-center gap-4">
            <span className="w-24 text-nowrap">Points:</span>
            <div className="text-lg font-semibold">
              {clanData?.status == "OFFICIAL" ? clanData.points : 0}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="w-24 text-nowrap">Action:</span>
            <div className="flex gap-4">
              <Button
                className={cn("bg-neutral-800 text-xl hover:bg-neutral-700", {
                  "bg-green-800 hover:bg-green-900": pointAction == "add",
                })}
                onClick={() => setPointAction("add")}
              >
                +
              </Button>
              <Button
                className={cn("bg-neutral-800 text-xl hover:bg-neutral-700", {
                  "bg-red-800 hover:bg-red-900": pointAction == "subtract",
                })}
                onClick={() => setPointAction("subtract")}
              >
                -
              </Button>
            </div>
          </div>

          <div className="gap-4 space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-24 text-nowrap">Points:</span>
              <Input
                type="number"
                step={"0.01"}
                placeholder={"The number of points"}
                value={points || ""}
                onChange={(e) => setPoints(parseFloat(e.target.value) || 0)}
              />
            </div>

            <div className="flex items-start gap-4">
              <span className="w-24 text-nowrap pt-2">Reason:</span>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for this point modification"
                className="w-full"
              />
            </div>

            <div className="flex w-full flex-row-reverse">
              <Button
                className={`${pointAction === "add" ? "bg-green-700 hover:bg-green-600" : "bg-red-700 hover:bg-red-600"}`}
                onClick={handleSubmit}
                disabled={
                  points <= 0 || !reason.trim() || updatePoints.isPending
                }
              >
                {updatePoints.isPending
                  ? "Processing..."
                  : `${pointAction === "add" ? "+" : "-"} ${points} points`}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/*Points History Panel with PaginatedDataTable */}
      <Card className="rounded-md border-none bg-neutral-900">
        <CardHeader>
          <CardTitle className="text-foreground">Points History</CardTitle>
          <CardDescription className="text-foreground/50">
            Track all point modifications for this clan.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-foreground/80">
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
