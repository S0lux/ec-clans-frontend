import { ClansService, ClansTypes } from "@/src/shared/api/clans";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useUpdateClanPoints = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      clanId: string;
      body: ClansTypes.UpdateClanPointsDto;
    }) => {
      return await ClansService.updatePoints(data.clanId, data.body);
    },

    onSuccess: (data, variable) => {
      client.invalidateQueries({ queryKey: ["clan", variable.clanId] });
      client.invalidateQueries({
        queryKey: ["points-history", variable.clanId],
      });
      toast.success("Points updated");
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
