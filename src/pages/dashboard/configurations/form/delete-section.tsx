import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteSection } from "@/shared/services/sections";

const DeleteSection = ({
  id,
  name,
  cb,
}: {
  id: string;
  name: string;
  cb: (refetch?: boolean) => void;
}) => {
  const { deleteSection, deleteSectionLoading } = useDeleteSection(id, () =>
    cb(true)
  );
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title={`Delete ${name}`}
      description="Are you sure you want to delete this section? This action is irreversible"
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteSectionLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteSectionLoading}
            onClick={() => deleteSection()}
          >
            {deleteSectionLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteSection;
