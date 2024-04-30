import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFields } from "@/shared/services/fields";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import {
  capitalizeFirstLetter,
  formatErrorMessage,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useCreateNetwork,
  useEditNetwork,
  useNetwork,
} from "@/shared/services/networks";

const CreateEditNetworkForm = ({
  id,
  cb,
}: {
  id: string;
  cb?: (shouldRefetch?: boolean) => void;
}) => {
  const { network } = useNetwork(id);
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("networks");

  const [isLoading, setLoading] = useState(false);

  const { createNetwork, createNetworkLoading } = useCreateNetwork(() =>
    cb?.(true)
  );
  const { editNetwork, editNetworkLoading } = useEditNetwork(id, () =>
    cb?.(true)
  );

  const loading = createNetworkLoading || editNetworkLoading;

  const formSchema = z.object({
    name: z.string({ required_error: "You must provide a name" }),
    utilitycode: z.string({ required_error: "You must provide a utilitycode" }),
    status: z.string({ required_error: "You must provide a status" }),
    operator: z.string({ required_error: "You must provide an operator" }),
    cash: z.number({ required_error: "You must provide a cash" }),
    fee: z.number({ required_error: "You must provide a fee" }),
    code: z.string().optional(),
    description: z.string().optional(),
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: network?.name || "",
      description: network?.description || "",
      cash: network?.cash,
      code: network?.code || "",
      operator: network?.operator || "",
      status: network?.status || "",
      fee: network?.fee,
      utilitycode: network?.utilitycode,
    },
  });

  watch();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id) {
      return createNetwork({
        ...values,
      });
    }
    return editNetwork({
      ...values,
    });
  };

  if (fieldsLoading || isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  if (fieldsError) {
    return (
      <Error
        message={
          fieldsError ? formatErrorMessage(fieldsError) : "No fields found"
        }
        refetch={() => {
          setLoading(true);
          fieldsRefetch().finally(() => {
            setLoading(false);
          });
        }}
      />
    );
  }

  return (
    <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 rounded border p-3">
        <h3>Default</h3>
        {fields
          ?.sort((a, b) => a.sortOrder - b.sortOrder)
          ?.map(({ name, type }) => {
            if (type === "TEXT") {
              return (
                <Controller
                  key={name}
                  name={name as any}
                  control={control}
                  render={({ field }) => (
                    <Input
                      key={name}
                      label={capitalizeFirstLetter(
                        separateTextOnCapitalLetter(field?.name)
                      )}
                      placeholder={`Enter ${separateTextOnCapitalLetter(
                        field?.name
                      )}`}
                      disabled={loading}
                      {...field}
                      error={errors?.[name as "name"]?.message || ""}
                    />
                  )}
                />
              );
            }
            if (type === "NUMBER") {
              return (
                <Controller
                  key={name}
                  name={name as any}
                  control={control}
                  render={({ field }) => (
                    <Input
                      key={name}
                      label={capitalizeFirstLetter(
                        separateTextOnCapitalLetter(field?.name)
                      )}
                      placeholder={`Enter ${separateTextOnCapitalLetter(
                        field?.name
                      )}`}
                      disabled={loading}
                      {...field}
                      type={"number"}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                      error={errors?.[name as "name"]?.message || ""}
                    />
                  )}
                />
              );
            }
            return null;
          })}
      </div>

      <div className="flex justify-end">
        <Button
          disabled={
            !getValues("name") ||
            !getValues("cash") ||
            !getValues("status") ||
            !getValues("operator") ||
            !getValues("utilitycode") ||
            !getValues("fee") ||
            loading
          }
        >
          {loading ? "Please Wait" : !id ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditNetworkForm;
