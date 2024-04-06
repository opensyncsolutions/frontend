import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { toast } from "sonner";
import { formatErrorMessage } from "../utils/helpers";

interface FormPayload {
  name: string;
  code?: string;
  fields?: Field[];
  translations?: Record<Languages, Partial<{ name?: string }>>;
}

export const useForms = (code?: Form) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["forms", code],
    async () => {
      const { data } = await AxiosInstance.get<{ forms: FormResponse[] }>(
        `/forms`,
        {
          params: {
            ...(code
              ? { filter: "code:ilike:" + code, pageSize: 1, fields: "*" }
              : { fields: "name,translations,id,code", pageSize: 100 }),
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

export const useEditForm = (id: string, cb?: (id?: string) => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: FormPayload) => {
      const { data } = await AxiosInstance.put<FormResponse>(
        `/forms/${id}`,
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
        toast("Successfully edited form", {
          duration: 5000,
          closeButton: true,
        });
        cb?.(res?.id);
      },
    }
  );
  return {
    editForm: mutateAsync,
    editFormLoading: isLoading,
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
