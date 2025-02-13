import { z } from "zod";
import { baseDiscordUserDtoSchema } from "../users/users.dtos";

export const discordGuildDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  iconUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  owner: baseDiscordUserDtoSchema.optional(),
});
