import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { toast } from "sonner";
import { formatErrorMessage } from "../utils/helpers";

interface SectionPayload {
  code: string;
  name: string;
  form?: string;
  fields?: Field[];
  sortOrder?: number;
  translations?: Record<
    Languages,
    Partial<{ name?: string; description?: string }>
  >;
}

export const useSections = ({ form }: { form: string }) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["sections", form],
    async () => {
      const { data } = await AxiosInstance.get<{ sections: Section[] }>(
        `/sections?filter=form.id:eq:${form}`,
        {
          params: {
            fields: "id,fields,translations,name,sortOrder",
            pageSize: 100,
          },
        }
      );
      return data;
    },
    {
      enabled: !!form,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    sections: data,
    sectionsError: error as ApiError,
    sectionsLoading: isLoading,
    sectionsRefetch: refetch,
    sectionsRefetching: isRefetching,
  };
};

export const useSection = (id: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["sections", id],
    async () => {
      const { data } = await AxiosInstance.get<Section>(`/sections/${id}`, {
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
    section: data,
    sectionError: error as ApiError,
    sectionLoading: isLoading,
    sectionRefetch: refetch,
    sectionRefetching: isRefetching,
  };
};

export const useCreateSection = (cb?: (created?: boolean) => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: SectionPayload) => {
      const { data } = await AxiosInstance.post<Section>("/sections", payload);
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
        toast("Successfully created section", {
          duration: 5000,
          closeButton: true,
        });
        cb?.(true);
      },
    }
  );
  return {
    createSection: mutateAsync,
    createSectionLoading: isLoading,
  };
};

export const useEditSection = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: SectionPayload) => {
      const { data } = await AxiosInstance.put(`/sections/${id}`, payload);
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
        toast("Successfully updated section", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editSection: mutateAsync,
    editSectionLoading: isLoading,
  };
};

export const useBulkyEditSections = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (
      payload: { id: string; sortOrder: number; fields: { id: string }[] }[]
    ) => {
      const { data } = await AxiosInstance.post(`/sections/bulky`, payload);
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
        cb?.();
      },
    }
  );
  return {
    editSections: mutateAsync,
    editSectionsLoading: isLoading,
  };
};

export const useDeleteSection = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/sections/${id}`);
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
        toast("Successfully deleted section", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deleteSection: mutateAsync, deleteSectionLoading: isLoading };
};
