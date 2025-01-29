import { BansService } from "@/src/shared/api/bans";
import { queryClient } from "@/src/shared/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { AddBanDto } from "./add-ban.schema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useAddBanMutation = () => {
  return useMutation({
    mutationFn: async (data: AddBanDto) => {
      return await BansService.addBan(data);
    },

    onSuccess: (data, variable) => {
      queryClient.invalidateQueries({
        queryKey: ["bannability", variable.discordId],
      });

      queryClient.invalidateQueries({ queryKey: ["bans"] });

      toast.success("User has been banned", {
        theme: "dark",
        position: "bottom-right",
      });
    },

    onError: (error) => {
      if (error instanceof AxiosError && error.status === 403) {
        toast.error("You do not have permission to ban users", {
          theme: "dark",
          position: "bottom-right",
        });
      }
    },
  });
};
