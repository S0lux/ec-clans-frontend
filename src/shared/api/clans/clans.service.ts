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

  static async updatePoints(
    clanId: string,
    body: ClansTypes.UpdateClanPointsDto,
  ) {
    return axiosInstance.patch(`/v1/clans/${clanId}/points`, body);
  }

  static async getClanPermissions(serverId: string) {
    return axiosInstance
      .get(`/v1/permissions/${serverId}`)
      .then(zodValidate(ClansDtos.clanPermissionsDtoSchema));
  }

  static async getClanPointsHistory(
    serverId: string,
    pageSize: number,
    pageNumber: number,
  ) {
    return axiosInstance
      .get(`/v1/clans/${serverId}/points-history`, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
        },
      })
      .then(zodValidate(ClansDtos.clanPointsHistoryListDtoSchema));
  }

  static async synchronizeClanBans(serverId: string) {
    return axiosInstance
      .post(`/v1/clans/${serverId}/bans/sync`)
      .then(zodValidate(ClansDtos.clanBansResultDtoSchema));
  }
}
