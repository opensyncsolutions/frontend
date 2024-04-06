import { useMutation } from "react-query";
import { AxiosInstance } from "../configs/api";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

interface PhonePayload {}

export const useCreatePhone = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: PhonePayload) => {
      const { data } = await AxiosInstance.post<Phone>("/phones", payload);
      return data;
    },
    {
      onError: (error) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
      onSuccess: () => {
        toast("Successfully created phone", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createPhone: mutateAsync,
    createPhoneLoading: isLoading,
  };
};

export const useEditPhone = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: PhonePayload) => {
      const { data } = await AxiosInstance.put<Phone>(`/phones/${id}`, payload);
      return data;
    },
    {
      onError: (error) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
      onSuccess: () => {
        toast("Successfully updated phone", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editPhone: mutateAsync,
    editPhoneLoading: isLoading,
  };
};

export const useDeletePhone = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/phones/${id}`);
      return data;
    },
    {
      onError: (error) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
      onSuccess: () => {
        toast("Successfully deleted phone", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    deletePhone: mutateAsync,
    deletePhoneLoading: isLoading,
  };
};
