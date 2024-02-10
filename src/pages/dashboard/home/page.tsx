import BarGraph from "@/components/charts/bar-chart";
import Summary from "./summary";
import { DataTable } from "@/components/ui/data-table";

interface PageProps {
  objective?: "" | "/obj2";
}

const Page = ({ objective = "" }: PageProps) => {
  return (
    <div className="animate-fade-in">
      <Summary objective={objective} />
      <br />
      <div className={"border rounded-lg"}>
        <BarGraph
          data={[
            {
              name: "Nyakanazi Health Center",
              uv: 10,
              pv: 1,
            },
            {
              name: "Bulugala Health Center",
              uv: 13,
              pv: 3,
            },
            {
              name: "Nyakanazi Health Center",
              uv: 10,
              pv: 1,
            },
            {
              name: "Bulugala Health Center",
              uv: 13,
              pv: 3,
            },
            {
              name: "Nyakanazi Health Center",
              uv: 10,
              pv: 1,
            },
            {
              name: "Bulugala Health Center",
              uv: 13,
              pv: 3,
            },
            {
              name: "Nyakanazi Health Center",
              uv: 10,
              pv: 1,
            },
          ]}
          names={{
            uv: "Eligible",
            pv: "Non Eligible",
          }}
        />
      </div>
      <div className={"mt-6"}>
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
      </div>
    </div>
  );
};

export default Page;
