import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useDisbursements } from "@/shared/services/disbursement";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TableFilters from "@/components/table-filters";
import { DATE_TIME_FORMAT } from "@/shared/constants/constants";

const searchableFields: string[] = ["transid", "utilityref"];

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
    disbursements,
    disbursementsLoading,
    disbursementsError,
    disbursementsRefetch,
    disbursementsRefething,
  } = useDisbursements({
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

  const loading = disbursementsLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
            title="Filter Cash Disbursement Table"
            search={searchableFields.map((key) => ({
              key,
              placeholder: "Search " + key,
              value:
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button size={"sm"} onClick={() => disbursementsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(disbursementsRefething ? "animate-rotate" : "")}
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
          total: disbursements ? Math.ceil(disbursements.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : disbursementsError
                  ? formatErrorMessage(disbursementsError)
                  : "No Data found"
              }
              type={disbursementsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                disbursementsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={disbursements?.disbursements || []}
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
            header: "Transaction ID",
            accessorKey: "transid",
          },
          {
            header: "Utility Reference",
            accessorKey: "utilityref",
          },
          {
            header: () => (
              <span className="flex justify-end w-full">Amount</span>
            ),
            accessorKey: "amount",
            cell: (record) => {
              return (
                <span className="flex justify-end w-full">
                  {Intl.NumberFormat("en-US").format(
                    record?.row?.original?.amount
                  )}
                </span>
              );
            },
          },
          {
            header: "Created By",
            cell: (record) => {
              return record?.row?.original?.createdBy?.username || "";
            },
          },
        ]}
      />
    </div>
  );
};

export default Page;
