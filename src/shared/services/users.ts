import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useUsers = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["users", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter) params.filter = filter;

      const { data } = await AxiosInstance.get<{
        users: User[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/users`, {
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
    users: data,
    usersError: error as ApiError,
    usersLoading: isLoading,
    usersRefetch: refetch,
    usersRefething: isRefetching,
  };
};
