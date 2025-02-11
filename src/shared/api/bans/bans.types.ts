import { z } from "zod";
import {
  addBanDtoSchema,
  banDtoSchema,
  bannabilityDtoSchema,
  queryBansDtoSchema,
  serverBanDtoSchema,
} from "./bans.dtos";

export type BanDto = z.infer<typeof banDtoSchema>;
export type BannabilityDto = z.infer<typeof bannabilityDtoSchema>;
export type AddBanDto = z.infer<typeof addBanDtoSchema>;
export type BansDto = z.infer<typeof queryBansDtoSchema>;
export type ServerBanDto = z.infer<typeof serverBanDtoSchema>;
