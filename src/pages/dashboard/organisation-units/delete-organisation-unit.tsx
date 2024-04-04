import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useDeleteOrganisationUnit } from "@/shared/services/organisation-units";

const DeleteOrganisationUnit = ({
  id,
  name,
  cb,
}: {
  id: string;
  name: string;
  cb: (deleted?: boolean) => void;
}) => {
  const { deleteOrganisationUnit, deleteOrganisationUnitLoading } =
    useDeleteOrganisationUnit(id, () => cb(true));
  return (
    <Modal
      open={!!id}
      close={() => cb()}
      title={`Delete ${name}`}
      description={`Are you sure you want to delete this unit? This action is irreversible`}
      footer={
        <div className="space-x-4">
          <Button
            variant={"outline"}
            onClick={() => cb()}
            disabled={deleteOrganisationUnitLoading}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            disabled={deleteOrganisationUnitLoading}
            onClick={() => deleteOrganisationUnit()}
          >
            {deleteOrganisationUnitLoading ? "Deleting" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
};

export default DeleteOrganisationUnit;
