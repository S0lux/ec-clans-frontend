import { BansService } from "@/src/shared/api/bans";
import { queryOptions } from "@tanstack/react-query";

export class BanQueries {
  static getBanQuery(discordId: string) {
    return queryOptions({
      queryKey: ["bannability", discordId],
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
}
