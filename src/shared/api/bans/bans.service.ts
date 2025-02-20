import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import {
  banDtoSchema,
  bannabilityDtoSchema,
  queryBansDtoSchema,
  serverBanDtoSchema,
} from "./bans.dtos";
import { AddBanDto } from "./bans.types";

export class BansService {
  static async getBan(discordId: string) {
    return axiosInstance
      .get(`/v1/bans/${discordId}`)
      .then(zodValidate(banDtoSchema));
  }

  static async getBannability(discordId: string) {
    return axiosInstance
      .get(`/v1/bans/${discordId}/bannability`)
      .then(zodValidate(bannabilityDtoSchema));
  }

  static async addBan(data: AddBanDto) {
    return axiosInstance.post(`/v1/bans`, data);
  }

  static async getBans(pageNumber: number, pageSize: number) {
    return axiosInstance
      .get(`/v1/bans`, {
        params: {
          page: pageNumber,
          size: pageSize,
        },
      })
      .then(zodValidate(queryBansDtoSchema));
  }

  static async getClanBans(clanId: string) {
    return axiosInstance
      .get(`/v1/clans/${clanId}/bans`)
      .then(zodValidate(serverBanDtoSchema.array()));
  }
}
