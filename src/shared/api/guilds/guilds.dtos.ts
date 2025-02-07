import { z } from "zod";

export const discordGuildDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});
