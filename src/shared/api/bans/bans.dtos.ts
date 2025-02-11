import { z } from "zod";
import { baseDiscordUserDtoSchema } from "../users/users.dtos";

export const banDtoSchema = z.object({
  bannedUser: baseDiscordUserDtoSchema,
  staffUser: baseDiscordUserDtoSchema,
  reason: z.string().optional(),
  issueDate: z.coerce.date(),
});

export const bannabilityDtoSchema = z.object({
  user: baseDiscordUserDtoSchema,
  isBanned: z.boolean(),
});

export const addBanDtoSchema = z.object({
  discordId: z.string(),
  reason: z.string().optional(),
});

export const queryBansDtoSchema = z.object({
  results: z.array(banDtoSchema),
  totalPages: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
});

export const serverBanDtoSchema = z.object({
  user: baseDiscordUserDtoSchema,
  isServerBanned: z.boolean(),
});
