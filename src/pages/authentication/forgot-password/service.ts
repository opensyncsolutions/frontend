import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "sonner";

type ForgotPasswordPayload = {
  email: string;
};

type ForgotPasswordResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await axios.post<ForgotPasswordResponse>(
    `/forgot-password?email=${payload?.email}`,
    {},
    {}
  );
  return data;
};

export const useForgotPassword = () => {
  const { mutateAsync, isLoading } = useMutation(forgotPassword, {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error: ApiError) => {
      toast(error?.response?.data?.msg || error?.message, {
        duration: 5000,
        closeButton: true,
      });
    },
  });
  return {
    forgotPassword: mutateAsync,
    forgotPasswordLoading: isLoading,
  };
};
