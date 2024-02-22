import { useMutation } from "react-query";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { AxiosInstance } from "@/shared/configs/api";
import { formatErrorMessage } from "@/shared/utils/helpers";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

const login = async (payload: LoginPayload) => {
  const { data } = await AxiosInstance.post<LoginResponse>(`/login`, payload, {
    withCredentials: false,
  });
  return data;
};

export const useLogin = () => {
  const { mutateAsync, isLoading } = useMutation(login, {
    onSuccess: (res) => {
      Cookie.set("access-token", res?.data?.accessToken);
      Cookie.set("refresh-token", res?.data?.refreshToken);
      window.location.reload();
    },
    onError: (error: ApiError) => {
      toast(formatErrorMessage(error), {
        duration: 5000,
        closeButton: true,
      });
    },
  });
  return {
    login: mutateAsync,
    loginLoading: isLoading,
  };
};
