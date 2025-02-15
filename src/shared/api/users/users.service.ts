import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import {
  currentDiscordUserDtoSchema,
  discordGuildOAuthDtoSchema,
} from "./users.dtos";

export class UsersService {
  static currentUserQuery() {
    return axiosInstance
      .get("/v1/discord-users/me")
      .then(zodValidate(currentDiscordUserDtoSchema));
  }

  static getCurrentUserGuilds() {
    return axiosInstance
      .get("/v1/discord-users/me/guilds")
      .then(zodValidate(discordGuildOAuthDtoSchema.array()));
  }
}
