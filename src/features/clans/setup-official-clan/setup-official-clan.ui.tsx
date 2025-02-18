import { cn } from "@/src/shared/lib";
import { Button } from "@/src/shared/ui/components/shadcn/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/src/shared/ui/components/shadcn/form";
import { Label } from "@/src/shared/ui/components/shadcn/label";
import { Input } from "@/src/shared/ui/components/shadcn/input";
import { FormEvent, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AVAIABLE_FACTIONS,
  SetupOfficialClan,
  SetupOfficialClanSchema,
} from "./setup-official-clan.schema";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  Select,
  SelectItem,
} from "@/src/shared/ui/components/shadcn/select";
import { useQuery } from "@tanstack/react-query";
import { GuildQueries } from "@/src/entities/guild/guild.queries";
import { RobloxQueries } from "@/src/entities/roblox/roblox.queries";
import { ToastContainer } from "react-toastify";
import { useSetupOfficialClanMutation } from "./setup-official-clan.mutation";

export const SetupOfficialClanForm = () => {
  const [serverId, setServerId] = useState("");
  const [groupId, setGroupId] = useState("");
  const debouncedServerId = useDebounce(serverId, 500);
  const debouncedGroupId = useDebounce(groupId, 500);

  // Discord Guild query
  const {
    data: guildInfo,
    isLoading: isFetchingGuild,
    isError: isGuildError,
  } = useQuery(GuildQueries.getGuildQuery(debouncedServerId));

  // Roblox Group query
  const {
    data: groupInfo,
    isLoading: isFetchingGroup,
    isError: isGroupError,
  } = useQuery(RobloxQueries.groupInfoQuery(debouncedGroupId));

  // Officialize clan mutation
  const officializeClan = useSetupOfficialClanMutation();

  const form = useForm<SetupOfficialClan>({
    resolver: zodResolver(SetupOfficialClanSchema),
    defaultValues: {
      serverId: "",
      groupId: "",
      mainFaction: "redcliff",
    },
  });

  const getGuildStatusDisplayText = () => {
    if (!isFetchingGuild && !isGuildError && guildInfo)
      return guildInfo.serverName;
    if (!isFetchingGuild && isGuildError) return "Bot not in server";
    return "";
  };

  const getGroupStatusDisplayText = () => {
    if (!isFetchingGroup && !isGroupError && groupInfo)
      return groupInfo.displayName;
    if (!isFetchingGroup && isGroupError) return "Group does not exist";
    return "";
  };

  const handleSubmit = async (data: SetupOfficialClan) => {
    officializeClan.mutate(data);
  };

  return (
    <>
      <div className="flex h-fit w-full flex-col gap-10 sm:flex-row">
        <Form {...form}>
          <form
            id="setup-official-clan-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex h-fit w-full flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="serverId"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="w-48 text-nowrap font-semibold text-foreground/80">
                      Discord Server ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="289921083761491971"
                        onChangeCapture={(e: FormEvent<HTMLInputElement>) =>
                          setServerId(e.currentTarget.value)
                        }
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-36" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="w-48 text-nowrap font-semibold text-foreground/80">
                      Roblox Group ID
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="13025287"
                        onChangeCapture={(e: FormEvent<HTMLInputElement>) =>
                          setGroupId(e.currentTarget.value)
                        }
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="ml-36" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mainFaction"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <FormLabel className="w-48 text-nowrap font-semibold text-foreground/80">
                      Main Faction
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn({
                            "text-red-500": field.value === "redcliff",
                            "text-blue-500": field.value === "korblox",
                            "text-green-500": field.value === "overseer",
                            "text-pink-500": field.value === "empyrean",
                          })}
                        >
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background text-foreground">
                        {AVAIABLE_FACTIONS.map((faction) => (
                          <SelectItem key={faction} value={faction}>
                            {faction.toLocaleUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className="ml-36" />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Label className="w-44 text-nowrap font-semibold text-foreground/80">
              Discord Server
            </Label>
            <Input
              placeholder={
                isFetchingGuild ? "Loading..." : "Waiting for input..."
              }
              readOnly
              value={getGuildStatusDisplayText()}
              className="pointer-events-none w-full cursor-not-allowed"
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Label className="w-44 text-nowrap font-semibold text-foreground/80">
              Roblox Group
            </Label>
            <Input
              placeholder={
                isFetchingGroup ? "Loading..." : "Waiting for input..."
              }
              value={getGroupStatusDisplayText()}
              className={cn(
                "pointer-events-none w-full cursor-not-allowed",
                {},
              )}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row-reverse">
        <Button
          type="submit"
          disabled={
            isFetchingGuild ||
            isFetchingGroup ||
            isGuildError ||
            isGroupError ||
            officializeClan.isPending ||
            !form.formState.isValid ||
            !guildInfo ||
            !groupInfo
          }
          form="setup-official-clan-form"
          className="mt-5 w-24 bg-yellow-700 font-semibold hover:bg-yellow-800"
        >
          Officialize
        </Button>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </>
  );
};
