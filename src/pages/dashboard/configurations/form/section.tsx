import SideSheet from "@/components/ui/side-sheet";
import CreateEditSectionForm from "./create-edit-section-form";
import { useSection } from "@/shared/services/sections";
import { useState } from "react";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";

const Section = ({
  id,
  form,
  close,
  refetch,
}: {
  id: string;
  form: string;
  close: () => void;
  refetch: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);
  const { section, sectionError, sectionLoading, sectionRefetch } =
    useSection(id);
  const loading = isLoading || sectionLoading;

  return (
    <SideSheet open={!!id} close={close} title="Edit Section">
      {loading && (
        <div className="flex justify-center items-center h-24 w-full">
          <Loader />
        </div>
      )}
      {sectionError && (
        <Error
          message={formatErrorMessage(sectionError)}
          refetch={() => {
            setLoading(true);
            sectionRefetch().finally(() => {
              setLoading(false);
            });
          }}
        />
      )}
      {section && !loading && (
        <CreateEditSectionForm
          cb={(created) => {
            if (created) {
              refetch();
              sectionRefetch();
            }
            close();
          }}
          id={id}
          form={form}
        />
      )}
    </SideSheet>
  );
};

export default Section;
