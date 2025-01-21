"use client";

import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import { useState, FormEvent } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { BanQueries } from "@/src/entities/ban/ban.queries";
import { AddBanDto, addBanSchema } from "./add-ban.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shared/ui/components/shadcn/form";
import { Input } from "@/src/shared/ui/components/shadcn/input";
import { Label } from "@/src/shared/ui/components/shadcn/label";
import { useAddBanMutation } from "./add-ban.mutation";

export const AddBanForm = () => {
  const [discordId, setDiscordId] = useState("");
  const debouncedDiscordId = useDebounce(discordId, 500);

  const {
    data: banDetails,
    isError,
    isLoading,
  } = useQuery(BanQueries.getBannabilityQuery(debouncedDiscordId));

  const banUserMutation = useAddBanMutation();

  const form = useForm<AddBanDto>({
    resolver: zodResolver(addBanSchema),
    defaultValues: {
      discordId: "",
      reason: "",
    },
  });

  const handleSubmit = async (data: AddBanDto) => {
    banUserMutation.mutateAsync(data);
    form.reset();
  };

  const getUserDisplayValue = () => {
    if (!debouncedDiscordId) return "None";
    if (isLoading) return "Loading...";
    if (isError) return "User not found";
    if (banDetails)
      return `${banDetails.data.user.username}#${banDetails.data.user.discriminator}`;

    return "None";
  };

  const getStatusDisplayValue = () => {
    if (isLoading) return "Loading";
    if (banDetails && banDetails.data.isBanned) return "Already banned";
    if (banDetails && !banDetails.data.isBanned) return "Can be banned";

    return "None";
  };

  return (
    <div>
      <div className="flex h-fit w-full flex-col gap-10 sm:flex-row">
        <Form {...form}>
          <form
            id="add-ban-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-fit w-full flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="discordId"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="w-28 text-nowrap font-semibold text-foreground/80">
                      Discord ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="289921083761491971"
                        onChangeCapture={(e: FormEvent<HTMLInputElement>) =>
                          setDiscordId(e.currentTarget.value)
                        }
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-28" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="w-28 text-nowrap font-semibold text-foreground/80">
                      Reason
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Optional. Keep it short" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-28" />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Label className="w-28 text-nowrap font-semibold text-foreground/80">
              Discord User
            </Label>
            <Input
              placeholder="None"
              value={getUserDisplayValue()}
              readOnly
              className="pointer-events-none w-full cursor-not-allowed"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Label className="w-28 text-nowrap font-semibold text-foreground/80">
              Status
            </Label>
            <Input
              placeholder="None"
              value={getStatusDisplayValue()}
              className={cn("pointer-events-none w-full cursor-not-allowed", {
                "text-green-500": banDetails && !banDetails?.data.isBanned,
                "text-red-500": banDetails && banDetails?.data.isBanned,
              })}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <Button
          type="submit"
          form="add-ban-form"
          disabled={
            !debouncedDiscordId ||
            isLoading ||
            isError ||
            !banDetails ||
            banDetails.data.isBanned ||
            banUserMutation.isPending ||
            !form.formState.isValid
          }
          className="mt-5 w-24 bg-yellow-700 font-semibold hover:bg-yellow-800"
        >
          {banUserMutation.isPending ? "Banning..." : "Ban user"}
        </Button>
      </div>
    </div>
  );
};
