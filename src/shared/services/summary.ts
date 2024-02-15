import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useDashboardSummary = (objective: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["dashboard-summary", objective],
    async () => {
      const { data } = await AxiosInstance.get<{ data: DashboardSummaryType }>(
        `/v1${objective}/dashboard/indicators`
      );
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    dashboardSummary: data?.data,
    dashboardSummaryError: error as ApiError,
    dashboardSummaryLoading: isLoading,
    dashboardSummaryRefetch: refetch,
    dashboardSummaryRefething: isRefetching,
  };
};

export const useEnrollmentSummary = (objective: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["clinicenrollments-summary", objective],
    async () => {
      const { data } = await AxiosInstance.get<{
        data: EnrollmentSummaryResponse;
      }>(`/v1${objective}/dashboard/clinicenrollments`);
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    clinicEnrollmentSummary: data?.data,
    clinicEnrollmentSummaryError: error as ApiError,
    clinicEnrollmentSummaryLoading: isLoading,
    clinicEnrollmentSummaryRefetch: refetch,
    clinicEnrollmentSummaryRefething: isRefetching,
  };
};

export const useCashDisbursementSummary = (objective: string) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["cashdisbursements-summary", objective],
    async () => {
      const { data } = await AxiosInstance.get<{
        data: CashDisbursementSummaryResponse;
      }>(`/v1${objective}/dashboard/cashdisbursements`);
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    cashDisbursementsSummary: data?.data,
    cashDisbursementSummaryError: error as ApiError,
    cashDisbursementSummaryLoading: isLoading,
    cashDisbursementSummaryRefetch: refetch,
    cashDisbursementSummaryRefething: isRefetching,
  };
};
