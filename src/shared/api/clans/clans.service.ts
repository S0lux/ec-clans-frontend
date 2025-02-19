import { ClansDtos, ClansTypes } from ".";
import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { OfficializeClanDto } from "./clans.types";

export class ClansService {
  static async officializeClan(body: OfficializeClanDto) {
    return axiosInstance.post("/v1/clans", body);
  }

  static async getClans(
    pageNumber: number,
    pageSize: number,
    statusFilter: "official" | "unofficial",
    nameFilter?: string,
  ) {
    return axiosInstance
      .get("/v1/clans", {
        params: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          nameFilter: nameFilter,
          statusFilter: statusFilter,
        },
      })
      .then(zodValidate(ClansDtos.clansListDtoSchema));
  }

  static async getClan(clanId: string) {
    return axiosInstance
      .get(`/v1/clans/${clanId}`)
      .then(zodValidate(ClansDtos.clanDtoSchema));
  }

  static async updateDescriptions(
    clanId: string,
    body: ClansTypes.UpdateClanDescriptionsDto,
  ) {
    return axiosInstance.patch(`/v1/clans/${clanId}/descriptions`, body);
  }
}
