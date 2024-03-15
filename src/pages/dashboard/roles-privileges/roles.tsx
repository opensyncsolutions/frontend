import TableFilters from "@/components/table-filters";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import Error from "@/pages/error";
import { useRoles } from "@/shared/services/roles-privileges";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { Edit2Icon, EyeIcon, PlusIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateEditRole from "./create-edit-role";

const searchableFields = ["name", "privileges.value"];

const selectedRoleToEdit = "selectedRoleToEdit";

const Roles = () => {
  const [search, setSearch] = useSearchParams();
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
  const { roles, rolesLoading, rolesRefetch, rolesRefething, rolesError } =
    useRoles({
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

  const loading = rolesLoading || isLoading;
  return (
    <div className="space-y-5">
      <div className="flex justify-between ">
        <h3 className="font-bold text-xl">Roles</h3>
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
            onClick={() => rolesRefetch()}
            variant={"secondary"}
          >
            <RefreshCcw
              size={15}
              className={cn(rolesRefething ? "animate-rotate" : "")}
            />
          </Button>
          <Button
            size={"sm"}
            onClick={() => {
              if (search.get(selectedRoleToEdit)) {
                search.delete(selectedRoleToEdit);
              }
              search.append(selectedRoleToEdit, "new");
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
          total: roles ? Math.ceil(roles.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : rolesError
                  ? formatErrorMessage(rolesError)
                  : "No Data found"
              }
              type={rolesError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                rolesRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={roles?.roles || []}
        onRowClick={() => {}}
        columns={[
          { header: "Name", accessorKey: "name" },
          {
            header: "System",
            accessorKey: "system",
            cell: (record) => {
              return record?.row?.original.system ? "Yes" : "No";
            },
          },
          {
            header: "Privileges",
            accessorKey: "privileges",
            cell: (record) => {
              return (
                record?.row?.original.privileges
                  .map((privilege) => privilege?.value)
                  .join(", ") || "-"
              );
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
                        if (search.get(selectedRoleToEdit)) {
                          search.delete(selectedRoleToEdit);
                        }
                        search.append(
                          selectedRoleToEdit,
                          record?.row?.original?.id
                        );
                        setSearch(search);
                      }}
                    >
                      <Edit2Icon size={15} />
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
      <CreateEditRole
        selected={search.get(selectedRoleToEdit)}
        close={() => {
          if (search.get(selectedRoleToEdit)) search.delete(selectedRoleToEdit);
          setSearch(search);
        }}
        refetch={() => rolesRefetch()}
      />
    </div>
  );
};

export default Roles;