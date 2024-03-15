import TableFilters from "@/components/table-filters";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import Error from "@/pages/error";
import { usePrivileges } from "@/shared/services/roles-privileges";
import { formatErrorMessage } from "@/shared/utils/helpers";
import {
  Edit2Icon,
  EyeIcon,
  PlusIcon,
  RefreshCcw,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateEditPrivilege from "./create-edit-privilege";
import DeletePrivilege from "./delete-privilege";

const searchableFields = ["name", "value"];

const selectedPrivilegeToEdit = "selectedPrivilegeToEdit";

const Privileges = () => {
  const [search, setSearch] = useSearchParams();
  const [privilegeToDelete, setPrivilegeToDelete] = useState("");
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const {
    privileges,
    privilegesLoading,
    privilegesRefetch,
    privilegesRefething,
    privilegesError,
  } = usePrivileges({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (searchableFields.includes(filter?.key)) {
                return `${filter?.key}:ilike:${filter?.value?.[0]}`;
              }
            })
            .filter((item) => item !== undefined)
            .join(","),
        }
      : {}),
  });

  const loading = privilegesLoading || isLoading;
  return (
    <div className="space-y-5">
      <div className="flex justify-between ">
        <h3 className="font-bold text-xl">Privileges</h3>
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
            title="Filter Roles Table"
            search={searchableFields.map((key) => ({
              key,
              placeholder: "Search " + key,
              value:
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
            }))}
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button
            size={"sm"}
            onClick={() => privilegesRefetch()}
            variant={"secondary"}
          >
            <RefreshCcw
              size={15}
              className={cn(privilegesRefething ? "animate-rotate" : "")}
            />
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              if (search.get(selectedPrivilegeToEdit)) {
                search.delete(selectedPrivilegeToEdit);
              }
              search.append(selectedPrivilegeToEdit, "new");
              setSearch(search);
            }}
          >
            <PlusIcon size={15} />
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
          total: privileges ? Math.ceil(privileges.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : privilegesError
                  ? formatErrorMessage(privilegesError)
                  : "No Data found"
              }
              type={privilegesError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                privilegesRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={privileges?.privileges || []}
        onRowClick={() => {}}
        columns={[
          { header: "Name", accessorKey: "name" },
          { header: "Value", accessorKey: "value" },
          {
            header: "System",
            accessorKey: "system",
            cell: (record) => {
              return record?.row?.original.system ? "Yes" : "No";
            },
          },
          {
            header: "Action",
            size: 100,
            cell: (record) => {
              return (
                <div className="flex justify-between gap-3 max-w-[100px]">
                  <button className="px-2 py-2">
                    <EyeIcon size={15} />
                  </button>
                  {!record?.row?.original.system && (
                    <button
                      className="px-2 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        if (search.get(selectedPrivilegeToEdit)) {
                          search.delete(selectedPrivilegeToEdit);
                        }
                        search.append(
                          selectedPrivilegeToEdit,
                          record?.row?.original?.id
                        );
                        setSearch(search);
                      }}
                    >
                      <Edit2Icon size={15} />
                    </button>
                  )}
                  {!record?.row?.original.system && (
                    <button
                      className="px-2 py-2 text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        setPrivilegeToDelete(record?.row?.original?.id);
                      }}
                    >
                      <Trash2Icon size={15} />
                    </button>
                  )}
                </div>
              );
            },
            meta: {
              className: "sticky right-0",
            },
          },
        ]}
      />
      <CreateEditPrivilege
        selected={search.get(selectedPrivilegeToEdit)}
        close={() => {
          if (search.get(selectedPrivilegeToEdit))
            search.delete(selectedPrivilegeToEdit);
          setSearch(search);
        }}
        refetch={() => privilegesRefetch()}
      />
      <DeletePrivilege
        id={privilegeToDelete || ""}
        cb={(refetch) => {
          if (refetch) privilegesRefetch();
          setPrivilegeToDelete("");
        }}
      />
    </div>
  );
};

export default Privileges;
