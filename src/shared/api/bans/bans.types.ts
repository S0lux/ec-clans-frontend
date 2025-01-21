import { z } from "zod";
import {
  AddBanDtoSchema,
  BanDtoSchema,
  BannabilityDtoSchema,
} from "./bans.dtos";

export type BanDto = z.infer<typeof BanDtoSchema>;
export type BannabilityDto = z.infer<typeof BannabilityDtoSchema>;
export type AddBanDto = z.infer<typeof AddBanDtoSchema>;
