import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteMenu } from "@/shared/services/menus";

const DeleteMenu = ({
  id,
  cb,
}: {
  id: string;
  cb: (refetch?: boolean) => void;
}) => {
  const { deleteMenu, deleteMenuLoading } = useDeleteMenu(id, () => cb(true));
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title="Delete Menu"
      description="Are you sure you want to delete this menu? This action is irreversible"
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteMenuLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteMenuLoading}
            onClick={() => deleteMenu()}
          >
            {deleteMenuLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteMenu;
