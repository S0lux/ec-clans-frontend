"use client";

import { cn } from "@/src/shared/lib";
import { ResponsiveContainer } from "@/src/shared/ui";
import { Swords } from "lucide-react";
import { TitleWithIcon } from "./title-with-icon";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/components/shadcn/dropdown-menu";
import { Avatar, AvatarImage } from "@/src/shared/ui/components/shadcn/avatar";
import { useQuery } from "@tanstack/react-query";
import { UserQueries } from "@/src/entities/user/user.queries";
import { authClient } from "@/src/shared/lib/better-auth";

const handleLogin = async () => {
  await authClient.signIn.social({
    provider: "discord",
  });
};

const handleSignOut = async () => {
  await authClient.signOut();
  location.reload();
};

export const Header = ({ className }: { className?: string }) => {
  const {
    isLoading,
    data: loggedInUser,
    isError,
  } = useQuery(UserQueries.currentUserQuery());

  return (
    <ResponsiveContainer
      className={cn(
        "z-10 flex h-16 flex-row items-center gap-2 border-b border-b-foreground/25 bg-background/80 py-3 backdrop-blur-md",
        className,
      )}
    >
      <TitleWithIcon
        title="Clans"
        icon={<Swords color="orange" fill="orange" size={28} />}
        className="flex-1"
      />

      {isLoading && (
        <>
          <Skeleton className="hidden h-9 w-28 bg-foreground/10 sm:block"></Skeleton>
          <Skeleton className="h-9 w-16 bg-foreground/10 sm:w-44"></Skeleton>
        </>
      )}

      {(!loggedInUser || isError) && !isLoading && (
        <>
          <Button
            variant="outline"
            className="hidden h-9 font-bold opacity-50 transition-opacity hover:bg-transparent hover:text-foreground hover:opacity-100 sm:block"
          >
            Add to server
          </Button>

          <Button
            className="h-9 bg-yellow-700 font-bold hover:bg-yellow-800"
            onClick={handleLogin}
          >
            <p className="hidden sm:block">Login with Discord</p>
            <p className="block sm:hidden">Login</p>
          </Button>
        </>
      )}

      {loggedInUser && (
        <>
          <Button
            variant="outline"
            className="mr-2 hidden h-9 font-bold opacity-50 transition-opacity hover:bg-transparent hover:text-foreground hover:opacity-100 sm:block"
          >
            Manage servers
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-9">
                <AvatarImage src={loggedInUser.avatarUrl} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-foreground/50 bg-background text-foreground">
              <DropdownMenuLabel>{loggedInUser.username}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-foreground/50" />
              {loggedInUser.isStaff && (
                <DropdownMenuItem className="cursor-pointer text-foreground/50">
                  Admin
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer text-foreground/50"
              >
                Signout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </ResponsiveContainer>
  );
};
