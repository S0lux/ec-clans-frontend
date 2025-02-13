import { ClansService } from "@/src/shared/api/clans";
import { GuildsService } from "@/src/shared/api/guilds/guilds.service";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";

export class ClansQueries {
  static getClansQuery(
    pageNumber: number,
    pageSize: number = 10,
    name?: string,
  ) {
    return queryOptions({
      queryKey: ["clans", pageNumber, pageSize, name],
      queryFn: async () =>
        (await ClansService.getClans(pageNumber, pageSize, name)).data,
      placeholderData: keepPreviousData,
    });
  }

  static getClanQuery(clanId?: string) {
    return queryOptions({
      queryKey: ["clan", clanId],
      queryFn: async () => (await ClansService.getClan(clanId!)).data,
      enabled: !!clanId,
    });
  }

  static getUnofficialClanQuery(guildId?: string) {
    return queryOptions({
      queryKey: ["unofficla-clans"],
      queryFn: async () => (await GuildsService.getGuildQuery(guildId!)).data,
      enabled: !!guildId,
    });
  }

  static getUnofficialClansQuery(nameFilter?: string) {
    return queryOptions({
      queryKey: ["unofficla-clans", nameFilter],
      queryFn: async () =>
        (await GuildsService.getGuildsQuery(nameFilter)).data,
    });
  }
}
