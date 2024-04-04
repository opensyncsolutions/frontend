import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteObjective } from "@/shared/services/objectives";

const DeleteObjective = ({
  id,
  name,
  cb,
}: {
  id: string;
  name: string;
  cb: (deleted?: boolean) => void;
}) => {
  const { deleteObjective, deleteObjectiveLoading } = useDeleteObjective(
    id,
    () => cb(true)
  );
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title={`Delete ${name}`}
      description={`Are you sure you want to delete this objective? This action is irreversible`}
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteObjectiveLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteObjectiveLoading}
            onClick={() => deleteObjective()}
          >
            {deleteObjectiveLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteObjective;
