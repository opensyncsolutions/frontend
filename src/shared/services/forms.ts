import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { toast } from "sonner";
import { formatErrorMessage } from "../utils/helpers";

interface FormPayload {
  name: string;
  code: string;
  translations?: Record<Languages, Record<"name", string>>;
}

export const useForms = () => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["forms"],
    async () => {
      const { data } = await AxiosInstance.get<{ forms: FormResponse[] }>(
        `/forms`,
        {
          params: {
            fields: "name,translations,id,code",
            pageSize: 100,
          },
        }
      );
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    forms: data,
    formsError: error as ApiError,
    formsLoading: isLoading,
    formsRefetch: refetch,
    formsRefething: isRefetching,
  };
};

export const useForm = (id: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["forms", id],
    async () => {
      const { data } = await AxiosInstance.get<FormResponse>(`/forms/${id}`, {
        params: {
          fields: "*",
        },
      });
      return data;
    },
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    form: data,
    formError: error as ApiError,
    formLoading: isLoading,
    formRefetch: refetch,
    formRefetching: isRefetching,
  };
};

export const useCreateForm = (cb?: (id?: string) => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: FormPayload) => {
      const { data } = await AxiosInstance.post<FormResponse>(
        "/forms",
        payload
      );
      return data;
    },
    {
      onError: (error) => {
        toast(formatErrorMessage(error), {
          duration: 5000,
          closeButton: true,
        });
      },
      onSuccess: (res) => {
        toast("Successfully created form", {
          duration: 5000,
          closeButton: true,
        });
        cb?.(res?.id);
      },
    }
  );
  return {
    createForm: mutateAsync,
    createFormLoading: isLoading,
  };
};

export const useDeleteForm = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/forms/${id}`);
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
        toast("Successfully deleted form", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deleteForm: mutateAsync, deleteFormLoading: isLoading };
};
