import { z } from "zod";
import { clanGuildDtoSchema } from "./guilds.dtos";

export type DiscordGuildDto = z.infer<typeof clanGuildDtoSchema>;
