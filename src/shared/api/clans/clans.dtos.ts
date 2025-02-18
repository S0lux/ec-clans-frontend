import { AVAIABLE_FACTIONS } from "@/src/features/clans/setup-official-clan/setup-official-clan.schema";
import { z } from "zod";
import { baseDiscordUserDtoSchema } from "../users/users.dtos";
import { clanGuildDtoSchema } from "../guilds/guilds.dtos";

export const officializeClanDtoSchema = z.object({
  serverId: z.string().nonempty(),
  groupId: z.number(),
  mainFaction: z.enum(AVAIABLE_FACTIONS),
});

const unofficialClanDtoSchema = z.object({
  status: z.literal("UNOFFICIAL"),
});

const officialClanDtoSchema = z.object({
  status: z.literal("OFFICIAL"),
  mainFaction: z.union([
    z.literal("redcliff"),
    z.literal("korblox"),
    z.literal("overseer"),
    z.literal("empyrean"),
  ]),
  groupId: z.string(),
  longDescription: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  overseers: z.array(baseDiscordUserDtoSchema),
});

export const clanDtoSchema = clanGuildDtoSchema.and(
  z.union([officialClanDtoSchema, unofficialClanDtoSchema]),
);

export const clansListDtoSchema = z.object({
  totalPages: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  results: clanDtoSchema.array(),
});
