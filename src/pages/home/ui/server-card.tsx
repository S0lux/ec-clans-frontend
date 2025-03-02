import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { Circle, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ServerCard = (props: {
  serverName: string;
  serverLogo: string;
  serverBanner?: string | null;
  serverInvite?: string | null;
  memberTotal: number;
  memberOnline: number;
  shortDescription?: string | null;
}) => {
  return (
    <div className="flex h-full flex-col rounded-lg bg-background shadow-lg">
      <div className="relative h-32">
        {props.serverBanner && (
          <Image
            className="h-24 w-full rounded-t-lg object-cover"
            src={props.serverBanner}
            alt="Server Banner"
            fill={true}
          />
        )}
        {!props.serverBanner && (
          <Image
            className="h-24 w-full rounded-t-lg object-cover"
            src={"https://placehold.co/600x400/png"}
            alt="Server Banner"
            fill={true}
          />
        )}
        <Image
          className="absolute left-7 top-24 scale-125 rounded-full outline outline-4 outline-background"
          src={props.serverLogo}
          alt="Server Logo"
          width={64}
          height={64}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-12">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{props.serverName}</h3>
          <div className="flex flex-row gap-4">
            <div className="flex items-center">
              <Users size={16} className="text-foreground/50" />
              <p className="ml-1 text-sm text-foreground/50">
                {props.memberTotal}
              </p>
            </div>

            <div className="flex items-center">
              <Circle size={16} color="#4ade80" fill="#4ade80" />
              <p className="ml-1 text-sm text-foreground/50">
                {props.memberOnline}
              </p>
            </div>
          </div>
          <p className="pt-2 text-sm text-foreground/50">
            {props.shortDescription || "No description"}
          </p>
        </div>
        <div className="flex justify-end pt-4">
          <Link
            prefetch={false}
            href={`https://discord.gg/${props.serverInvite}`}
            className={cn({ "pointer-events-none": !props.serverInvite })}
            target="_blank"
          >
            <Button
              className="bg-yellow-700 font-bold hover:bg-yellow-800"
              disabled={!props.serverInvite}
            >
              Join
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
