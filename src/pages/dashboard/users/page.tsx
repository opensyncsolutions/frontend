import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { EyeIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { cn } from "@/lib/utils";
import TableFilters from "@/components/table-filters";
import { useUsers } from "@/shared/services/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateUser from "./create-user";
import User from "./user";
import { useSearchParams } from "react-router-dom";

const searchableFields = ["name", "username"];

const Page = () => {
  const [search, setSearch] = useSearchParams();
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const { users, usersError, usersLoading, usersRefetch, usersRefething } =
    useUsers({
      paginate: { page, pageSize },
      ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
        ? {
            filter: filters
              .map((filter) => {
                if (filter?.value?.[0]?.length) {
                  if (searchableFields.includes(filter?.key)) {
                    return `${filter?.key}:ilike:${filter?.value?.[0]}`;
                  }
                }
              })
              .filter((item) => item !== undefined)
              .join(","),
          }
        : {}),
    });

  const loading = usersLoading || isLoading;

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
            defaultFilters={filters}
            onFiltersSubmit={(filters) => setFilters(filters)}
          />
          <Button size={"sm"} onClick={() => usersRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(usersRefething ? "animate-rotate" : "")}
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
          total: users ? Math.ceil(users.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : usersError
                  ? formatErrorMessage(usersError)
                  : "No Data found"
              }
              type={usersError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                usersRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={users?.users || []}
        onRowClick={() => {}}
        columns={[
          {
            header: "Dp",
            cell: (record) => {
              return (
                <Avatar className="h-6 w-6">
                  <AvatarImage src={record?.row?.original?.dp} />
                  <AvatarFallback>
                    {record?.row?.original?.username
                      ?.substring(0, 2)
                      ?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              );
            },
          },
          { header: "Name", accessorKey: "name" },
          {
            header: "Username",
            accessorKey: "username",
          },
          {
            header: "Active",
            accessorKey: "active",
            cell: (record) => (record?.row?.original?.active ? "Yes" : "No"),
          },
          {
            header: "Roles",
            accessorKey: "roles",
            cell: (record) =>
              formatStringArray(
                record?.row?.original?.roles?.map((role) => {
                  return role?.name;
                }) || [],
                3
              ),
          },
          {
            header: "Action",
            size: 100,
            cell: (record) => {
              return (
                <div className="flex justify-between gap-3 max-w-[100px]">
                  <button
                    className="px-2 py-2"
                    onClick={() => {
                      if (search.get("selected")) {
                        search.delete("selected");
                      }
                      search.append("selected", record?.row?.original?.id);
                      setSearch(search);
                    }}
                  >
                    <EyeIcon size={15} />
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
      <CreateUser
        open={search.get("selected") === "new"}
        close={() => {
          if (search.get("selected")) search.delete("selected");
          setSearch(search);
        }}
        refetch={() => usersRefetch()}
      />
      <User
        selected={
          search.get("selected") && search.get("selected") !== "new"
            ? search.get("selected")
            : ""
        }
        close={() => {
          if (search.get("selected")) search.delete("selected");
          setSearch(search);
        }}
        refetch={() => usersRefetch()}
      />
    </div>
  );
};

const formatStringArray = (strings: string[], n: number): string => {
  if (strings.length <= n) {
    return strings.join(", ");
  } else {
    const firstN = strings.slice(0, n).join(", ");
    return `${firstN}, + ${strings.length - n} more`;
  }
};

export default Page;
