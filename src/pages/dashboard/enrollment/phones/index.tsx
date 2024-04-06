import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useGetMe } from "@/shared/services/auth";
import { useEnrollement } from "@/shared/services/enrollments";
import { getRoles } from "@/shared/utils/roles";
import { CellContext } from "@tanstack/react-table";
import { format } from "date-fns";
import { Edit2Icon, Trash2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DeletePhone from "./delete-phone";
import SideSheet from "@/components/ui/side-sheet";
import CreateEditPhone from "./create-edit-phone";

const Phones = ({ id }: { id: string }) => {
  const [search, setSearch] = useSearchParams();
  const [phoneToDelete, setPhoneToDelete] = useState("");
  const { enrollment, enrollmentRefetch } = useEnrollement(id);
  const { me } = useGetMe();
  const { editPhoneRole, deletePhoneRole, createPhoneRole } = getRoles(
    me?.roles || []
  );
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4 items-center">
        <h3 className="font-bold">Phones</h3>
        {createPhoneRole && (
          <Button
            variant={"outline"}
            size={"sm"}
            onClick={() => {
              search.set("selectedPhone", "new");
              setSearch(search);
            }}
          >
            Add Phone
          </Button>
        )}
      </div>
      <DataTable
        data={enrollment?.phones || []}
        columns={[
          {
            header: "Created",
            accessorKey: "created",
            cell(record) {
              return format(record.row.original.created, DATE_TIME_FORMAT);
            },
          },
          {
            header: "Phone",
            accessorKey: "phone",
          },
          {
            header: "Name",
            accessorKey: "name",
          },
          {
            header: "Personal",
            accessorKey: "personal",
            cell: (record) => (record?.row?.original?.personal ? "YES" : "NO"),
          },
          {
            header: "Mobile Money Account",
            accessorKey: "mobileMoneyAccount",
            cell: (record) =>
              record?.row?.original?.mobileMoneyAccount ? "YES" : "NO",
          },
          ...(editPhoneRole || deletePhoneRole
            ? [
                {
                  header: "Action",
                  size: 100,
                  cell: (record: CellContext<Phone, unknown>) => {
                    return (
                      <div className="flex gap-3 max-w-[100px]">
                        {editPhoneRole && (
                          <button
                            className="px-2 py-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              search.set(
                                "selectedPhone",
                                record?.row?.original?.id
                              );
                              setSearch(search);
                            }}
                          >
                            <Edit2Icon size={15} />
                          </button>
                        )}
                        {deletePhoneRole && (
                          <button
                            className="px-2 py-2 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.nativeEvent.stopImmediatePropagation();
                              setPhoneToDelete(record?.row?.original?.id);
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
      {deletePhoneRole && (
        <DeletePhone
          id={phoneToDelete}
          name={
            enrollment?.phones?.find((phone) => phone?.id === phoneToDelete)
              ?.phone || ""
          }
          cb={(shouldRefetch) => {
            if (shouldRefetch) {
              enrollmentRefetch();
            }
            setPhoneToDelete("");
          }}
        />
      )}
      {createPhoneRole && enrollment && (
        <SideSheet
          open={search.get("selectedPhone") === "new"}
          close={() => {
            search.delete("selectedPhone");
            setSearch(search);
          }}
          title="Create Phone"
        >
          {search.get("selectedPhone") === "new" && (
            <CreateEditPhone
              enrollment={enrollment?.id}
              cb={(shouldRefetch) => {
                if (shouldRefetch) {
                  enrollmentRefetch();
                }
                search.delete("selectedPhone");
                setSearch(search);
              }}
            />
          )}
        </SideSheet>
      )}
      {editPhoneRole && (
        <SideSheet
          open={
            !!enrollment?.phones?.find(
              (phone) => phone?.id === search?.get("selectedPhone")
            )
          }
          close={() => {
            search.delete("selectedPhone");
            setSearch(search);
          }}
          title="Edit Phone"
        >
          {enrollment?.phones?.find(
            (phone) => phone?.id === search?.get("selectedPhone")
          ) && (
            <CreateEditPhone
              phone={enrollment?.phones?.find(
                (phone) => phone?.id === search?.get("selectedPhone")
              )}
              enrollment={enrollment?.id}
              cb={(shouldRefetch) => {
                if (shouldRefetch) {
                  enrollmentRefetch();
                }
                search.delete("selectedPhone");
                setSearch(search);
              }}
            />
          )}
        </SideSheet>
      )}
    </div>
  );
};

export default Phones;
