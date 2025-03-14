import { z } from "zod";
import {
  clanBansResultDtoSchema,
  clanDtoSchema,
  clanPermissionsDtoSchema,
  clanPointsHistoryDtoSchema,
  clanPointsHistoryListDtoSchema,
  clansListDtoSchema,
  officializeClanDtoSchema,
  updateClanDescriptionsDtoSchema,
  updateClanPointsSchema,
} from "./clans.dtos";

export type OfficializeClanDto = z.infer<typeof officializeClanDtoSchema>;
export type ClansListDto = z.infer<typeof clansListDtoSchema>;
export type ClanDto = z.infer<typeof clanDtoSchema>;
export type UpdateClanDescriptionsDto = z.infer<
  typeof updateClanDescriptionsDtoSchema
>;
export type ClanPermissionsDto = z.infer<typeof clanPermissionsDtoSchema>;
export type ClanBansResultDto = z.infer<typeof clanBansResultDtoSchema>;
export type ClanPointsHistoryDto = z.infer<typeof clanPointsHistoryDtoSchema>;
export type UpdateClanPointsDto = z.infer<typeof updateClanPointsSchema>;
export type ClanPointsHistoryListDto = z.infer<
  typeof clanPointsHistoryListDtoSchema
>;
