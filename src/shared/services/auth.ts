import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { toast } from "sonner";
import { delay, formatErrorMessage } from "../utils/helpers";

export const useGetMe = () => {
  const { data, refetch, isLoading, error } = useQuery(
    [],
    async () => {
      const { data } = await AxiosInstance.get<User>("/me", {
        params: {
          fields: "*",
        },
      });
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  return {
    me: data,
    meError: error as ApiError,
    meRefetch: refetch,
    meLoading: isLoading,
  };
};

export const useLogout = () => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.get<{ message: string }>("/logout");
      return data;
    },
    {
      onSuccess: async (res) => {
        toast(formatErrorMessage(res.message), {
          duration: 5000,
          closeButton: true,
        });
        await delay(500);
        window.location.href = "/login";
      },
      onError: (error: ApiError) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
    }
  );
  return {
    logout: mutateAsync,
    logoutLoading: isLoading,
  };
};
