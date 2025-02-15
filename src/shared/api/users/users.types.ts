import { z } from "zod";
import {
  baseDiscordUserDtoSchema,
  currentDiscordUserDtoSchema,
  discordGuildOAuthDtoSchema,
} from "./users.dtos";

export type BaseUserDto = z.infer<typeof baseDiscordUserDtoSchema>;
export type CurrentUserDto = z.infer<typeof currentDiscordUserDtoSchema>;
export type DiscordGuildOAuthDto = z.infer<typeof discordGuildOAuthDtoSchema>;
