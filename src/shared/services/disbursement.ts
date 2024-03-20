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

      let filters = "";

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter)
        filter?.split(",").forEach((filter) => {
          if (filters) {
            filters = filters + "&filter=" + filter;
          } else {
            filters = "filter=" + filter;
          }
        });
      params.rootJoin = "OR";

      const { data } = await AxiosInstance.get<{
        disbursements: Disbursement[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/disbursements?${filters}`, {
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
