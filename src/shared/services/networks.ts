import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

interface NetworkPayload {
  name: string;
  utilitycode: string;
  status: string;
  operator: string;
  cash: number;
  fee: number;
  code?: string;
  description?: string;
}

export const useNetworks = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["networks", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      let filters = "";

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter)
        filter?.split(",").forEach((filter) => {
          if (filters) {
            filters = filters + "&filter=" + filter;
          } else {
            filters = "filter=" + filter;
          }
        });
      params.rootJoin = "OR";

      const { data } = await AxiosInstance.get<{
        networks: Network[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/networks?${filters}`, {
        params,
      });
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    networks: data,
    networksError: error as ApiError,
    networksLoading: isLoading,
    networksRefetch: refetch,
    networksRefething: isRefetching,
  };
};

export const useNetwork = (id: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["networks", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      params.rootJoin = "OR";

      const { data } = await AxiosInstance.get<Network>(`/networks/${id}`, {
        params,
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
    network: data,
    networkError: error as ApiError,
    networkLoading: isLoading,
    networkRefetch: refetch,
    networkRefething: isRefetching,
  };
};

export const useCreateNetwork = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: NetworkPayload) => {
      const { data } = await AxiosInstance.post("/networks", payload);
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
        toast("Successfully created network", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createNetwork: mutateAsync,
    createNetworkLoading: isLoading,
  };
};

export const useEditNetwork = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: NetworkPayload) => {
      const { data } = await AxiosInstance.put(`/networks/${id}`, payload);
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
        toast("Successfully updated network", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editNetwork: mutateAsync,
    editNetworkLoading: isLoading,
  };
};

export const useDeleteNetwork = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/networks/${id}`);
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
        toast("Successfully deleted network", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deleteNetwork: mutateAsync, deleteNetworkLoading: isLoading };
};
