import { AVAIABLE_FACTIONS } from "@/src/features/clans/setup-official-clan/setup-official-clan.schema";
import { z } from "zod";

export const officializeClanSchema = z.object({
  serverId: z.string().nonempty(),
  groupId: z.number(),
  mainFaction: z.enum(AVAIABLE_FACTIONS),
});
