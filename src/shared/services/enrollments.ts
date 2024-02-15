import { useQuery } from "react-query";
import { AxiosInstance } from "../configs/api";

export const useEnrollements = ({
  objective,
  paginate: { page, pageSize },
}: {
  objective: string;
  paginate: Paginate;
}) => {
  const { data, error, isLoading, refetch, isRefetching } = useQuery(
    ["enrollments", objective, page, pageSize],
    async () => {
      const url = new URL(
        `${AxiosInstance.defaults.baseURL}/v1${objective}/enrollments/paginate`
      );

      if (pageSize) url.searchParams.append("per_page", pageSize.toString());
      if (page) url.searchParams.append("page", page.toString());

      const { data } = await AxiosInstance.get<{
        data: {
          data: Enrollment[];
          total: number;
          last_page: number;
          current_page: number;
        };
      }>(`${url}`);
      return data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return {
    enrollments: data?.data,
    enrollmentsError: error as ApiError,
    enrollmentsLoading: isLoading,
    enrollmentsRefetch: refetch,
    enrollmentsRefething: isRefetching,
  };
};
