import { z } from "zod";

export const AVAIABLE_FACTIONS = [
  "redcliff",
  "korblox",
  "overseer",
  "empyrean",
] as const;

export const SetupOfficialClanSchema = z.object({
  serverId: z.string().nonempty(),
  groupId: z.string().nonempty(),
  mainFaction: z.enum(AVAIABLE_FACTIONS),
});

export type SetupOfficialClan = z.infer<typeof SetupOfficialClanSchema>;
