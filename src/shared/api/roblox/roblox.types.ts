import { z } from "zod";
import { robloxGroupDtoSchema } from "./roblox.dtos";

export type RobloxGroupDto = z.infer<typeof robloxGroupDtoSchema>;
