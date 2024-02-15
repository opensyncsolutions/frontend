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
        data={enrollments?.data || []}
        columns={[
          { header: "Clinic Name", accessorKey: "clinic.name" },
          {
            header: "Participant Name",
            cell: (record) => {
              return (
                (record?.row?.original?.first_name || "") +
                " " +
                (record?.row?.original?.middle_name || "") +
                " " +
                (record?.row?.original?.sur_name || "")
              );
            },
          },
          {
            header: "Study ID",
            accessorKey: "studyID",
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
                  <button className="px-2 py-2">
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
