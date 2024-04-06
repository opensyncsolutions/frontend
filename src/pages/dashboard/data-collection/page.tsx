import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TableFilters from "@/components/table-filters";
import { useDataCollections } from "@/shared/services/data-collection";
import { DATE_TIME_FORMAT } from "@/shared/constants/constants";

const searchableFields: string[] = [
  "midlineHvlStatus",
  "baselineSurveyStatus",
  "endlineSurveyStatus",
];

const Page = () => {
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const {
    dataCollections,
    dataCollectionsError,
    dataCollectionsLoading,
    dataCollectionsRefetch,
    dataCollectionsRefething,
  } = useDataCollections({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (searchableFields.includes(filter?.key)) {
                  return `${filter?.key}:ilike:${filter?.value?.[0]}`;
                }
              }
            })
            .filter((item) => item !== undefined)
            .join(","),
        }
      : {}),
  });

  const loading = dataCollectionsLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
            title="Filter Data Collections Table"
            search={searchableFields.map((key) => ({
              key,
              placeholder: "Search " + key,
              value:
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button size={"sm"} onClick={() => dataCollectionsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(dataCollectionsRefething ? "animate-rotate" : "")}
            />
          </Button>
        </div>
      </div>
      <DataTable
        loading={loading}
        pagination={{
          page,
          pageSize,
          fetching: loading,
          setPage,
          setPageSize,
          total: dataCollections
            ? Math.ceil(dataCollections.total / pageSize)
            : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : dataCollectionsError
                  ? formatErrorMessage(dataCollectionsError)
                  : "No Data found"
              }
              type={dataCollectionsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                dataCollectionsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={dataCollections?.dataCollections || []}
        onRowClick={() => {}}
        columns={[
          {
            header: "Created",
            accessorKey: "created",
            cell(record) {
              return format(record.row.original.created, DATE_TIME_FORMAT);
            },
          },
          {
            header: "Midline HVL Status",
            accessorKey: "midlineHvlStatus",
          },
          {
            header: "Baseline Survey Status",
            accessorKey: "baselineSurveyStatus",
          },
          {
            header: "Endline Survey Status",
            accessorKey: "endlineSurveyStatus",
          },
        ]}
      />
    </div>
  );
};

export default Page;
