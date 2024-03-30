import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ErrorComponent from "@/pages/error";
import { useGetMe } from "@/shared/services/auth";
import { useMenus, useBulkyEditMenu } from "@/shared/services/menus";
import { compareArray, formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import { PlusIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CreateEditMenu from "./create-edit-menu";
import DragAndDropList from "@/components/dnd";
import MenuItem from "./menu-item";
import Loader from "@/components/ui/loader";
import { useTranslations } from "@/shared/hooks/use-translations";

const selectedMenuToEdit = "selectedMenuToEdit";

const Menu = () => {
  const { me } = useGetMe();
  const { createMenuRole, editMenuRole, deleteMenuRole } = getRoles(
    me?.roles || []
  );
  const { translate } = useTranslations();
  const [search, setSearch] = useSearchParams();
  const [isLoading, setLoading] = useState(false);
  const { menus, menusError, menusLoading, menusRefetch, menusRefetching } =
    useMenus();
  const loading = menusLoading || isLoading;

  const { updateBatch, updateBatchLoading } = useBulkyEditMenu(() =>
    menusRefetch()
  );

  return (
    <div className="space-y-5 h-fit">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl">{translate("Menus")}</h3>
        <div className="flex gap-3 items-center animate-fade-in">
          <Button
            size={"sm"}
            onClick={() => menusRefetch()}
            variant={"secondary"}
          >
            <RefreshCcw
              size={15}
              className={cn(
                menusRefetching || updateBatchLoading ? "animate-rotate" : ""
              )}
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
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {(menusError || !menus?.menus?.length) && !loading && (
        <ErrorComponent
          message={
            menusError ? formatErrorMessage(menusError) : "No Data found"
          }
          type={menusError ? "destructive" : "default"}
          retryText={menusError && !createMenuRole ? "Retry" : "Create"}
          refetch={() => {
            if (!menusError) {
              if (search.get(selectedMenuToEdit)) {
                search.delete(selectedMenuToEdit);
              }
              search.append(selectedMenuToEdit, "new");
              return setSearch(search);
            }
            setLoading(true);
            menusRefetch().finally(() => {
              setLoading(false);
            });
          }}
          className="max-h-48"
        />
      )}
      {menus?.menus?.length ? (
        <DragAndDropList
          data={
            menus?.menus
              ?.sort((a, b) => a.sortOrder - b.sortOrder)
              ?.map((menu) => ({
                id: menu?.id,
                content: (
                  <MenuItem
                    menu={menu}
                    key={menu?.id}
                    canDelete={!!deleteMenuRole}
                    canEdit={!!editMenuRole}
                    refetch={() => menusRefetch()}
                  />
                ),
              })) || []
          }
          onDataReordering={(data) => {
            const prevData = menus?.menus
              ?.sort((a, b) => a.sortOrder - b.sortOrder)
              .map((menu) => ({
                id: menu?.id,
              }));

            if (!compareArray(data, prevData)) {
              // @ts-ignore
              const newMenus: Menu[] = data?.map((menu, index) => {
                const menuItem = menus?.menus?.find(
                  (item) => item?.id === menu?.id
                );
                return {
                  ...menuItem,
                  id: menu.id,
                  sortOrder: index + 1,
                };
              });
              updateBatch(newMenus);
            }
          }}
          loading={updateBatchLoading || menusRefetching}
        />
      ) : null}

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
    </div>
  );
};

export default Menu;
