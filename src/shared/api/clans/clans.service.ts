import { axiosInstance } from "..";
import { OfficializeClan } from "./clans.types";

export class ClansService {
  static async officializeClan(body: OfficializeClan) {
    return axiosInstance.post("/v1/clans", body);
  }
}
