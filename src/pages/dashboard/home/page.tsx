import BarGraph from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";

import { useEnrollementsAnalytics } from "@/shared/services/enrollments";
import { formatErrorMessage } from "@/shared/utils/helpers";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setLoading] = useState(false);
  const {
    enrollmentAnalytics,
    enrollmentAnalyticsLoading,
    enrollmentAnalyticsError,
    enrollmentAnalyticsRefetch,
  } = useEnrollementsAnalytics({
    paginate: {
      page,
      pageSize,
    },
  });

  if (isLoading || enrollmentAnalyticsLoading) {
    return (
      <div className="flex justify-center items-center rounded-lg border animate-fade-in">
        <Loader />
      </div>
    );
  }

  if (enrollmentAnalyticsError) {
    return (
      <Error
        message={formatErrorMessage(enrollmentAnalyticsError)}
        refetch={() => {
          setLoading(true);
          enrollmentAnalyticsRefetch().finally(() => {
            setLoading(false);
          });
        }}
      />
    );
  }

  const data = generateClinicObjects(
    enrollmentAnalytics?.enrollmentAnalytics || []
  );

  return (
    <div className="animate-fade-in rounded-lg border p-4">
      <h3 className="font-bold text-lg mb-4">Enrollments</h3>
      <BarGraph
        data={data}
        names={{
          uv: "Elligible",
          pv: "Non Elligible",
        }}
      />
      {(enrollmentAnalytics?.total || 0) > pageSize ? (
        <>
          <DataPagination
            pagination={{
              page,
              pageSize,
              total: enrollmentAnalytics?.total || 0,
              setPage,
              setPageSize,
              fetching: isLoading || enrollmentAnalyticsLoading,
            }}
          />
        </>
      ) : null}
    </div>
  );
};

function DataPagination({ pagination }: { pagination: Pagination }) {
  const totalPages = Math.ceil(
    (pagination.total || 0) / (pagination.pageSize || 1)
  );

  return (
    <div className="flex items-center justify-between py-4">
      <p className="text-sm font-medium">
        Page {pagination?.page} of {totalPages}
      </p>

      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          className="hidden w-8 h-8 p-0 lg:flex"
          onClick={() => {
            pagination.setPage(1);
          }}
          disabled={pagination.page === 1 || pagination.fetching}
        >
          <ChevronsLeftIcon className="w-4 h-4 min-w-4" />
        </Button>
        <Button
          variant="secondary"
          className="w-8 h-8 p-0"
          onClick={() => {
            pagination.setPage((prev: number) => prev - 1);
          }}
          disabled={pagination.page === 1 || pagination?.fetching}
        >
          <ChevronLeftIcon className="w-4 h-4 min-w-4" />
        </Button>

        <Button
          variant="secondary"
          className="w-8 h-8 p-0"
          onClick={() => {
            pagination.setPage((prev: number) => prev + 1);
          }}
          disabled={pagination.page === totalPages || pagination?.fetching}
        >
          <ChevronRightIcon className="w-4 h-4 min-w-4" />
        </Button>
        <Button
          variant="secondary"
          className="hidden w-8 h-8 p-0 lg:flex"
          onClick={() => {
            pagination.setPage(pagination.setPage(totalPages));
          }}
          disabled={pagination.page === totalPages || pagination?.fetching}
        >
          <ChevronsRightIcon className="w-4 h-4 min-w-4" />
        </Button>
      </div>
    </div>
  );
}

export const generateClinicObjects = (
  data: EnrollmentAnalytic[]
): GraphObject[] => {
  const result: GraphObject[] = [];
  for (let i = 0; i < data.length; i++) {
    const clinic = data[i];
    result.push({
      name: clinic?.organisationUnit?.name,
      uv: clinic?.eligible,
      pv: clinic?.non,
    });
  }

  return result;
};

export default Page;
