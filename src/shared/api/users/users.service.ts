import { axiosInstance } from "..";
import { zodValidate } from "../../lib/axios";
import { CurrentUserDtoSchema } from "./users.dtos";

export class UsersService {
  static currentUserQuery() {
    return axiosInstance
      .get("/v1/users/me")
      .then(zodValidate(CurrentUserDtoSchema));
  }
}
