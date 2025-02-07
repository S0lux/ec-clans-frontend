import { axiosInstance } from "..";
import { OfficializeClanDto } from "./clans.types";

export class ClansService {
  static async officializeClan(body: OfficializeClanDto) {
    return axiosInstance.post("/v1/clans", body);
  }

  static async getClans(pageNumber: number, pageSize: number, name?: string) {
    return axiosInstance.get("/v1/clans", {
      params: {
        page: pageNumber,
        size: pageSize,
        name,
      },
    });
  }
}
