import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

export const useRoles = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["roles", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "name,system,privileges,id",
      };

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter) params.filter = filter;

      const { data } = await AxiosInstance.get<{
        roles: Role[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/roles`, {
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
    roles: data,
    rolesError: error as ApiError,
    rolesLoading: isLoading,
    rolesRefetch: refetch,
    rolesRefething: isRefetching,
  };
};

export const useRole = ({ id }: { id: string }) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["roles", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "name,system,privileges,id",
      };

      const { data } = await AxiosInstance.get<Role>(`/roles/${id}`, {
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
    role: data,
    roleError: error as ApiError,
    roleLoading: isLoading,
    roleRefetch: refetch,
    roleRefething: isRefetching,
  };
};

export const useCreateRole = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: {
      name: string;

      privileges: { id: string }[];
    }) => {
      const { data } = await AxiosInstance.post("/roles", payload);
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
        toast("Successfully created role", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createRole: mutateAsync,
    createRoleLoading: isLoading,
  };
};

export const useEditRole = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: {
      name: string;

      privileges: { id: string }[];
    }) => {
      const { data } = await AxiosInstance.put(`/roles/${id}`, payload);
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
        toast("Successfully updated role", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editRole: mutateAsync,
    editRoleLoading: isLoading,
  };
};

export const useDeleteRole = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/roles/${id}`);
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
        toast("Successfully deleted role", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deleteRole: mutateAsync, deleteRoleLoading: isLoading };
};

export const usePrivileges = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["privilege", page, pageSize, filter],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      if (pageSize) params.pageSize = pageSize;
      if (page) params.page = page;
      if (filter) params.filter = filter;

      const { data } = await AxiosInstance.get<{
        privileges: Privilege[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/privileges`, {
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
    privileges: data,
    privilegesError: error as ApiError,
    privilegesLoading: isLoading,
    privilegesRefetch: refetch,
    privilegesRefething: isRefetching,
  };
};

export const usePrivilege = ({ id }: { id: string }) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["privilege", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      const { data } = await AxiosInstance.get<Privilege>(`/privileges/${id}`, {
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
    privilege: data,
    privilegeError: error as ApiError,
    privilegeLoading: isLoading,
    privilegeRefetch: refetch,
    privilegeRefething: isRefetching,
  };
};

export const useCreatePrivilege = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: { name: string; value: string }) => {
      const { data } = await AxiosInstance.post("/privileges", payload);
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
        toast("Successfully created privilege", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createPrivilege: mutateAsync,
    createPrivilegeLoading: isLoading,
  };
};

export const useEditPrivilege = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: { name: string; value: string }) => {
      const { data } = await AxiosInstance.put(`/privileges/${id}`, payload);
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
        toast("Successfully updated privilege", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editPrivilege: mutateAsync,
    editPrivilegeLoading: isLoading,
  };
};

export const useDeletePrivilege = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/privileges/${id}`);
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
        toast("Successfully deleted privilege", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return { deletePrivilege: mutateAsync, deletePrivilegeLoading: isLoading };
};
