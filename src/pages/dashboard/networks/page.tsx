import TableFilters from "@/components/table-filters";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import SideSheet from "@/components/ui/side-sheet";
import { cn } from "@/lib/utils";
import Error from "@/pages/error";
import { DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useGetMe } from "@/shared/services/auth";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit2Icon, RefreshCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateEditNetworkForm from "./create-edit-network-form";
import NetworkItem from "./network";
import DeleteObjective from "./delete-network";
import { useNetworks } from "@/shared/services/networks";

const searchableFields: string[] = [
  "name",
  "status",
  "operator",
  "utilitycode",
  "description",
];
const sortabledDateFileds = ["created"];

const Page = () => {
  const [search, setSearch] = useSearchParams();
  const [networkToDelete, setNetworkToDelete] = useState("");
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const {
    networks,
    networksLoading,
    networksError,
    networksRefetch,
    networksRefething,
  } = useNetworks({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (searchableFields.includes(filter?.key)) {
                  return `${filter?.key}:ilike:${filter?.value?.[0]}`;
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

  const loading = networksLoading || isLoading;

  const { me } = useGetMe();

  const { editNetworksRole, createNetworksRole, deleteNetworksRole } = getRoles(
    me?.roles || []
  );

  const selectedNetwork = search.get("selectedNetwork");

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
            dateFilters={sortabledDateFileds.map((key) => ({
              key,
              value: [
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
              ],
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button size={"sm"} onClick={() => networksRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(networksRefething ? "animate-rotate" : "")}
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
          total: networks ? Math.ceil(networks.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : networksError
                  ? formatErrorMessage(networksError)
                  : "No Data found"
              }
              type={networksError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                networksRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={networks?.networks || []}
        onRowClick={() => {}}
        columns={[
          {
            header: "Created",
            accessorKey: "created",
            cell: (record) =>
              format(record?.row?.original?.created, DATE_TIME_FORMAT),
          },
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Utility Code",
            accessorKey: "utilitycode",
          },
          {
            header: "Cash",
            accessorKey: "cash",
          },
          {
            header: "Fee",
            accessorKey: "fee",
          },
          {
            header: "Operator",
            accessorKey: "operator",
          },
          {
            header: "Status",
            accessorKey: "status",
          },

          {
            header: "Description",
            accessorKey: "description",
          },
          ...(editNetworksRole
            ? [
                {
                  header: "Action",
                  size: 100,
                  cell: (record: CellContext<Network, unknown>) => {
                    return (
                      <div className="flex gap-3 max-w-[100px]">
                        <button
                          className="px-2 py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            search.set(
                              "selectedNetwork",
                              record.row.original.id
                            );
                            setSearch(search);
                          }}
                        >
                          <Edit2Icon size={15} />
                        </button>
                        {deleteNetworksRole && (
                          <button
                            className="px-2 py-2 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              setNetworkToDelete(record?.row?.original?.id);
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    );
                  },
                  meta: {
                    className: "sticky right-0",
                  },
                },
              ]
            : []),
        ]}
      />
      <SideSheet
        open={
          !!(
            (selectedNetwork === "new" && createNetworksRole) ||
            (selectedNetwork && selectedNetwork !== "new" && editNetworksRole)
          )
        }
        close={() => {
          search.delete("selectedNetwork");
          setSearch(search);
        }}
        title={selectedNetwork === "new" ? "Create Network" : "Edit Network"}
      >
        {selectedNetwork && selectedNetwork === "new" && (
          <CreateEditNetworkForm
            id={selectedNetwork !== "new" ? selectedNetwork : ""}
            cb={(shouldRefetch) => {
              if (shouldRefetch) {
                networksRefetch();
              }
              search.delete("selectedNetwork");
              setSearch(search);
            }}
          />
        )}
        {selectedNetwork && selectedNetwork !== "new" && (
          <NetworkItem
            id={selectedNetwork !== "new" ? selectedNetwork : ""}
            cb={(shouldRefetch) => {
              if (shouldRefetch) {
                networksRefetch();
              }
              search.delete("selectedNetwork");
              setSearch(search);
            }}
          />
        )}
      </SideSheet>
      {deleteNetworksRole && (
        <DeleteObjective
          id={networkToDelete}
          name={
            networks?.networks?.find((unit) => unit?.id === networkToDelete)
              ?.name || ""
          }
          cb={(deleted) => {
            if (deleted) {
              networksRefetch();
            }
            setNetworkToDelete("");
          }}
        />
      )}
    </div>
  );
};

export default Page;
