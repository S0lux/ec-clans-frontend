import { ClansDtos } from ".";
import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { OfficializeClanDto } from "./clans.types";

export class ClansService {
  static async officializeClan(body: OfficializeClanDto) {
    return axiosInstance.post("/v1/clans", body);
  }

  static async getClans(pageNumber: number, pageSize: number, name?: string) {
    return axiosInstance
      .get("/v1/clans", {
        params: {
          page: pageNumber,
          size: pageSize,
          name,
        },
      })
      .then(zodValidate(ClansDtos.clanListDtoSchema));
  }

  static async getClan(clanId: string) {
    return axiosInstance
      .get(`/v1/clans/${clanId}`)
      .then(zodValidate(ClansDtos.clanDetailsDtoSchema));
  }
}
