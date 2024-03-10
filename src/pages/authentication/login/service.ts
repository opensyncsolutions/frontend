import { useMutation } from "react-query";
import { toast } from "sonner";
import { AxiosInstance } from "@/shared/configs/api";
import { formatErrorMessage } from "@/shared/utils/helpers";

type LoginPayload = {
  username: string;
  password: string;
};

const login = async (payload: LoginPayload) => {
  const { data } = await AxiosInstance.post(`/login`, payload);
  return data;
};

export const useLogin = () => {
  const { mutateAsync, isLoading } = useMutation(login, {
    onSuccess: () => {
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
