import { RobloxService } from "@/src/shared/api/roblox";
import { queryOptions } from "@tanstack/react-query";

export class RobloxQueries {
  static groupInfoQuery(groupId?: string) {
    return queryOptions({
      queryKey: ["roblox-group", groupId],
      queryFn: async () => {
        const response = await RobloxService.getGroupInfo(groupId!);
        return response.data;
      },
      enabled: !!groupId,
    });
  }
}
