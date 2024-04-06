import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeletePhone } from "@/shared/services/phones";

const DeletePhone = ({
  id,
  name,
  cb,
}: {
  id: string;
  name: string;
  cb: (deleted?: boolean) => void;
}) => {
  const { deletePhone, deletePhoneLoading } = useDeletePhone(id, () =>
    cb(true)
  );
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title={`Delete ${name}`}
      description={`Are you sure you want to delete this phone? This action is irreversible`}
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deletePhoneLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deletePhoneLoading}
            onClick={() => deletePhone()}
          >
            {deletePhoneLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeletePhone;
