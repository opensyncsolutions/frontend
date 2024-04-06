import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TableFilters from "@/components/table-filters";
import { useBloodCollections } from "@/shared/services/blood-collection";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/constants/constants";

const searchableFields: string[] = ["mdhCollection", "result"];
const sortabledDateFileds = ["resultDate"];

const Page = () => {
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
    ...sortabledDateFileds.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const {
    bloodCollections,
    bloodCollectionsError,
    bloodCollectionsLoading,
    bloodCollectionsRefetch,
    bloodCollectionsRefething,
  } = useBloodCollections({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (searchableFields.includes(filter?.key)) {
                  return `${filter?.key}:ilike:${filter?.value?.[0]}`;
                }
                if (sortabledDateFileds.includes(filter?.key)) {
                  return `${filter?.key}:btn:${filter?.value?.[0]}${
                    filter?.value?.[1] ? "," + filter?.value?.[1] : ""
                  }`;
                }
              }
            })
            .filter((item) => item !== undefined)
            .join(","),
        }
      : {}),
  });

  const loading = bloodCollectionsLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
            title="Filter Blood Collections Table"
            search={searchableFields.map((key) => ({
              key,
              placeholder: "Search " + key,
              value:
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
            }))}
            dateFilters={sortabledDateFileds.map((key) => ({
              key,
              value: [
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
              ],
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button size={"sm"} onClick={() => bloodCollectionsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(bloodCollectionsRefething ? "animate-rotate" : "")}
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
          total: bloodCollections
            ? Math.ceil(bloodCollections.total / pageSize)
            : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : bloodCollectionsError
                  ? formatErrorMessage(bloodCollectionsError)
                  : "No Data found"
              }
              type={bloodCollectionsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                bloodCollectionsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={bloodCollections?.bloodCollections || []}
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
            header: "MDH Collection",
            accessorKey: "mdhCollection",
          },
          {
            header: "Result",
            accessorKey: "result",
          },
          {
            header: "Result Date",
            accessorKey: "resultDate",
            cell(record) {
              return record.row.original.resultDate
                ? format(record.row.original.resultDate, DATE_FORMAT)
                : "-";
            },
          },
        ]}
      />
    </div>
  );
};

export default Page;
