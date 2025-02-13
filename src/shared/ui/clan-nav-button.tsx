import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "./components/shadcn/tooltip";

type NavButtonProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  isAvailable?: boolean;
  unavailableMessage?: string;
};

export const ClanNavButton = ({
  href,
  icon: Icon,
  label,
  isActive = false,
  isAvailable = true,
  unavailableMessage = "This feature is not available",
}: NavButtonProps) => {
  return (
    <>
      {isAvailable && (
        <div
          className={`flex w-full flex-row items-center ${
            isActive
              ? "bg-foreground/10"
              : "text-neutral-500 hover:bg-foreground/5"
          }`}
        >
          <Link
            href={href}
            className={`flex w-full items-center border-l-2 py-2 pl-4 ${
              isActive ? "border-l-yellow-600" : "border-l-neutral-900"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="ml-2 h-full w-full">{label}</span>
          </Link>
        </div>
      )}

      {!isAvailable && (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger className="w-full cursor-not-allowed text-left">
              <div
                className={`flex w-full flex-row items-center ${
                  isActive
                    ? "bg-foreground/10"
                    : "text-neutral-500 hover:bg-foreground/5"
                }`}
              >
                <Link
                  href={href}
                  className={`pointer-events-none flex w-full items-center border-l-2 py-2 pl-4 ${
                    isActive ? "border-l-yellow-600" : "border-l-neutral-900"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="ml-2 h-full w-full">{label}</span>
                </Link>
              </div>
            </TooltipTrigger>
            <TooltipContent>{unavailableMessage}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};

export default ClanNavButton;
