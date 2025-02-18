import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { clanGuildDtoSchema } from "./guilds.dtos";

export class GuildsService {
  static async getGuildQuery(guildId: string) {
    return axiosInstance
      .get(`/v1/discord-guilds/${guildId}`)
      .then(zodValidate(clanGuildDtoSchema));
  }

  static async getGuildsQuery(nameFilter?: string) {
    return axiosInstance
      .get("/v1/discord-guilds", {
        params: {
          name: nameFilter,
        },
      })
      .then(zodValidate(clanGuildDtoSchema.array()));
  }
}
