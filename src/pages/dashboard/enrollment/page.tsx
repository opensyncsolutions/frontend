import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useEnrollements } from "@/shared/services/enrollments";
import { Edit2Icon, EyeIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TableFilters from "@/components/table-filters";

const searchableFields = ["organisationUnit", "name", "studyId", "ctcId"];
const filterableFields = ["gender", "status", "objective"];
const sortabledDateFileds = ["dob", "created"];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const objectiveOptions = [
  { label: "Objective One", value: "Objective One" },
  { label: "Objective Two", value: "Objective Two" },
];

const statusOptions = [
  { label: "CONTROL", value: "CONTROL" },
  { label: "INTERVENTION", value: "INTERVENTION" },
];

const Page = () => {
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
    ...filterableFields.map((key) => ({
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
    enrollments,
    enrollmentsLoading,
    enrollmentsRefetch,
    enrollmentsRefething,
    enrollmentsError,
  } = useEnrollements({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (filter?.key === "name") {
                  return `firstName:ilike:${filter?.value?.[0]},middleName:ilike:${filter?.value?.[0]},surname:ilike:${filter?.value?.[0]}`;
                }
                if (filter?.key === "organisationUnit") {
                  return `organisationUnit.name:ilike:${filter?.value?.[0]}`;
                }
                if (searchableFields.includes(filter?.key)) {
                  return `${filter?.key}:ilike:${filter?.value?.[0]}`;
                }
                if (filterableFields.includes(filter?.key)) {
                  if (filter?.key === "objective") {
                    return filter.value
                      .map((value) => `${filter?.key}.name:eq:${value}`)
                      .join(",");
                  }
                  return filter.value
                    .map((value) => `${filter?.key}:eq:${value}`)
                    .join(",");
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

  const loading = enrollmentsLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
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
                  : key === "status"
                  ? statusOptions
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
          />
          <Button size={"sm"} onClick={() => enrollmentsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(enrollmentsRefething ? "animate-rotate" : "")}
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
          total: enrollments ? Math.ceil(enrollments.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : enrollmentsError
                  ? formatErrorMessage(enrollmentsError)
                  : "No Data found"
              }
              type={enrollmentsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                enrollmentsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={enrollments?.enrollments || []}
        onRowClick={() => {}}
        columns={[
          { header: "Organization Name", accessorKey: "organisationUnit.name" },
          {
            header: "Participant Name",
            cell: (record) => {
              return (
                (record?.row?.original?.firstName || "") +
                " " +
                (record?.row?.original?.surname || "")
              );
            },
          },
          {
            header: "Status",
            accessorKey: "status",
          },
          {
            header: "Study ID",
            accessorKey: "studyId",
          },
          {
            header: "CTC ID",
            accessorKey: "ctcId",
          },
          {
            header: "Gender",
            accessorKey: "gender",
            cell: (record) => {
              return record?.row?.original?.gender;
            },
          },
          {
            header: "DOB",
            accessorKey: "dob",
            cell(record) {
              return format(record.row.original.dob, "dd MMM, yyyy");
            },
          },
          {
            header: "Objective",
            accessorKey: "objective.name",
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
