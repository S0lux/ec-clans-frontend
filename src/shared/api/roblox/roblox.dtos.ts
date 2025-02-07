import { z } from "zod";

export const robloxGroupDtoSchema = z.object({
  path: z.string(),
  createTime: z.string(),
  updateTime: z.string(),
  id: z.string(),
  displayName: z.string(),
  description: z.string(),
  owner: z.string(),
  memberCount: z.number(),
  publicEntryAllowed: z.boolean(),
  locked: z.boolean(),
  verified: z.boolean(),
});
