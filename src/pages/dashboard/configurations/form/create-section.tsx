import SideSheet from "@/components/ui/side-sheet";
import CreateEditSectionForm from "./create-edit-section-form";

const CreateSection = ({
  open,
  form,
  highestSortOrder,
  close,
  refetch,
}: {
  open: boolean;
  form: string;
  close: () => void;
  refetch: () => void;
  highestSortOrder: number;
}) => {
  return (
    <SideSheet open={open} close={close} title="Create New Section">
      <CreateEditSectionForm
        cb={(created) => {
          if (created) {
            refetch();
          }
          close();
        }}
        id=""
        form={form}
        highestSortOrder={highestSortOrder}
      />
    </SideSheet>
  );
};

export default CreateSection;
