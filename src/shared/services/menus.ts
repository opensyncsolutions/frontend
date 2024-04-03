import { AxiosInstance } from "@/shared/configs/api";
import { useMutation, useQuery } from "react-query";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

interface MenuPayload {
  path: string;
  name?: string;
  sortOrder?: number;
  description?: string;
  code?: string;
}

export const useMenus = () => {
  const { data, isLoading, error, isRefetching, refetch } = useQuery(
    ["menus"],
    async () => {
      const { data } = await AxiosInstance.get<{ menus: Menu[] }>("/menus");
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    menus: data,
    menusLoading: isLoading,
    menusError: error,
    menusRefetch: refetch,
    menusRefetching: isRefetching,
  };
};

export const useMenu = (id: string) => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery(
    ["menus", id],
    async () => {
      const { data } = await AxiosInstance.get<Menu>(`/menus/${id}`);
      return data;
    },
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    menu: data,
    menuLoading: isLoading,
    menuError: error,
    menuRefetch: refetch,
    menuRefetching: isRefetching,
  };
};

export const useCreateMenu = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: MenuPayload) => {
      const { data } = await AxiosInstance.post("/menus", payload);
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
        toast("Successfully created menu", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createMenu: mutateAsync,
    createMenuLoading: isLoading,
  };
};

export const useBulkyEditMenu = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: { id: string; sortOrder: number }[]) => {
      const { data } = await AxiosInstance.post("/menus/bulky", payload);
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
        toast("Successfully updated menus", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    updateBatch: mutateAsync,
    updateBatchLoading: isLoading,
  };
};

export const useEditMenu = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: MenuPayload) => {
      const { data } = await AxiosInstance.put(`/menus/${id}`, payload);
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
        toast("Successfully updated menu", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editMenu: mutateAsync,
    editMenuLoading: isLoading,
  };
};

export const useDeleteMenu = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/menus/${id}`);
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
        toast("Successfully deleted menu", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deleteMenu: mutateAsync, deleteMenuLoading: isLoading };
};
