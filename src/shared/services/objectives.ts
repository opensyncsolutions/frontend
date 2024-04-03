import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

interface ObjectivePayload {
  name: string;
}

export const useObjectives = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["objectives", page, pageSize, filter],
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
        objectives: Objective[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/objectives?${filters}`, {
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
    objectives: data,
    objectivesError: error as ApiError,
    objectivesLoading: isLoading,
    objectivesRefetch: refetch,
    objectivesRefething: isRefetching,
  };
};

export const useObjective = (id: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["objectives", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      params.rootJoin = "OR";

      const { data } = await AxiosInstance.get<Objective>(`/objectives/${id}`, {
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
    objective: data,
    objectiveError: error as ApiError,
    objectiveLoading: isLoading,
    objectiveRefetch: refetch,
    objectiveRefething: isRefetching,
  };
};

export const useCreateObjective = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: ObjectivePayload) => {
      const { data } = await AxiosInstance.post("/objectives", payload);
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
        toast("Successfully created objective", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createObjective: mutateAsync,
    createObjectiveLoading: isLoading,
  };
};

export const useEditObjective = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: ObjectivePayload) => {
      const { data } = await AxiosInstance.put(`/objectives/${id}`, payload);
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
    editObjective: mutateAsync,
    editObjectiveLoading: isLoading,
  };
};

export const useDeleteObjective = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/objectives/${id}`);
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
  return { deleteObjective: mutateAsync, deleteObjectiveLoading: isLoading };
};
