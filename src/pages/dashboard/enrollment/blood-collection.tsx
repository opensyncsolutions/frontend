import { DataTable } from "@/components/ui/data-table";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useEnrollement } from "@/shared/services/enrollments";
import { format } from "date-fns";

const BloodCollection = ({ id }: { id: string }) => {
  const { enrollment } = useEnrollement(id);
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Blood Collections</h3>
      <DataTable
        data={enrollment?.bloodCollections || []}
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

export default BloodCollection;
