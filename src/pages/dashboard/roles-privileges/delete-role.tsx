import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteRole } from "@/shared/services/roles-privileges";

const DeleteRole = ({
  id,
  cb,
}: {
  id: string;
  cb: (refetch?: boolean) => void;
}) => {
  const { deleteRole, deleteRoleLoading } = useDeleteRole(id, () => cb(true));
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title="Delete Role"
      description="Are you sure you want to delete this role? This action is irreversible"
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteRoleLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteRoleLoading}
            onClick={() => deleteRole()}
          >
            {deleteRoleLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteRole;
