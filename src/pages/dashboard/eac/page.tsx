import { useState } from "react";

import { useEACs } from "@/shared/services/eacs";
import TableFilters from "@/components/table-filters";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { format } from "date-fns";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/constants/constants";

const sortabledDateFileds = [
  "created",
  "sessionDate",
  "interventionDate",
  "controlDate",
];

const Page = () => {
  const [filters, setFilters] = useState<Filter[]>([
    ...sortabledDateFileds.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const { eacs, eacsLoading, eacsError, eacsRefetch, eacsRefething } = useEACs({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (sortabledDateFileds.includes(filter?.key)) {
                return `${filter?.key}:btn:${filter?.value?.[0]}${
                  filter?.value?.[1] ? "," + filter?.value?.[1] : ""
                }`;
              }
            })
            .filter((item) => item !== undefined)
            .join(","),
        }
      : {}),
  });

  const loading = eacsLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
            title="Filter EACs Table"
            dateFilters={sortabledDateFileds.map((key) => ({
              key,
              value: [
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
              ],
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button size={"sm"} onClick={() => eacsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(eacsRefething ? "animate-rotate" : "")}
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
          total: eacs ? Math.ceil(eacs.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : eacsError
                  ? formatErrorMessage(eacsError)
                  : "No Data found"
              }
              type={eacsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                eacsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={eacs?.eacs || []}
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
            header: "Verified",
            accessorKey: "verified",
            cell: (record) => (record?.row?.original?.verified ? "YES" : "NO"),
          },
          {
            header: "Session Date",
            accessorKey: "sessionDate",
            cell(record) {
              if (record?.row?.original?.sessionDate)
                return format(record.row.original.sessionDate, DATE_FORMAT);
              return "-";
            },
          },
          {
            header: "Control Date",
            accessorKey: "controlDate",
            cell(record) {
              if (record?.row?.original?.controlDate)
                return format(record.row.original.controlDate, DATE_FORMAT);
              return "-";
            },
          },
          {
            header: "Intervention Date",
            accessorKey: "interventionDate",
            cell(record) {
              if (record?.row?.original?.interventionDate)
                return format(
                  record.row.original.interventionDate,
                  DATE_FORMAT
                );
              return "-";
            },
          },
          {
            header: "Contact Still",
            accessorKey: "contactStill",
            cell: (record) =>
              record?.row?.original?.contactStill ? "YES" : "NO",
          },
          {
            header: "Correct Mother Name",
            accessorKey: "correctMotherName",
            cell: (record) =>
              record?.row?.original?.correctMotherName ? "YES" : "NO",
          },
        ]}
      />
    </div>
  );
};

export default Page;
