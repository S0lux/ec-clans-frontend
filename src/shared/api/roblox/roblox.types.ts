import { z } from "zod";
import { robloxGroupSchema } from "./roblox.dtos";

export type RobloxGroupSchema = z.infer<typeof robloxGroupSchema>;
