import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useBloodCollections = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["blood-collections", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter) params.filter = filter;

      const { data } = await AxiosInstance.get<{
        bloodCollections: BloodCollection[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/bloodCollections`, {
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
    bloodCollections: data,
    bloodCollectionsError: error as ApiError,
    bloodCollectionsLoading: isLoading,
    bloodCollectionsRefetch: refetch,
    bloodCollectionsRefething: isRefetching,
  };
};
