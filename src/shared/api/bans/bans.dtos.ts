import { z } from "zod";
import { BaseUserDtoSchema } from "../users/users.dtos";

export const BanDtoSchema = z.object({
  bannedUser: BaseUserDtoSchema,
  staffUser: BaseUserDtoSchema,
  reason: z.string().optional(),
  issueDate: z.coerce.date(),
});

export const BannabilityDtoSchema = z.object({
  user: BaseUserDtoSchema,
  isBanned: z.boolean(),
});

export const AddBanDtoSchema = z.object({
  discordId: z.string(),
  reason: z.string().optional(),
});

export const BansDtoSchema = z.object({
  bans: z.array(BanDtoSchema),
  totalPages: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
});
