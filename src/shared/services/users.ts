import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { toast } from "sonner";
import { formatErrorMessage } from "../utils/helpers";

interface UserPayload {
  email?: string;
  name: string;
  username: string;
  phoneNumber?: string;
  password?: string;
  roles?: { id: string }[];
}

export const useUsers = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["users", page, pageSize, filter],
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
        users: User[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/users?${filters}`, {
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
    users: data,
    usersError: error as ApiError,
    usersLoading: isLoading,
    usersRefetch: refetch,
    usersRefething: isRefetching,
  };
};

export const useUser = ({ id }: { id: string }) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["user", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      const { data } = await AxiosInstance.get<User>(`/users/${id}`, {
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
    user: data,
    userError: error as ApiError,
    userLoading: isLoading,
    userRefetch: refetch,
    userRefething: isRefetching,
  };
};

export const useCreateUser = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: UserPayload) => {
      const { data } = await AxiosInstance.post("/users", payload);
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
        toast("Successfully created user", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createUser: mutateAsync,
    createUserLoading: isLoading,
  };
};

export const useEditUser = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: UserPayload) => {
      const { data } = await AxiosInstance.put(`/users/${id}`, payload);
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
        toast("Successfully updated user", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editUser: mutateAsync,
    editUserLoading: isLoading,
  };
};

export const useDeleteUser = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/users/${id}`);
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
        toast("Successfully deleted user", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deleteUser: mutateAsync, deleteUserLoading: isLoading };
};
