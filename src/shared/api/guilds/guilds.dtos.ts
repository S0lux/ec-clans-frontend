import { z } from "zod";
import { baseDiscordUserDtoSchema } from "../users/users.dtos";

export const clanGuildDtoSchema = z.object({
  serverId: z.string(),
  serverName: z.string(),
  serverIcon: z.string(),
  serverBanner: z.string().optional().nullable(),
  serverInvite: z.string().optional().nullable(),
  serverTotalMembers: z.number(),
  serverOnlineMembers: z.number(),
  serverOwner: baseDiscordUserDtoSchema,
});
