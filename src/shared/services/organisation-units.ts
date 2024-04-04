import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { formatErrorMessage } from "../utils/helpers";
import { toast } from "sonner";

interface ObjectivePayload {
  name: string;
}

export const useOrganisationUnits = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["organisation-units", page, pageSize, filter],
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
        organisationUnits: OrganisationUnit[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/organisationUnits?${filters}`, {
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
    organisationUnits: data,
    organisationUnitsError: error as ApiError,
    organisationUnitsLoading: isLoading,
    organisationUnitsRefetch: refetch,
    organisationUnitsRefething: isRefetching,
  };
};

export const useOrganisationUnit = (id: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["organisation-units", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      params.rootJoin = "OR";

      const { data } = await AxiosInstance.get<OrganisationUnit>(
        `/organisationUnits/${id}`,
        {
          params,
        }
      );
      return data;
    },
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    organisationUnit: data,
    organisationUnitError: error as ApiError,
    organisationUnitLoading: isLoading,
    organisationUnitRefetch: refetch,
    organisationUnitRefething: isRefetching,
  };
};

export const useCreateOrganisationUnit = (cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: ObjectivePayload) => {
      const { data } = await AxiosInstance.post("/organisationUnits", payload);
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
        toast("Successfully created organisation unit", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    createOrganisationUnit: mutateAsync,
    createOrganisationUnitLoading: isLoading,
  };
};

export const useEditOrganisationUnit = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async (payload: ObjectivePayload) => {
      const { data } = await AxiosInstance.put(
        `/organisationUnits/${id}`,
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
      onSuccess: () => {
        toast("Successfully updated organisation unit", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    editOrganisationUnit: mutateAsync,
    editOrganisationUnitLoading: isLoading,
  };
};

export const useDeleteOrganisationUnit = (id: string, cb?: () => void) => {
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const { data } = await AxiosInstance.delete(`/organisationUnits/${id}`);
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
        toast("Successfully deleted organisation unit", {
          duration: 5000,
          closeButton: true,
        });
        cb?.();
      },
    }
  );
  return {
    deleteOrganisationUnit: mutateAsync,
    deleteOrganisationUnitLoading: isLoading,
  };
};
