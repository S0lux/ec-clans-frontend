import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { BanDtoSchema, BannabilityDtoSchema } from "./bans.dtos";
import { AddBanDto } from "./bans.types";

export class BansService {
  static async getBan(discordId: string) {
    return axiosInstance
      .get(`/v1/bans/${discordId}`)
      .then(zodValidate(BanDtoSchema));
  }

  static async getBannability(discordId: string) {
    return axiosInstance
      .get(`/v1/bans/${discordId}/bannability`)
      .then(zodValidate(BannabilityDtoSchema));
  }

  static async addBan(data: AddBanDto) {
    return axiosInstance.post(`/v1/bans`, data);
  }
}
