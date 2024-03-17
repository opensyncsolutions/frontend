import SideSheet from "@/components/ui/side-sheet";
import CreateEditUserForm from "./create-edit-user-form";

const CreateUser = ({
  open,
  close,
  refetch,
}: {
  open: boolean;
  close: () => void;
  refetch: () => void;
}) => {
  return (
    <SideSheet open={open} close={close} title="New User">
      {open && (
        <CreateEditUserForm
          id="new"
          cb={() => {
            refetch();
            close();
          }}
        />
      )}
    </SideSheet>
  );
};

export default CreateUser;
