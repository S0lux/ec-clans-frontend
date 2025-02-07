import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { discordGuildDtoSchema } from "./guilds.dtos";

export class GuildsService {
  static async getGuildQuery(guildId: string) {
    return axiosInstance
      .get(`/v1/discord-guilds/${guildId}`)
      .then(zodValidate(discordGuildDtoSchema));
  }
}
