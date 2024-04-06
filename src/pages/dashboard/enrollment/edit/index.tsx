import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { useForms } from "@/shared/services/forms";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import EditEnrollmentForm from "./edit-enrollment-form";

const EditEnrollment = ({ id }: { id: string }) => {
  const [search, setSearch] = useSearchParams();
  const { forms, formsError, formsLoading, formsRefetch } =
    useForms("ENROLLMENT");
  const [loading, setLoading] = useState(false);
  const isLoading = loading || formsLoading;

  if (isLoading) {
    return (
      <div className="h-12 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (formsError || forms?.forms?.length === 0) {
    return (
      <div className="p-8 flex justify-center items-center">
        <Error
          message={
            formsError
              ? formatErrorMessage(formsError)
              : "Enrollment form not found"
          }
          refetch={() => {
            if (formsError) {
              setLoading(true);
              formsRefetch().finally(() => {
                setLoading(false);
              });
            } else {
              search.delete("edit");
              setSearch(search);
            }
          }}
          retryText={formsError ? "Retry" : "Cancel"}
        />
      </div>
    );
  }

  return <EditEnrollmentForm id={id} />;
};

export default EditEnrollment;
