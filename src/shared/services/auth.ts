import { useQuery } from "react-query";
import Cookie from "js-cookie";
import { AxiosInstance } from "../configs/api";

export const useGetMe = () => {
  const token = Cookie.get("access-token");
  const { data, refetch, isLoading, error } = useQuery(
    [],
    async () => {
      const { data } = await AxiosInstance.get<{
        data: User;
        success: boolean;
      }>("/auth/me");
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
    }
  );

  return {
    me: data?.data,
    meError: error as ApiError,
    meRefetch: refetch,
    meLoading: isLoading,
  };
};
