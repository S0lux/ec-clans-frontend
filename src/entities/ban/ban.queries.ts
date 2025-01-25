import { BansService } from "@/src/shared/api/bans";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export class BanQueries {
  static getBanQuery(discordId: string) {
    return queryOptions({
      queryKey: ["ban", discordId],
      queryFn: () => BansService.getBan(discordId),
    });
  }

  static getBannabilityQuery(discordId: string) {
    return queryOptions({
      queryKey: ["bannability", discordId],
      queryFn: () => BansService.getBannability(discordId),
      enabled: !!discordId,
    });
  }

  static getBansQuery(pageNumber: number, pageSize: number) {
    return queryOptions({
      queryKey: ["bans", pageNumber, pageSize],
      queryFn: () => BansService.getBans(pageNumber, pageSize),
      placeholderData: keepPreviousData,
    });
  }
}
