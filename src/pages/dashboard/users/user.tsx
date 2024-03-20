import { useState } from "react";

import SideSheet from "@/components/ui/side-sheet";
import { useUser } from "@/shared/services/users";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import CreateEditUserForm from "./create-edit-user-form";
import { Button } from "@/components/ui/button";
import DeleteUser from "./delete-user";
import UserDetails from "./user-details";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";

const User = ({
  selected,
  close,
  refetch,
}: {
  selected: string | null;
  close: () => void;
  refetch: () => void;
}) => {
  const { me } = useGetMe();
  const { editUsersRole, deleteUsersRole } = getRoles(me?.roles || []);
  const [isLoading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  const { user, userLoading, userError, userRefetch } = useUser({
    id: selected || "",
  });
  const loading = userLoading || isLoading;

  const onClose = () => {
    setDeleteUser(false);
    setEdit(false);
    close();
  };
  return (
    <SideSheet open={!!selected} close={onClose} title={user?.name}>
      {loading && (
        <div className="flex justify-center">
          <Loader size={150} />
        </div>
      )}
      {userError && (
        <Error
          message={formatErrorMessage(userError)}
          refetch={() => {
            setLoading(true);
            userRefetch().finally(() => {
              setLoading(false);
            });
          }}
        />
      )}
      {!edit && user && <UserDetails id={selected || ""} />}
      {edit && (
        <CreateEditUserForm
          id={selected || ""}
          cb={() => {
            userRefetch();
            refetch();
            setEdit(false);
          }}
        />
      )}
      {!edit && user && (
        <div className="space-x-3 text-right">
          <Button variant={"outline"} onClick={onClose}>
            Close
          </Button>
          {editUsersRole && <Button onClick={() => setEdit(true)}>Edit</Button>}
          {!user?.roles?.find((role) => role?.name === "Super User") &&
            deleteUsersRole && (
              <Button
                variant={"destructive"}
                onClick={() => setDeleteUser(true)}
              >
                Delete
              </Button>
            )}
        </div>
      )}
      <DeleteUser
        id={deleteUser ? selected || "" : ""}
        cb={() => {
          refetch();
          onClose();
        }}
      />
    </SideSheet>
  );
};

export default User;
