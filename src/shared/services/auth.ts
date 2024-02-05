import { AxiosInstance, getAuthHeaders } from "../common/common";
import { useQuery } from "react-query";
import Cookie from "js-cookie";

export const getMe = async () => {
  const headers = getAuthHeaders();
  const { data } = await AxiosInstance.get<{ data: User; success: boolean }>(
    "/me",
    {
      headers,
    }
  );
  return data;
};

export const useGetMe = () => {
  const token = Cookie.get("access-token");
  const { data, refetch, isLoading, error } = useQuery([], getMe, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!token,
  });

  return {
    me: data?.data,
    meError: error as ApiError,
    meRefetch: refetch,
    meLoading: isLoading,
  };
};
