import { ClansService } from "@/src/shared/api/clans";
import { useMutation } from "@tanstack/react-query";
import { SetupOfficialClan } from "./setup-official-clan.schema";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const useSetupOfficialClanMutation = () => {
  return useMutation({
    mutationFn: async (data: SetupOfficialClan) => {
      const numberGroupId = parseInt(data.groupId);
      return await ClansService.officializeClan({
        ...data,
        groupId: numberGroupId,
      });
    },

    onSuccess: () => {
      toast.success("Clan officialized successfully");
    },

    onError(error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
