import { AVAIABLE_FACTIONS } from "@/src/features/clans/setup-official-clan/setup-official-clan.schema";
import { z } from "zod";
import { baseDiscordUserDtoSchema } from "../users/users.dtos";

export const officializeClanDtoSchema = z.object({
  serverId: z.string().nonempty(),
  groupId: z.number(),
  mainFaction: z.enum(AVAIABLE_FACTIONS),
});

export const clanDetailsDtoSchema = z.object({
  clanId: z.string().optional(),
  guildId: z.string(),
  name: z.string(),
  serverLogo: z.string().nullable(),
  serverBanner: z.string().nullable(),
  shortDescription: z.string().optional().nullable(),
  longDescription: z.string().optional().nullable(),
  mainFaction: z.string(),
  overseers: z.array(baseDiscordUserDtoSchema),
  inviteCode: z.string().optional(),
  status: z.string(),
  totalMembers: z.number(),
  onlineMembers: z.number(),
});

export const clanListDtoSchema = z.object({
  results: z.array(clanDetailsDtoSchema),
  totalPages: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
});
