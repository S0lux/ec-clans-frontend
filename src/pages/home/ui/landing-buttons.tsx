"use client";

import { UserQueries } from "@/src/entities/user/user.queries";
import { authClient } from "@/src/shared/lib/better-auth";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { useQuery } from "@tanstack/react-query";

const handleLogin = async () => {
  await authClient.signIn.social({
    provider: "discord",
  });
};

export const LandingButtons = () => {
  const {
    data: loggedInUser,
    isLoading,
    isError,
  } = useQuery(UserQueries.currentUserQuery());
  return (
    <div className="flex flex-row gap-2">
      {isLoading && (
        <>
          <Skeleton className="h-12 w-44 bg-foreground/10"></Skeleton>
          <Skeleton className="h-12 w-36 bg-foreground/10"></Skeleton>
        </>
      )}

      {isError && (
        <>
          <Button
            className="text-md h-12 bg-yellow-700 font-bold hover:bg-yellow-800"
            onClick={handleLogin}
          >
            <p>Login with Discord</p>
          </Button>
          <a href={process.env.NEXT_PUBLIC_BOT_INVITE_URL}>
            <Button
              variant="outline"
              className="text-md h-12 font-bold hover:bg-foreground/20 hover:text-foreground hover:opacity-100"
            >
              Add to server
            </Button>
          </a>
        </>
      )}

      {loggedInUser && (
        <>
          <a href="/manage">
            <Button className="text-md h-12 bg-yellow-700 font-bold hover:bg-yellow-800">
              <p>Manage servers</p>
            </Button>
          </a>
          <a href={process.env.NEXT_PUBLIC_BOT_INVITE_URL!}>
            <Button
              variant="outline"
              className="text-md h-12 font-bold hover:bg-foreground/20 hover:text-foreground hover:opacity-100"
            >
              Add to server
            </Button>
          </a>
        </>
      )}
    </div>
  );
};
