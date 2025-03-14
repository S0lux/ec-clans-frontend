"use client";

import { formatDateWithRelativeTime } from "@/src/shared/utils/formatDateWithRelativeTime";
import { Avatar, AvatarImage } from "@/src/shared/ui/components/shadcn/avatar";
import { ColumnDef } from "@tanstack/react-table";
import { ClanPointsHistoryDto } from "@/src/shared/api/clans/clans.types";
import { cn } from "@/src/shared/lib";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/shared/ui/components/shadcn/tooltip";
import { Eye } from "lucide-react";

export const PointsHistoryTableColumns: ColumnDef<ClanPointsHistoryDto>[] = [
  {
    header: "Issue Date",
    accessorKey: "issueDate",
    cell(props) {
      return (
        <div>
          {formatDateWithRelativeTime(
            props.row.original.issueDate.toISOString(),
          )}
        </div>
      );
    },
  },
  {
    header: "Staff",
    accessorKey: "staffUser.username",
    cell(props) {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9">
            <AvatarImage src={props.row.original.staffUser.avatarUrl} />
          </Avatar>
          <div className="truncate">
            <span className="font-semibold">
              {props.row.original.staffUser.username}#
              {props.row.original.staffUser.discriminator}
            </span>
            <br />
            <span className="text-neutral-700">
              ({props.row.original.staffUser.id})
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Reason",
    accessorKey: "reason",
    cell(props) {
      const reason = props.row.original.reason || (
        <span className="italic text-neutral-700">Unspecified</span>
      );
      const isTruncated = typeof reason === "string" && reason.length > 50;

      return (
        <div className="flex max-w-80 items-center gap-2">
          <div className="scroll-auto truncate">{reason}</div>
          {isTruncated && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-neutral-500 hover:text-neutral-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs whitespace-normal break-words border border-neutral-500">
                  <p>{props.row.original.reason}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    header: "Points",
    accessorKey: "points",
    cell(props) {
      return (
        <div
          className={cn({
            "text-green-500": props.row.original.points > 0,
            "text-red-500": props.row.original.points < 0,
          })}
        >
          {props.row.original.points > 0
            ? "+" + props.row.original.points
            : props.row.original.points}
        </div>
      );
    },
  },
];
