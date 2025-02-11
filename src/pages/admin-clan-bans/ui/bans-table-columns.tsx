import { ServerBanDto } from "@/src/shared/api/bans/bans.types";
import { cn } from "@/src/shared/lib";
import { Avatar, AvatarImage } from "@/src/shared/ui/components/shadcn/avatar";
import { ColumnDef } from "@tanstack/react-table";

export const BansTableColumns: ColumnDef<ServerBanDto>[] = [
  {
    header: "Discord ID",
    accessorKey: "user.id",
  },
  {
    header: "Username",
    accessorKey: "user.username",
    cell(props) {
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9">
            <AvatarImage src={props.row.original.user.avatarUrl} />
          </Avatar>
          <div className="truncate">
            <span className="font-semibold">
              {props.row.original.user.username}#
              {props.row.original.user.discriminator}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "isServerBanned",
    cell(props) {
      return (
        <div
          className={cn("truncate", {
            "text-red-500": !props.row.original.isServerBanned,
            "text-green-500": props.row.original.isServerBanned,
          })}
        >
          {props.row.original.isServerBanned ? "Banned" : "Not Banned"}
        </div>
      );
    },
  },
];
