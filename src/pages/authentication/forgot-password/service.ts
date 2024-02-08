import { AxiosInstance } from "@/shared/configs/api";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
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
  const { data } = await AxiosInstance.post<ForgotPasswordResponse>(
    `/forgot-password?email=${payload?.email}`,
    {},
    {}
  );
  return data;
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { mutateAsync, isLoading } = useMutation(forgotPassword, {
    onSuccess: () => {
      toast("Reset password email was sent to your email", {
        duration: 5000,
        closeButton: true,
      });
      navigate("/");
    },
    onError: (error: ApiError) => {
      toast(formatErrorMessage(error), {
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
