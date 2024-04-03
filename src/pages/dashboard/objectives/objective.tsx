import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { useObjective } from "@/shared/services/objectives";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { useState } from "react";
import CreateEditObjectiveForm from "./create-edit-objective-form";

const Objective = ({
  id,
  cb,
}: {
  id: string;
  cb?: (shouldRefetch?: boolean) => void;
}) => {
  const { objectiveError, objectiveLoading, objectiveRefetch } =
    useObjective(id);

  const [loading, setLoading] = useState(false);

  const isLoading = loading || objectiveLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (objectiveError) {
    return (
      <Error
        message={
          objectiveError
            ? formatErrorMessage(objectiveError)
            : "No objective found"
        }
        refetch={() => {
          setLoading(true);
          objectiveRefetch().finally(() => {
            setLoading(false);
          });
        }}
      />
    );
  }

  return (
    <CreateEditObjectiveForm
      id={id}
      cb={(shouldRefetch) => {
        objectiveRefetch();
        cb?.(shouldRefetch);
      }}
    />
  );
};

export default Objective;
