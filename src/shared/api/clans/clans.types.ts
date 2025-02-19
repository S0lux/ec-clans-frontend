import { z } from "zod";
import {
  clanDtoSchema,
  clansListDtoSchema,
  officializeClanDtoSchema,
  updateClanDescriptionsDtoSchema,
} from "./clans.dtos";

export type OfficializeClanDto = z.infer<typeof officializeClanDtoSchema>;
export type ClansListDto = z.infer<typeof clansListDtoSchema>;
export type ClanDto = z.infer<typeof clanDtoSchema>;
export type UpdateClanDescriptionsDto = z.infer<
  typeof updateClanDescriptionsDtoSchema
>;
