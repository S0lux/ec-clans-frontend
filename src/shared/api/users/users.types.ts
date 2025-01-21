import { z } from "zod";
import { BaseUserDtoSchema, CurrentUserDtoSchema } from "./users.dtos";

export type BaseUserDto = z.infer<typeof BaseUserDtoSchema>;
export type CurrentUserDto = z.infer<typeof CurrentUserDtoSchema>;
