import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { useState } from "react";
import CreateEditNetworkForm from "./create-edit-network-form";
import { useNetwork } from "@/shared/services/networks";

const Objective = ({
  id,
  cb,
}: {
  id: string;
  cb?: (shouldRefetch?: boolean) => void;
}) => {
  const { networkError, networkLoading, networkRefetch } = useNetwork(id);

  const [loading, setLoading] = useState(false);

  const isLoading = loading || networkLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (networkError) {
    return (
      <Error
        message={
          networkError ? formatErrorMessage(networkError) : "No objective found"
        }
        refetch={() => {
          setLoading(true);
          networkRefetch().finally(() => {
            setLoading(false);
          });
        }}
      />
    );
  }

  return (
    <CreateEditNetworkForm
      id={id}
      cb={(shouldRefetch) => {
        networkRefetch();
        cb?.(shouldRefetch);
      }}
    />
  );
};

export default Objective;
