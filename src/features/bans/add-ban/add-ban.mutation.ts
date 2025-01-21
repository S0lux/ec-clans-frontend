import { BansService } from "@/src/shared/api/bans";
import { queryClient } from "@/src/shared/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { AddBanDto } from "./add-ban.schema";

export const useAddBanMutation = () => {
  return useMutation({
    mutationFn: async (data: AddBanDto) => {
      return await BansService.addBan(data);
    },

    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["bannability", variable.discordId],
      });
    },
  });
};
