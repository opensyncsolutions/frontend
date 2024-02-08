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
