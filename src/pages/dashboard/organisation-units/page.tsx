import { format } from "date-fns";
import { Edit2Icon, RefreshCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CellContext } from "@tanstack/react-table";

import TableFilters from "@/components/table-filters";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import Error from "@/pages/error";
import { DATE_FORMAT } from "@/shared/constants/constants";
import { useGetMe } from "@/shared/services/auth";
import { useOrganisationUnits } from "@/shared/services/organisation-units";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import SideSheet from "@/components/ui/side-sheet";
import CreateEditOrganisationUnit from "./create-edit-organisation-unit";
import DeleteOrganisationUnit from "./delete-organisation-unit";

const searchableFields: string[] = ["name", "shortName", "level"];
const filterableFields = ["active"];
const sortabledDateFileds = ["created"];

const activeOptions = [
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];

const Page = () => {
  const [search, setSearch] = useSearchParams();
  const [unitToDelete, setUnitToDelete] = useState("");
  const [filters, setFilters] = useState<Filter[]>([
    ...searchableFields.map((key) => ({
      key,
      value: [],
    })),
    ...filterableFields.map((key) => ({
      key,
      value: [],
    })),
    ...sortabledDateFileds.map((key) => ({
      key,
      value: [],
    })),
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setLoading] = useState(false);
  const {
    organisationUnits,
    organisationUnitsError,
    organisationUnitsLoading,
    organisationUnitsRefetch,
    organisationUnitsRefething,
  } = useOrganisationUnits({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (searchableFields.includes(filter?.key)) {
                  return `${filter?.key}:ilike:${filter?.value?.[0]}`;
                }
                if (filterableFields.includes(filter?.key)) {
                  return filter.value
                    .map((value) => `${filter?.key}:eq:${value}`)
                    .join(",");
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

  const { me } = useGetMe();

  const {
    editOrganisationUnitsRole,
    createOrganisationUnitsRole,
    deleteOrganisationUnitsRole,
  } = getRoles(me?.roles || []);

  const loading = organisationUnitsLoading || isLoading;

  const selectedUnit = organisationUnits?.organisationUnits?.find(
    (unit) => unit?.id === search.get("selectedUnit")
  );

  return (
    <div className="space-y-5">
      <div className="flex justify-end ">
        <div className="flex gap-3 items-center animate-fade-in">
          <TableFilters
            title="Filter Organisation Units Table"
            search={searchableFields.map((key) => ({
              key,
              placeholder: "Search " + key,
              value:
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
            }))}
            selectInputfilters={filterableFields.map((key) => ({
              key,
              placeholder: "Filter " + key,
              isMulti: true,
              options: key === "active" ? activeOptions : [],
              value: [
                filters.find((filter) => filter?.key === key)?.value?.[0] || "",
              ],
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
          <Button size={"sm"} onClick={() => organisationUnitsRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(organisationUnitsRefething ? "animate-rotate" : "")}
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
          total: organisationUnits
            ? Math.ceil(organisationUnits.total / pageSize)
            : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : organisationUnitsError
                  ? formatErrorMessage(organisationUnitsError)
                  : "No Data found"
              }
              type={organisationUnitsError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                organisationUnitsRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={organisationUnits?.organisationUnits || []}
        onRowClick={() => {}}
        columns={[
          {
            header: "Created",
            accessorKey: "created",
            cell: (record) =>
              format(record?.row?.original?.created, DATE_FORMAT),
          },
          { header: "Name", accessorKey: "name" },
          {
            header: "Short Name",
            accessorKey: "shortName",
          },
          {
            header: "Level",
            accessorKey: "level",
          },
          {
            header: "Active",
            accessorKey: "active",
            cell: (record) => (record?.row?.original?.active ? "YES" : "NO"),
          },
          {
            header: "Data",
            accessorKey: "data",
            cell: (record) => (record?.row?.original?.data ? "YES" : "NO"),
          },
          {
            header: "Opening Date",
            accessorKey: "openingDate",
            cell: (record) =>
              format(record?.row?.original?.openingDate, DATE_FORMAT),
          },
          {
            header: "Description",
            accessorKey: "description",
          },
          ...(editOrganisationUnitsRole
            ? [
                {
                  header: "Action",
                  size: 100,
                  cell: (record: CellContext<OrganisationUnit, unknown>) => {
                    return (
                      <div className="flex gap-3 max-w-[100px]">
                        <button
                          className="px-2 py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            search.set(
                              "selectedUnit",
                              record?.row?.original?.id
                            );
                            setSearch(search);
                          }}
                        >
                          <Edit2Icon size={15} />
                        </button>
                        {deleteOrganisationUnitsRole && (
                          <button
                            className="px-2 py-2 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              setUnitToDelete(record?.row?.original?.id);
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
      {createOrganisationUnitsRole && (
        <SideSheet
          open={search?.get("selectedUnit") === "new"}
          close={() => {
            search.delete("selectedUnit");
            setSearch(search);
          }}
          title="Create Organisation Unit"
        >
          {search?.get("selectedUnit") === "new" && (
            <CreateEditOrganisationUnit
              cb={(shouldRefetch) => {
                if (shouldRefetch) {
                  organisationUnitsRefetch();
                }
                search.delete("selectedUnit");
                setSearch(search);
              }}
            />
          )}
        </SideSheet>
      )}
      {editOrganisationUnitsRole && (
        <SideSheet
          open={!!selectedUnit}
          close={() => {
            search.delete("selectedUnit");
            setSearch(search);
          }}
          title="Edit Organisation Unit"
        >
          {selectedUnit && (
            <CreateEditOrganisationUnit
              organisationUnit={selectedUnit}
              cb={(shouldRefetch) => {
                if (shouldRefetch) {
                  organisationUnitsRefetch();
                }
                search.delete("selectedUnit");
                setSearch(search);
              }}
            />
          )}
        </SideSheet>
      )}
      {deleteOrganisationUnitsRole && (
        <DeleteOrganisationUnit
          id={unitToDelete}
          name={
            organisationUnits?.organisationUnits?.find(
              (unit) => unit?.id === unitToDelete
            )?.name || ""
          }
          cb={(deleted) => {
            if (deleted) {
              organisationUnitsRefetch();
            }
            setUnitToDelete("");
          }}
        />
      )}
    </div>
  );
};

export default Page;
