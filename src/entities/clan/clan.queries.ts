import { ClansService } from "@/src/shared/api/clans";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";

export const getClansQuery = (
  pageNumber: number,
  pageSize: number = 10,
  name?: string,
) => {
  return queryOptions({
    queryKey: ["clans", pageNumber, pageSize],
    queryFn: () => ClansService.getClans(pageNumber, pageSize, name),
    placeholderData: keepPreviousData,
  });
};
