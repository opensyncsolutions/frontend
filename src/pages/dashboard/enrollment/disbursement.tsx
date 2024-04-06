import { DataTable } from "@/components/ui/data-table";
import { DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useEnrollement } from "@/shared/services/enrollments";
import { format } from "date-fns";

const Disbursement = ({ id }: { id: string }) => {
  const { enrollment } = useEnrollement(id);
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Cash Disbursements</h3>
      <DataTable
        data={enrollment?.disbursements || []}
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
        ]}
      />
    </div>
  );
};

export default Disbursement;
