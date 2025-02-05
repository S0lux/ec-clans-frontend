import { z } from "zod";
import { officializeClanSchema } from "./clans.dtos";

export type OfficializeClan = z.infer<typeof officializeClanSchema>;
