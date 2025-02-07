import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { robloxGroupDtoSchema } from "./roblox.dtos";

export class RobloxService {
  static async getGroupInfo(groupId: string) {
    return axiosInstance
      .get(`/v1/roblox-groups/${groupId}`)
      .then(zodValidate(robloxGroupDtoSchema));
  }
}
