import { z } from "zod";

export const addBanSchema = z.object({
  discordId: z.string().nonempty("Discord ID is required"),
  reason: z
    .string()
    .max(64, "Reason must be 64 characters long or shorter")
    .default(""),
});

export type AddBanDto = z.infer<typeof addBanSchema>;
