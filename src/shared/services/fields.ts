import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

export const useFields = (path: Fields | "") => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["fields", path],
    async () => {
      const { data } = await AxiosInstance.get<Field[]>(`/${path}/fields`, {
        params: {
          fields: "*",
        },
      });
      return data;
    },
    {
      enabled: !!path,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    fields: data,
    fieldsError: error as ApiError,
    fieldsLoading: isLoading,
    fieldsRefetch: refetch,
    fieldsRefething: isRefetching,
  };
};

export const useBulkyEditFields = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: { name: string; sortOrder: number; id?: string }[]) => {
      const { data } = await AxiosInstance.put(`/fields/bulky`, payload);
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
        toast("Successfully updated form", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editFields: mutateAsync,
    editFieldsLoading: isLoading,
  };
};

export const useEditField = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: {
      description: string;
      type: string;
      translations?: Record<Languages, Partial<{ description?: string }>>;
    }) => {
      const { data } = await AxiosInstance.put(`/fields/${id}`, payload);
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
        toast("Successfully updated field", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editFields: mutateAsync,
    editFieldsLoading: isLoading,
  };
};
