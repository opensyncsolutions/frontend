import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteForm } from "@/shared/services/forms";

const DeleteForm = ({
  id,
  name,
  cb,
}: {
  id: string;
  name: string;
  cb: (refetch?: boolean) => void;
}) => {
  const { deleteForm, deleteFormLoading } = useDeleteForm(id, () => cb(true));

  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title={`Delete ${name}`}
      description="Are you sure you want to delete this form? This action is irreversible"
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteFormLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteFormLoading}
            onClick={() => deleteForm()}
          >
            {deleteFormLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteForm;
