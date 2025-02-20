import { ClansService } from "@/src/shared/api/clans";
import { GuildsService } from "@/src/shared/api/guilds/guilds.service";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";

export class ClansQueries {
  static getClansQuery(
    pageNumber: number,
    pageSize: number = 10,
    statusFilter: "official" | "unofficial",
    nameFilter?: string,
  ) {
    return queryOptions({
      queryKey: ["clans", pageNumber, pageSize, nameFilter, statusFilter],
      queryFn: async () =>
        (
          await ClansService.getClans(
            pageNumber,
            pageSize,
            statusFilter,
            nameFilter,
          )
        ).data,
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
      queryKey: ["unofficial-clans"],
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

  static getClanPermissionsQuery(serverId?: string) {
    return queryOptions({
      queryKey: ["permissions", serverId],
      queryFn: async () =>
        (await ClansService.getClanPermissions(serverId!)).data,
      enabled: !!serverId,
    });
  }
}
