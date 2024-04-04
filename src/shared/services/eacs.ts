import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useEACs = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["eacs", page, pageSize, filter],
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
        eacs: EAC[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/eacs?${filters}`, {
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
    eacs: data,
    eacsError: error as ApiError,
    eacsLoading: isLoading,
    eacsRefetch: refetch,
    eacsRefething: isRefetching,
  };
};
