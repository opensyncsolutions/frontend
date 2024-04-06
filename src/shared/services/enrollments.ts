import { useMutation, useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";
import { toast } from "sonner";
import { formatErrorMessage } from "../utils/helpers";

// const fields = [
//   "clinic",
//   "objective",
//   "middleName",
//   "firstName",
//   "surname",
//   "dob",
//   "status",
//   "studyId",
//   "ctcId",
//   "recentVisit",
//   "participantConsent",
//   "informedConsent",
//   "enrollmentDate",
//   "assessmentDate",
//   "hbcName",
//   "hbcNumber",
//   "scheduledReturn",
//   "assessmentDate",
//   "viralLoadDate",
//   "counsellingDate",
//   "clinicalInterventionVisit",
//   "clinicalControlVisit",
//   "returnMobileNumber",
//   "mainConsentStudy",
//   "consentToBeContacted",
//   "completeBaselineSurvey",
//   "currentEnrolled",
//   "organisationUnit",
//   "createdBy",
//   "updatedBy",
// ];

export const useEnrollements = ({
  paginate: { page, pageSize },
  filter,
}: {
  paginate: Paginate;
  filter?: string;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["enrollments", page, pageSize, filter],
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
        enrollments: Enrollment[];
        total: number;
        page: number;
        pageSize: number;
      }>(`/enrollments?${filters}`, {
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
    enrollments: data,
    enrollmentsError: error as ApiError,
    enrollmentsLoading: isLoading,
    enrollmentsRefetch: refetch,
    enrollmentsRefething: isRefetching,
  };
};

export const useEnrollement = (id: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["enrollments", id],
    async () => {
      const params: Record<string, string | number | boolean> = {
        fields: "*",
      };

      const { data } = await AxiosInstance.get<Enrollment>(
        `/enrollments/${id}`,
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
    enrollment: data,
    enrollmentError: error as ApiError,
    enrollmentLoading: isLoading,
    enrollmentRefetch: refetch,
    enrollmentRefething: isRefetching,
  };
};

export const useEditEnrollment = (id: string, cb?: () => void) => {
  const { enrollmentRefetch } = useEnrollement(id);
  const { mutateAsync, isLoading } = useMutation(
    async (payload: Record<string, string | boolean | number>) => {
      const { data } = await AxiosInstance.put(`/enrollments/${id}`, payload);
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
        toast("Successfully updated enrollment", {
          duration: 5000,
          closeButton: true,
        });
        enrollmentRefetch();
        cb?.();
      },
    }
  );
  return {
    editEnrollment: mutateAsync,
    editEnrollmentLoading: isLoading,
  };
};
