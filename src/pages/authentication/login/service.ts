import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

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
  const { data } = await axios.post<LoginResponse>(`/login`, payload, {});
  return data;
};

export const useLogin = () => {
  const { mutateAsync, isLoading } = useMutation(login, {
    onSuccess: (res) => {
      localStorage.setItem("accessToken", res?.data?.accessToken);
      localStorage.setItem("refreshTokens", res?.data?.refreshToken);
      window.location.reload();
    },
    onError: (error: ApiError) => {
      toast(error?.response?.data?.message || error?.message, {
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
