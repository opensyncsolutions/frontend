import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useEnrollements } from "@/shared/services/enrollments";
import { Edit2Icon, EyeIcon, FilterIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import BottomSheet from "@/components/ui/bottom-sheet";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface PageProps {
  objective?: "" | "/obj2";
}

const Page = ({ objective = "" }: PageProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openFilters, setOpenFilters] = useState(false);
  const {
    enrollments,
    enrollmentsLoading,
    enrollmentsRefetch,
    enrollmentsRefething,
    enrollmentsError,
  } = useEnrollements({
    objective,
    paginate: { page, pageSize },
  });

  const loading = enrollmentsLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => setOpenFilters(!openFilters)}
          >
            <FilterIcon size={15} />
          </Button>
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
              refetch={() => enrollmentsRefetch()}
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
            header: "Study ID",
            accessorKey: "studyId",
          },
          {
            header: "CTC ID",
            accessorKey: "ctcId",
          },
          {
            header: "Sex",
            accessorKey: "gender",
            cell: (record) => {
              return record?.row?.original?.gender;
            },
          },
          {
            header: "DOB",
            accessorKey: "dob",
          },
          {
            header: "HBC Name",
            accessorKey: "hbc_name",
          },
          {
            header: "HBC Number",
            accessorKey: "hbc_number",
          },
          {
            header: "Participant Mobile",
            accessorKey: "phone_one",
          },
          {
            header: "Enrolled Date",
            accessorKey: "created",
          },
          {
            header: "Screening ID",
            accessorKey: "screening_id",
          },
          {
            header: "Scheduled Return to Care Date",
            accessorKey: "scheduled_return_to_care",
          },
          {
            header: "Collector",
            accessorKey: "collector.full_name",
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
      <BottomSheet
        open={openFilters}
        close={() => setOpenFilters(false)}
        title="Title"
      >
        <div className="min-h-60 space-y-5 px-4">
          <Input />
          <Button onClick={() => setOpenFilters(false)}>Close</Button>
        </div>
      </BottomSheet>
    </div>
  );
};

export default Page;
