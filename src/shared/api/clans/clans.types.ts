import { z } from "zod";
import {
  clanDetailsDtoSchema,
  clanListDtoSchema,
  officializeClanDtoSchema,
} from "./clans.dtos";

export type OfficializeClanDto = z.infer<typeof officializeClanDtoSchema>;
export type ClanDetailsDto = z.infer<typeof clanDetailsDtoSchema>;
export type ClansListDto = z.infer<typeof clanListDtoSchema>;
