"use client";

import { BanDto } from "@/src/shared/api/bans/bans.types";
import { formatDateWithRelativeTime } from "@/src/shared/utils/formatDateWithRelativeTime";
import { Avatar, AvatarImage } from "@/src/shared/ui/components/shadcn/avatar";
import { ColumnDef } from "@tanstack/react-table";

export const BansTableColumns: ColumnDef<BanDto>[] = [
  {
    header: "Banned User",
    accessorKey: "bannedUser.username",
    cell(props) {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9">
            <AvatarImage src={props.row.original.bannedUser.avatarUrl} />
          </Avatar>
          <div className="truncate">
            <span className="font-semibold">
              {props.row.original.bannedUser.username}#
              {props.row.original.bannedUser.discriminator}
            </span>
            <br />
            <span className="text-neutral-700">
              ({props.row.original.bannedUser.id})
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Banned by",
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
            <span className="text-neutral-600">
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
      return (
        <div className="truncate">
          {props.row.original.reason || (
            <span className="italic text-neutral-700">Unspecified</span>
          )}
        </div>
      );
    },
  },
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
];
