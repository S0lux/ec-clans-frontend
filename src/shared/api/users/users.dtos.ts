import { z } from "zod";

export const baseDiscordUserDtoSchema = z.object({
  id: z.string().nonempty(),
  username: z.string().nonempty(),
  discriminator: z.string().nonempty(),
  avatarUrl: z.string().url(),
});

export const currentDiscordUserDtoSchema = z.object({
  ...baseDiscordUserDtoSchema.shape,
  isStaff: z.boolean().default(false),
});

export const discordGuildOAuthDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  owner: z.boolean(),
  permissions: z.string(),
});
