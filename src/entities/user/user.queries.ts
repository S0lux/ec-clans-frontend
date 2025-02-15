import { UsersService } from "@/src/shared/api/users";
import { queryOptions } from "@tanstack/react-query";

export class UserQueries {
  static currentUserQuery() {
    return queryOptions({
      queryKey: ["current-user"],
      queryFn: async () => {
        const response = await UsersService.currentUserQuery();
        return response.data;
      },
    });
  }

  static currentUserGuildsQuery() {
    return queryOptions({
      queryKey: ["current-user-guilds"],
      queryFn: async () => {
        const response = await UsersService.getCurrentUserGuilds();
        return response.data;
      },
    });
  }
}
