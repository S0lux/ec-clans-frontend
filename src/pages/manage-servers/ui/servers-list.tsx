"use client";

import { UserQueries } from "@/src/entities/user/user.queries";
import { cn } from "@/src/shared/lib";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import ErrorDisplay from "@/src/shared/ui/error-display";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function ServerList({ className }: { className?: string }) {
  const { data, isLoading, error } = useQuery(
    UserQueries.currentUserGuildsQuery(),
  );

  if (isLoading)
    return (
      <div className={cn("flex flex-row gap-5", className)}>
        <Skeleton className="h-48 w-full bg-foreground/5" />
      </div>
    );

  if (error)
    return (
      <div className={cn("flex flex-row gap-5", className)}>
        <ErrorDisplay error={error} />
      </div>
    );

  if (data)
    return (
      <div className={cn("flex flex-row gap-5", className)}>
        {data.map((guild) => {
          return (
            <Link
              key={guild.id}
              className="group relative flex w-32 cursor-pointer"
              prefetch={false}
              href={`/manage/${guild.id}`}
            >
              <Image
                src={guild.icon}
                alt={`${guild.name} logo`}
                width={128}
                height={128}
                className="rounded-md bg-neutral-800"
              />

              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <p className="px-2 text-center font-semibold text-white">
                  {guild.name}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    );
}
