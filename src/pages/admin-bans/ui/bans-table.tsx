"use client";

import { DataTable } from "@/src/shared/ui/components/shadcn/data-table";
import { BansTableColumns } from "./bans-table-columns";
import { PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BanQueries } from "@/src/entities/ban/ban.queries";

export const BansTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data: bansQuery } = useQuery(
    BanQueries.getBansQuery(pagination.pageIndex, pagination.pageSize),
  );

  return (
    <DataTable
      columns={BansTableColumns}
      pagination={pagination}
      setPagination={setPagination}
      pageCount={bansQuery?.data.totalPages || 0}
      data={bansQuery?.data.results || []}
    />
  );
};
