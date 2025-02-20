"use client";

import { ClansQueries } from "@/src/entities/clan/clan.queries";
import { useUpdateClanDescriptions } from "@/src/features/clans/update-official-clan-descriptions/update-official-clan-descriptions.mutation";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/ui/components/shadcn/card";
import { Input } from "@/src/shared/ui/components/shadcn/input";
import { Skeleton } from "@/src/shared/ui/components/shadcn/skeleton";
import { Textarea } from "@/src/shared/ui/components/shadcn/textarea";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ManageClanInfoPage() {
  const params = useParams<{ serverId: string }>();
  if (!params || !params.serverId) {
    throw new Error("Invalid path params");
  }

  const query = useQuery(ClansQueries.getClanQuery(params.serverId));

  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");

  useEffect(() => {
    if (!query.data) return;

    setShortDescription(
      query.data.status == "OFFICIAL"
        ? query.data.shortDescription || ""
        : "UNOFFICIAL",
    );

    setLongDescription(
      query.data.status == "OFFICIAL"
        ? query.data.longDescription || ""
        : "UNOFFICIAL",
    );
  }, [query.data]);

  const updateDescriptionsMutation = useUpdateClanDescriptions();
  const handleUpdateDescriptions = async () => {
    updateDescriptionsMutation.mutate({
      clanId: params.serverId,
      body: {
        shortDescription: shortDescription,
        longDescription: longDescription,
      },
    });
  };

  if (query.isLoading) {
    return (
      <Skeleton className="h-64 w-full bg-foreground/5 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64" />
    );
  }

  if (query.isError) {
    return <></>;
  }

  if (query.data) {
    const oldShortDescription =
      query.data.status == "OFFICIAL"
        ? query.data.shortDescription || ""
        : "UNOFFICIAL";
    const oldLongDescription =
      query.data.status == "OFFICIAL"
        ? query.data.longDescription || ""
        : "UNOFFICIAL";

    return (
      <Card className="w-full rounded-md border-none bg-neutral-900 md:mr-12 lg:mr-24 xl:mr-36 2xl:mr-64">
        <CardHeader>
          <CardTitle className="text-foreground">Information</CardTitle>
          <CardDescription className="text-foreground/50">
            View basic information about the clan.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-[auto,1fr] items-center gap-5 text-foreground/80">
          {/* Guild ID */}
          <span className="text-nowrap">Server ID:</span>
          <Input value={query.data.serverId} disabled />

          {/* Roblox Group ID */}
          <span className="text-nowrap">Group ID:</span>
          <Input
            value={
              query.data.status == "OFFICIAL"
                ? query.data.groupId
                : "UNOFFICIAL"
            }
            disabled
          />

          {/* Short Description */}
          <span className="text-nowrap">Short Description:</span>
          <Textarea
            maxLength={64}
            defaultValue={oldShortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="No description provided"
            disabled={query.data.status == "UNOFFICIAL"}
          />

          {/* Long Description */}
          <span className="text-nowrap">Long Description:</span>
          <Textarea
            maxLength={2560}
            defaultValue={oldLongDescription}
            onChange={(e) => setLongDescription(e.target.value)}
            placeholder="No description provided"
            disabled={query.data.status == "UNOFFICIAL"}
          />

          {/* Invite */}
          <span className="text-nowrap">Invite:</span>
          <div className="flex h-9 items-center">
            {query.data.status == "OFFICIAL" ? (
              <Link
                href={`https://discord.gg/${query.data.serverInvite}`}
                className="text-blue-500"
                target="_blank"
              >
                https://discord.gg/{query.data.serverInvite}
              </Link>
            ) : (
              "UNOFFICIAL"
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-row-reverse">
          <Button
            className="bg-yellow-700 font-bold"
            onClick={() => handleUpdateDescriptions()}
            disabled={
              updateDescriptionsMutation.isPending ||
              (oldShortDescription == shortDescription &&
                oldLongDescription == longDescription)
            }
          >
            Save
          </Button>
        </CardFooter>
        <ToastContainer theme="dark" position="bottom-right" />
      </Card>
    );
  }
}
