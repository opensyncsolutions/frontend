import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteUser } from "@/shared/services/users";

const DeleteUser = ({
  id,
  cb,
}: {
  id: string;
  cb: (refetch?: boolean) => void;
}) => {
  const { deleteUser, deleteUserLoading } = useDeleteUser(id, () => cb(true));
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title="Delete User"
      description="Are you sure you want to delete this user? This action is irreversible"
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteUserLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteUserLoading}
            onClick={() => deleteUser()}
          >
            {deleteUserLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteUser
