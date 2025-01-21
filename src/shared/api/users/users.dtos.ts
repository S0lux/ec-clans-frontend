import { z } from "zod";

export const BaseUserDtoSchema = z.object({
  id: z.string().nonempty(),
  username: z.string().nonempty(),
  discriminator: z.string().nonempty(),
  avatarUrl: z.string().url(),
});

export const CurrentUserDtoSchema = z.object({
  ...BaseUserDtoSchema.shape,
  isStaff: z.boolean().default(false),
});
