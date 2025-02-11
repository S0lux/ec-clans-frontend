"use client";
import { ClansQueries } from "@/src/entities/clan/clan.queries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/components/shadcn/card";
import { Input } from "@/src/shared/ui/components/shadcn/input";
import { Textarea } from "@/src/shared/ui/components/shadcn/textarea";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";

export default function AdminClanInfoPage() {
  const params = useParams<{ clanId: string }>();
  const { data, isLoading, isError } = useQuery(
    ClansQueries.getClanQuery(params?.clanId),
  );

  if (!params || !params.clanId) {
    return null;
  }

  if (isError) {
    return <div>Error loading clan information.</div>;
  }

  if (isLoading) {
    return (
      <Skeleton className="h-96 w-full bg-foreground/5 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64" />
    );
  }

  return (
    <Card className="w-full rounded-md border-none bg-neutral-900 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64">
      <CardHeader>
        <CardTitle className="text-foreground">Information</CardTitle>
        <CardDescription className="text-foreground/50">
          View basic information about the clan.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-[auto,1fr] items-center gap-5 text-foreground/80">
        {/* Clan ID */}
        <span className="text-nowrap">Clan ID:</span>
        <Input value={params.clanId} disabled />

        {/* Guild ID */}
        <span className="text-nowrap">Guild ID:</span>
        <Input value={data?.guildId} disabled />

        {/* Roblox Group ID */}
        <span className="text-nowrap">Group ID:</span>
        <Input value={data?.groupId} disabled />

        {/* Short Description */}
        <span className="text-nowrap">Short Description:</span>
        <Textarea
          value={data?.shortDescription || "No description provided"}
          disabled
        />

        {/* Long Description */}
        <span className="text-nowrap">Long Description:</span>
        <Textarea
          value={data?.longDescription || "No description provided"}
          disabled
        />

        {/* Invite */}
        <span className="text-nowrap">Invite:</span>
        <div className="flex h-9 items-center">
          <Link
            href={`https://discord.gg/${data?.inviteCode}`}
            className="text-blue-500"
            target="_blank"
          >
            https://discord.gg/{data?.inviteCode}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
