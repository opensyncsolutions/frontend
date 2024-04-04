import TableFilters from "@/components/table-filters";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import SideSheet from "@/components/ui/side-sheet";
import { cn } from "@/lib/utils";
import Error from "@/pages/error";
import { DATE_FORMAT } from "@/shared/constants/constants";
import { useGetMe } from "@/shared/services/auth";
import { useObjectives } from "@/shared/services/objectives";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit2Icon, RefreshCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateEditObjectiveForm from "./create-edit-objective-form";
import Objective from "./objective";
import BottomSheet from "@/components/ui/bottom-sheet";
import OrganisationUnits from "./organisation-units";
import DeleteObjective from "./delete-objective";

const searchableFields: string[] = ["name", "organisationUnit"];
const sortabledDateFileds = ["created"];

const Page = () => {
  const [search, setSearch] = useSearchParams();
  const [objectiveToDelete, setObjectiveToDelete] = useState("");
  const [selectedObjectiveForUnits, setSelectedObjectiveForUnits] =
    useState("");
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
    objectives,
    objectivesLoading,
    objectivesError,
    objectivesRefetch,
    objectivesRefething,
  } = useObjectives({
    paginate: { page, pageSize },
    ...(filters?.find((filter) => filter?.value?.length && filter?.value?.[0])
      ? {
          filter: filters
            .map((filter) => {
              if (filter?.value?.[0]?.length) {
                if (filter?.key === "organisationUnit") {
                  return `organisationUnits.name:ilike:${filter?.value?.[0]}`;
                }
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

  const loading = objectivesLoading || isLoading;

  const { me } = useGetMe();

  const { editObjectivesRole, createObjectivesRole, deleteObjectivesRole } =
    getRoles(me?.roles || []);

  const selectedObjective = search.get("selectedObjective");

  const objective = objectives?.objectives?.find(
    (objective) => objective?.id === selectedObjectiveForUnits
  );

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
          <Button size={"sm"} onClick={() => objectivesRefetch()}>
            <RefreshCcw
              size={15}
              className={cn(objectivesRefething ? "animate-rotate" : "")}
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
          total: objectives ? Math.ceil(objectives.total / pageSize) : 1,
        }}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : objectivesError
                  ? formatErrorMessage(objectivesError)
                  : "No Data found"
              }
              type={objectivesError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                objectivesRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={objectives?.objectives || []}
        onRowClick={() => {}}
        columns={[
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Created",
            accessorKey: "created",
            cell: (record) =>
              format(record?.row?.original?.created, DATE_FORMAT),
          },
          {
            header: "Organisation Units",
            accessorKey: "organisationUnits",
            cell: (record) => (
              <button
                onClick={() => {
                  setSelectedObjectiveForUnits(record?.row?.original?.id);
                }}
              >
                View {record?.row?.original?.organisationUnits?.length} Units
              </button>
            ),
          },
          {
            header: "Description",
            accessorKey: "description",
          },
          ...(editObjectivesRole
            ? [
                {
                  header: "Action",
                  size: 100,
                  cell: (record: CellContext<Objective, unknown>) => {
                    return (
                      <div className="flex gap-3 max-w-[100px]">
                        <button
                          className="px-2 py-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.nativeEvent.stopImmediatePropagation();
                            search.set(
                              "selectedObjective",
                              record.row.original.id
                            );
                            setSearch(search);
                          }}
                        >
                          <Edit2Icon size={15} />
                        </button>
                        {deleteObjectivesRole && (
                          <button
                            className="px-2 py-2 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              setObjectiveToDelete(record?.row?.original?.id);
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
            (selectedObjective === "new" && createObjectivesRole) ||
            (selectedObjective &&
              selectedObjective !== "new" &&
              editObjectivesRole)
          )
        }
        close={() => {
          search.delete("selectedObjective");
          setSearch(search);
        }}
        title={
          selectedObjective === "new" ? "Create Objective" : "Edit Objective"
        }
      >
        {selectedObjective && selectedObjective === "new" && (
          <CreateEditObjectiveForm
            id={selectedObjective !== "new" ? selectedObjective : ""}
            cb={(shouldRefetch) => {
              if (shouldRefetch) {
                objectivesRefetch();
              }
              search.delete("selectedObjective");
              setSearch(search);
            }}
          />
        )}
        {selectedObjective && selectedObjective !== "new" && (
          <Objective
            id={selectedObjective !== "new" ? selectedObjective : ""}
            cb={(shouldRefetch) => {
              if (shouldRefetch) {
                objectivesRefetch();
              }
              search.delete("selectedObjective");
              setSearch(search);
            }}
          />
        )}
      </SideSheet>
      <BottomSheet
        open={!!objective}
        close={() => {
          setSelectedObjectiveForUnits("");
        }}
        title="Organisation Units"
      >
        {objective && <OrganisationUnits objective={objective} />}
      </BottomSheet>
      {deleteObjectivesRole && (
        <DeleteObjective
          id={objectiveToDelete}
          name={
            objectives?.objectives?.find(
              (unit) => unit?.id === objectiveToDelete
            )?.name || ""
          }
          cb={(deleted) => {
            if (deleted) {
              objectivesRefetch();
            }
            setObjectiveToDelete("");
          }}
        />
      )}
    </div>
  );
};

export default Page;
