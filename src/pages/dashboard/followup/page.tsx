import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useFollowUps } from "@/shared/services/followups";
import { Edit2Icon, EyeIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/constants/constants";
// import TableFilters from "@/components/table-filters";

const searchableFields: string[] = [];
const filterableFields: string[] = [];
// const sortabledDateFileds: string[] = [];

// const genderOptions = [
//   { label: "Male", value: "Male" },
//   { label: "Female", value: "Female" },
// ];

// const objectiveOptions = [
//   { label: "Objective One", value: "Objective One" },
//   { label: "Objective Two", value: "Objective Two" },
// ];

const Page = () => {
  const [
    filters,
    // setFilters
  ] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
    ...filterableFields.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const {
    followups,
    followupsLoading,
    followupsRefetch,
    followupsRefething,
    followupsError,
  } = useFollowUps({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (filter?.key === "name") {
                  return `firstName:ilike:${filter?.value?.[0]},middleName:ilike:${filter?.value?.[0]},surname:ilike:${filter?.value?.[0]}`;
                }
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

  const loading = followupsLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          {/* <TableFilters
            title="Filter Enrollment Table"
            search={searchableFields.map((key) => ({
              key,
              placeholder: "Search " + key,
              value:
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
            }))}
            selectInputfilters={filterableFields.map((key) => ({
              key,
              placeholder: "Filter " + key,
              isMulti: true,
              options:
                key === "gender"
                  ? genderOptions
                  : key === "objective"
                  ? objectiveOptions
                  : [],
              value: [
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
              ],
            }))}
            dateFilters={sortabledDateFileds.map((key) => ({
              key,
              value: [
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
              ],
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          /> */}
          <Button size={"sm"} onClick={() => followupsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(followupsRefething ? "animate-rotate" : "")}
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
          total: followups ? Math.ceil(followups.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : followupsError
                  ? formatErrorMessage(followupsError)
                  : "No Data found"
              }
              type={followupsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                followupsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={followups?.followups || []}
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
            header: "Created By",
            cell: (record) => {
              return record?.row?.original?.createdBy?.username || "";
            },
          },
          {
            header: "Next Visit",
            accessorKey: "nextVisit",
            cell(record) {
              const date = record.row.original.nextVisit;
              return date ? format(date, DATE_FORMAT) : "-";
            },
          },
          {
            header: "First Return",
            accessorKey: "firstReturn",
            cell(record) {
              const date = record.row.original.firstReturn;
              return date ? format(date, DATE_FORMAT) : "-";
            },
          },
          {
            header: "Action",
            size: 100,
            cell: () => {
              return (
                <div className="flex justify-between gap-3 max-w-[100px]">
                  <button className="px-2 py-2">
                    <EyeIcon size={15} />
                  </button>
                  <button
                    className="px-2 py-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      // edit clicked
                    }}
                  >
                    <Edit2Icon size={15} />
                  </button>
                </div>
              );
            },
            meta: {
              className: "sticky right-0",
            },
          },
        ]}
      />
    </div>
  );
};

export default Page;
