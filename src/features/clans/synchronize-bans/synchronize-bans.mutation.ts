import { ClansService } from "@/src/shared/api/clans";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSynchronizeBans = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async ({ serverId }: { serverId: string }) =>
      (await ClansService.synchronizeClanBans(serverId)).data,

    onSuccess: (data, variable) => {
      client.invalidateQueries({
        queryKey: ["clan-bans", variable.serverId],
      });
    },
  });
};
