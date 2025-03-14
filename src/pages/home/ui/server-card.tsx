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
  points?: number;
  rank?: number;
}) => {
  const isTopThree = props.rank !== undefined && props.rank <= 3;

  const getRankStyles = () => {
    if (props.rank === 1) {
      return {
        badgeColor: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",
        borderColor: "outline-2 outline-yellow-300/50",
        glow: "shadow-[0_0_15px_rgba(234,179,8,0.7),0_0_30px_rgba(234,179,8,0.4)]",
        animation: "",
        textColor: "text-yellow-100",
        shape: "clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
      };
    } else if (props.rank === 2) {
      return {
        badgeColor: "bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400",
        borderColor: "outline-2 outline-gray-200/50",
        glow: "shadow-[0_0_12px_rgba(209,213,219,0.6),0_0_25px_rgba(209,213,219,0.3)]",
        animation: "",
        textColor: "text-gray-900",
        shape: "clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
      };
    } else if (props.rank === 3) {
      return {
        badgeColor: "bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700",
        borderColor: "outline-2 outline-amber-400/50",
        glow: "shadow-[0_0_10px_rgba(217,119,6,0.6),0_0_20px_rgba(217,119,6,0.3)]",
        animation: "",
        textColor: "text-amber-100",
        shape: "clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
      };
    }
    return {
      badgeColor: "bg-gray-700",
      borderColor: "outline outline-background",
      glow: "",
      animation: "",
      textColor: "text-gray-300",
      shape: "rounded-full"
    };
  };

  const styles = getRankStyles();

  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-lg bg-background shadow-lg transition-all duration-300",
        {
          [styles.glow]: isTopThree,
          "hover:scale-105 hover:shadow-2xl": isTopThree,
          [styles.animation]: isTopThree,
        }
      )}
    >
      {/* Rank Badge */}
      {props.rank !== undefined && (
        <div
          className={cn(
            "absolute rounded-full -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center text-sm font-extrabold transition-transform hover:scale-125 hover:rotate-12",
            styles.badgeColor,
            styles.borderColor,
            styles.shape,
            styles.textColor,
            "outline outline-offset-2"
          )}
        >
          <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] text-md">
            #{props.rank}
          </span>
        </div>
      )}

      <div className="relative h-32 overflow-hidden">
        {props.serverBanner ? (
          <Image
            className={cn(
              "h-24 w-full rounded-t-lg object-cover transition-transform duration-500",
              { "hover:scale-110 brightness-110": isTopThree }
            )}
            src={props.serverBanner + "?size=4096"}
            alt="Server Banner"
            fill={true}
            quality={100}
          />
        ) : (
          <Image
            className="h-24 w-full rounded-t-lg object-cover"
            src={"https://placehold.co/600x400/png"}
            alt="Server Banner"
            fill={true}
          />
        )}
      </div>

      <div
        className={cn(
          "absolute left-7 top-24 rounded-full transition-all z-50",
          {
            "ring-4 ring-opacity-70": isTopThree,
            "ring-yellow-400": props.rank === 1,
            "ring-gray-300": props.rank === 2,
            "ring-amber-500": props.rank === 3,
          }
        )}
      >
        <Image
          className={cn(
            "scale-125 rounded-full outline outline-4 outline-background z-50",
            { "hover:scale-130": isTopThree }
          )}
          src={props.serverLogo}
          alt="Server Logo"
          width={64}
          height={64}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-12">
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="text-xl font-semibold">{props.serverName}</h3>
            {props.points !== undefined && (
              <span className="ml-2 text-sm text-foreground/70">
                {props.points} pts
              </span>
            )}
          </div>

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
              className={cn(
                "font-bold",
                "bg-yellow-700 hover:bg-yellow-800",
                { "hover:scale-105 transition-transform": isTopThree }
              )}
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