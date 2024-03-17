import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useDisbursements = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["disbursements", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter) params.filter = filter;

      const { data } = await AxiosInstance.get<{
        disbursements: Disbursement[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/disbursements`, {
        params,
      });
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    disbursements: data,
    disbursementsError: error as ApiError,
    disbursementsLoading: isLoading,
    disbursementsRefetch: refetch,
    disbursementsRefething: isRefetching,
  };
};
