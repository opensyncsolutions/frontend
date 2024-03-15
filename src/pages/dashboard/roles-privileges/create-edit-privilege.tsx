import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "@/components/ui/loader";
import SideSheet from "@/components/ui/side-sheet";
import Error from "@/pages/error";
import {
  useCreatePrivilege,
  useEditPrivilege,
  usePrivilege,
} from "@/shared/services/roles-privileges";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string({ required_error: "You must provide a name" }),
  value: z.string({ required_error: "You must provide a value" }),
});

const CreateEditPrivilege = ({
  selected,
  close,
  refetch,
}: {
  selected: string | null;
  close: () => void;
  refetch: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);
  const onClose = () => {
    close();
  };

  const { privilege, privilegeLoading, privilegeError, privilegeRefetch } =
    usePrivilege({
      id: selected && selected !== "new" ? selected : "",
    });

  const loading = privilegeLoading || isLoading;

  return (
    <SideSheet open={!!selected} close={onClose}>
      {loading && (
        <div className="flex justify-center">
          <Loader size={150} />
        </div>
      )}
      {privilegeError && (
        <Error
          message={formatErrorMessage(privilegeError)}
          refetch={() => {
            setLoading(true);
            privilegeRefetch().finally(() => {
              setLoading(false);
            });
          }}
        />
      )}
      {((privilege && !privilege?.system) || selected === "new") && (
        <CreateEditForm
          id={selected || ""}
          cb={() => {
            refetch();
            privilegeRefetch();
            onClose();
          }}
        />
      )}
    </SideSheet>
  );
};

const CreateEditForm = ({ id, cb }: { id: string; cb: () => void }) => {
  const { privilege } = usePrivilege({
    id: id && id !== "new" ? id : "",
  });

  const { createPrivilege, createPrivilegeLoading } = useCreatePrivilege();

  const { editPrivilege, editPrivilegeLoading } = useEditPrivilege(id);

  const loading = createPrivilegeLoading || editPrivilegeLoading;

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: privilege?.name || "",
      value: privilege?.value || "",
    },
  });

  watch("name");
  watch("value");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (id === "new") {
      return createPrivilege(values).then(() => cb?.());
    }
    return editPrivilege(values).then(() => cb?.());
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Name"
            placeholder="Name"
            disabled={loading}
            {...field}
            error={errors.name?.message || ""}
          />
        )}
      />
      <Controller
        name="value"
        control={control}
        render={({ field }) => (
          <Input
            label="Value"
            placeholder="Value"
            disabled={loading}
            {...field}
            error={errors.name?.message || ""}
            onChange={(e) => {
              field.onChange(
                e.target.value.replace(new RegExp(" ", "g"), "_").toUpperCase()
              );
            }}
          />
        )}
      />
      <div className="flex justify-end">
        <Button disabled={!getValues("name") || !getValues("value") || loading}>
          {loading ? "Please Wait" : id === "new" ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditPrivilege;
