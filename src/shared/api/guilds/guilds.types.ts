import { z } from "zod";
import { discordGuildDtoSchema } from "./guilds.dtos";

export type DiscordGuildDto = z.infer<typeof discordGuildDtoSchema>;
