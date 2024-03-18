import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useFields = (path: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["fields", path],
    async () => {
      const { data } = await AxiosInstance.get<Field[]>(`/${path}/fields`, {
        params: {
          fields: "*",
        },
      });
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    fields: data,
    fieldsError: error as ApiError,
    fieldsLoading: isLoading,
    fieldsRefetch: refetch,
    fieldsRefething: isRefetching,
  };
};
