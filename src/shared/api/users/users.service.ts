import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { currentDiscordUserDtoSchema } from "./users.dtos";

export class UsersService {
  static currentUserQuery() {
    return axiosInstance
      .get("/v1/discord-users/me")
      .then(zodValidate(currentDiscordUserDtoSchema));
  }
}
