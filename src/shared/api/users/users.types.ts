import { z } from "zod";
import {
  baseDiscordUserDtoSchema,
  currentDiscordUserDtoSchema,
} from "./users.dtos";

export type BaseUserDto = z.infer<typeof baseDiscordUserDtoSchema>;
export type CurrentUserDto = z.infer<typeof currentDiscordUserDtoSchema>;
