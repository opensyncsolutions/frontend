import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useDataCollections = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["data-collections", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter) params.filter = filter;

      const { data } = await AxiosInstance.get<{
        dataCollections: DataCollection[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/dataCollections`, {
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
    dataCollections: data,
    dataCollectionsError: error as ApiError,
    dataCollectionsLoading: isLoading,
    dataCollectionsRefetch: refetch,
    dataCollectionsRefething: isRefetching,
  };
};
