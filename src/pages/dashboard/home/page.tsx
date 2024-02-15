import Summary from "./summary";
// import { DataTable } from "@/components/ui/data-table";
import Enrollments from "./enrollments";
import CashDisbursement from "./cash-disbursement";

export interface PageProps {
  objective?: "" | "/obj2";
}

const Page = ({ objective = "" }: PageProps) => {
  return (
    <div className="animate-fade-in">
      <Summary objective={objective} />
      <br />
      <div className={"border rounded-lg p-4 space-y-3"}>
        <h2>ENROLLMENTS - BY CLINIC</h2>
        <Enrollments objective={objective} />
      </div>
      <br />
      <div className={"border rounded-lg p-4 space-y-3"}>
        <h2>CASH DISBURSEMENTS - BY CLINIC</h2>
        <CashDisbursement objective={objective} />
      </div>
      {/* <div className={"mt-6"}>
        <DataTable
          pagination={{
            page: 1,
            pageSize: 10,
            total: 100,
            fetching: false,
            setPage: () => {},
            setPageSize: () => {},
          }}
          data={[
            {
              id: "728ed52f",
              amount: 100,
              status: "pending",
              email: "m@example.com",
            },
            {
              id: "728ed52f",
              amount: 100,
              status: "pending",
              email: "m@example.com",
            },
          ]}
          columns={[
            {
              accessorKey: "email",
              header: "Email",
            },
            {
              accessorKey: "status",
              header: "Status",
            },
            {
              accessorKey: "amount",
              header: "Amount",
            },
          ]}
        />
      </div> */}
    </div>
  );
};

export default Page;
