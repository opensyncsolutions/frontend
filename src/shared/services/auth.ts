import axios from "axios";
import { getAuthHeaders } from "../common/common";
import { useQuery } from "react-query";

export const getMe = async () => {
  const headers = getAuthHeaders();
  const { data } = await axios.get<{ data: User; success: boolean }>("/me", {
    headers,
  });
  return data;
};

export const useGetMe = () => {
  const { data, refetch, isLoading, error } = useQuery([], getMe, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false
  });

  return {
    me: data?.data,
    meError: error as ApiError,
    meRefetch: refetch,
    meLoading: isLoading,
  };
};
