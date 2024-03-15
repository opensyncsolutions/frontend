import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeletePrivilege } from "@/shared/services/roles-privileges";

const DeletePrivilege = ({
  id,
  cb,
}: {
  id: string;
  cb: (refetch?: boolean) => void;
}) => {
  const { deletePrivilege, deletePrivilegeLoading } = useDeletePrivilege(
    id,
    () => cb(true)
  );
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title="Delete Privilege"
      description="Are you sure you want to delete this privilege? This action is irreversible"
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deletePrivilegeLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deletePrivilegeLoading}
            onClick={() => deletePrivilege()}
          >
            {deletePrivilegeLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeletePrivilege;
