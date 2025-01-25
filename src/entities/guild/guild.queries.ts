import { GuildsService } from "@/src/shared/api/guilds/guilds.service";
import { queryOptions } from "@tanstack/react-query";

export class GuildQueries {
  static getGuildQuery(guildId?: string) {
    return queryOptions({
      queryKey: ["guild", guildId],
      queryFn: async () => {
        const response = await GuildsService.getGuildQuery(guildId!);
        return response.data;
      },
      enabled: !!guildId,
    });
  }
}
