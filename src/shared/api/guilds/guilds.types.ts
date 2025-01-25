import { z } from "zod";
import { DiscordGuildDtoSchema } from ".";

export type DiscordGuildDto = z.infer<typeof DiscordGuildDtoSchema>;
