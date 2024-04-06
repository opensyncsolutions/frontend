import { DataTable } from "@/components/ui/data-table";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useEnrollement } from "@/shared/services/enrollments";
import { format } from "date-fns";

const Eac = ({ id }: { id: string }) => {
  const { enrollment } = useEnrollement(id);
  return (
    <div className="space-y-4">
      <h3 className="font-bold">EACs</h3>
      <DataTable
        data={enrollment?.eacs || []}
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

export default Eac;
