import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import Error from "@/pages/error";
import { useGetMe } from "@/shared/services/auth";
import { useMenus } from "@/shared/services/menus";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import { CellContext } from "@tanstack/react-table";
import { Edit2Icon, PlusIcon, RefreshCcw, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DeleteMenu from "./delete-menu";
import CreateEditMenu from "./create-edit-menu";

const selectedMenuToEdit = "selectedMenuToEdit";

const Menu = () => {
  const { me } = useGetMe();
  const { createMenuRole, editMenuRole, deleteMenuRole } = getRoles(
    me?.roles || []
  );
  const [menuToDelete, setMenuToDelete] = useState("");
  const [search, setSearch] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const { menus, menusError, menusLoading, menusRefetch, menusRefetching } =
    useMenus();
  const loading = menusLoading || isLoading;

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl">Menus</h3>
        <div className="flex gap-3 items-center animate-fade-in">
          <Button
            size={"sm"}
            onClick={() => menusRefetch()}
            variant={"secondary"}
          >
            <RefreshCcw
              size={15}
              className={cn(menusRefetching ? "animate-rotate" : "")}
            />
          </Button>
          {createMenuRole && (
            <Button
              size={"sm"}
              onClick={() => {
                if (search.get(selectedMenuToEdit)) {
                  search.delete(selectedMenuToEdit);
                }
                search.append(selectedMenuToEdit, "new");
                setSearch(search);
              }}
            >
              <PlusIcon size={15} />
            </Button>
          )}
        </div>
      </div>
      <DataTable
        loading={loading}
        noDataMessage={
          loading ? undefined : (
            <Error
              message={
                loading
                  ? "Please wait"
                  : menusError
                  ? formatErrorMessage(menusError)
                  : "No Data found"
              }
              type={menusError ? "destructive" : "default"}
              refetch={() => {
                setLoading(true);
                menusRefetch().finally(() => {
                  setLoading(false);
                });
              }}
            />
          )
        }
        data={menus?.menus?.sort((a, b) => a.sortOrder - b.sortOrder) || []}
        onRowClick={() => {}}
        columns={[
          { header: "Name", accessorKey: "name" },
          { header: "Path", accessorKey: "path" },
          { header: "Display Name", accessorKey: "displayName" },
          { header: "Sort Order", accessorKey: "sortOrder" },
          ...(editMenuRole || deleteMenuRole
            ? [
                {
                  header: "Action",
                  size: 100,
                  cell: (record: CellContext<Menu, unknown>) => {
                    return (
                      <div className="flex justify-between gap-3 max-w-[100px]">
                        {editMenuRole && (
                          <button
                            className="px-2 py-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              if (search.get(selectedMenuToEdit)) {
                                search.delete(selectedMenuToEdit);
                              }
                              search.append(
                                selectedMenuToEdit,
                                record?.row?.original?.id
                              );
                              setSearch(search);
                            }}
                          >
                            <Edit2Icon size={15} />
                          </button>
                        )}
                        {deleteMenuRole && (
                          <button
                            className="px-2 py-2 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              setMenuToDelete(record?.row?.original?.id);
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
              ]
            : []),
        ]}
      />
      <CreateEditMenu
        selected={
          editMenuRole || createMenuRole ? search.get(selectedMenuToEdit) : ""
        }
        close={() => {
          if (search.get(selectedMenuToEdit)) search.delete(selectedMenuToEdit);
          setSearch(search);
        }}
        refetch={() => menusRefetch()}
      />
      <DeleteMenu
        id={deleteMenuRole ? menuToDelete || "" : ""}
        cb={(refetch) => {
          if (refetch) menusRefetch();
          setMenuToDelete("");
        }}
      />
    </div>
  );
};

export default Menu;
