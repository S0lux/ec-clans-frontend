import { ClansService, ClansTypes } from "@/src/shared/api/clans";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateClanDescriptions = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      clanId: string;
      body: ClansTypes.UpdateClanDescriptionsDto;
    }) => {
      return await ClansService.updateDescriptions(data.clanId, data.body);
    },

    onSuccess: (data, variable) => {
      client.invalidateQueries({ queryKey: ["clan", variable.clanId] });
      toast.success("Descriptions updated");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
