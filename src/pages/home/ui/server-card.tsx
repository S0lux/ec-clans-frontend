import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { Circle, ExternalLink, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LevelDisplay } from "@/src/shared/ui/level-display";

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
  console.log("Rendering Server Card");
  const isTopThree = props.rank !== undefined && props.rank <= 3;

  const getRankStyles = () => {
    if (props.rank === 1) {
      return {
        badgeColor:
          "bg-gradient-to-br from-amber-300 via-yellow-400 to-yellow-500",
        borderColor: "ring-yellow-300/50",
        glow: "shadow-lg shadow-yellow-400/20",
        textColor: "text-yellow-900 font-black",
        ribbonColor: "from-yellow-400 to-yellow-500",
      };
    } else if (props.rank === 2) {
      return {
        badgeColor: "bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300",
        borderColor: "ring-gray-200/50",
        glow: "shadow-lg shadow-gray-400/20",
        textColor: "text-gray-800 font-black",
        ribbonColor: "from-gray-300 to-gray-400",
      };
    } else if (props.rank === 3) {
      return {
        badgeColor:
          "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
        borderColor: "ring-amber-400/50",
        glow: "shadow-lg shadow-amber-500/20",
        textColor: "text-amber-900 font-black",
        ribbonColor: "from-amber-500 to-amber-600",
      };
    }
    return {
      badgeColor: "bg-gray-700",
      borderColor: "ring-background",
      glow: "",
      textColor: "text-gray-300",
      ribbonColor: "from-gray-700 to-gray-800",
    };
  };

  const styles = getRankStyles();

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl bg-background/90 backdrop-blur-sm transition-all duration-300",
        {
          [styles.glow]: isTopThree,
          "hover:translate-y-[-4px]": true,
          "border border-muted-foreground/10": true,
        },
      )}
    >
      {/* Rank Badge/Ribbon for top 3 */}
      {isTopThree && (
        <div
          className={cn(
            "absolute -right-[2rem] top-[1.5rem] z-10 w-36 rotate-45 bg-gradient-to-r py-1 text-center shadow-lg",
            styles.ribbonColor,
            "transition-all duration-300 group-hover:shadow-lg",
          )}
        >
          <span className={cn("text-md font-bold", styles.textColor)}>
            #{props.rank}
          </span>
        </div>
      )}

      {/* Regular rank badge for others */}
      {props.rank !== undefined && !isTopThree && (
        <div
          className={cn(
            "text-md absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
            styles.badgeColor,
            "ring-2 ring-offset-2",
            styles.borderColor,
            styles.textColor,
          )}
        >
          #{props.rank}
        </div>
      )}

      <div className="relative h-36 overflow-hidden">
        {props.serverBanner ? (
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
            src={props.serverBanner + "?size=4096"}
            alt={`${props.serverName} banner`}
            fill={true}
            quality={90}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-yellow-700 to-yellow-800"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      <div className="absolute left-6 top-20 z-20 transition-all duration-300 group-hover:scale-105">
        <div
          className={cn("rounded-full", {
            "ring-2 ring-offset-2 ring-offset-background": isTopThree,
            "ring-yellow-400/30": props.rank === 1,
            "ring-gray-300/30": props.rank === 2,
            "ring-amber-500/30": props.rank === 3,
          })}
        >
          <Image
            className="rounded-full"
            src={props.serverLogo}
            alt={`${props.serverName} logo`}
            width={72}
            height={72}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-6">
        <div className="mb-3 flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-start justify-between gap-2">
              <h3 className="line-clamp-2 max-w-[70%] text-lg font-bold tracking-tight">
                {props.serverName}
              </h3>
            </div>
          </div>

          <div className="mt-2 flex flex-row gap-4">
            <div className="flex items-center">
              <Users size={14} className="text-muted-foreground" />
              <p className="ml-1 text-xs font-medium text-muted-foreground">
                {props.memberTotal.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center">
              <Circle size={14} className="fill-green-500 text-green-500" />
              <p className="ml-1 text-xs font-medium text-muted-foreground">
                {props.memberOnline.toLocaleString()}
              </p>
            </div>
            {props.points !== undefined && (
              <LevelDisplay
                points={props.points}
                mode="compact"
                className="flex-shrink-0"
              />
            )}
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {props.shortDescription || "No description available"}
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Link
            prefetch={false}
            href={`https://discord.gg/${props.serverInvite}`}
            className={cn({ "pointer-events-none": !props.serverInvite })}
            target="_blank"
          >
            <Button
              variant="default"
              className={cn(
                "group relative flex items-center gap-1.5 overflow-hidden bg-yellow-700 font-bold hover:bg-yellow-800",
              )}
              disabled={!props.serverInvite}
            >
              <span>Join</span>
              <ExternalLink size={14} className="opacity-70" />
              <span className="group-hover:animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
