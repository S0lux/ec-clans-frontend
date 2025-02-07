import { z } from "zod";
import { clanDetailsDtoSchema, officializeClanDtoSchema } from "./clans.dtos";

export type OfficializeClanDto = z.infer<typeof officializeClanDtoSchema>;
export type ClanDetailsDto = z.infer<typeof clanDetailsDtoSchema>;
