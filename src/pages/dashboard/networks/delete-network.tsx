import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteNetwork } from "@/shared/services/networks";

const DeleteNetwork = ({
  id,
  name,
  cb,
}: {
  id: string;
  name: string;
  cb: (deleted?: boolean) => void;
}) => {
  const { deleteNetwork, deleteNetworkLoading } = useDeleteNetwork(id, () =>
    cb(true)
  );
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title={`Delete ${name}`}
      description={`Are you sure you want to delete this network? This action is irreversible`}
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteNetworkLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteNetworkLoading}
            onClick={() => deleteNetwork()}
          >
            {deleteNetworkLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteNetwork;
