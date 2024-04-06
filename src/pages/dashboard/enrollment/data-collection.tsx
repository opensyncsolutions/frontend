import { DataTable } from "@/components/ui/data-table";
import { DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useEnrollement } from "@/shared/services/enrollments";
import { format } from "date-fns";

const DataCollection = ({ id }: { id: string }) => {
  const { enrollment } = useEnrollement(id);
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Data Collections</h3>
      <DataTable
        data={enrollment?.dataCollections || []}
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

export default DataCollection;
