import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "@/components/ui/loader";
import SideSheet from "@/components/ui/side-sheet";
import Error from "@/pages/error";
import {
  useCreateRole,
  useEditRole,
  usePrivileges,
  useRole,
} from "@/shared/services/roles-privileges";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import { Button } from "@/components/ui/button";

const CreateEditRole = ({
  selected,
  close,
  refetch,
}: {
  selected: string | null;
  close: () => void;
  refetch: () => void;
}) => {
  const [isLoading, setLoading] = useState(false);

  const { role, roleLoading, roleError, roleRefetch } = useRole({
    id: selected && selected !== "new" ? selected : "",
  });

  const loading = roleLoading || isLoading;
  const onClose = () => {
    close();
  };
  return (
    <SideSheet open={!!selected} close={onClose}>
      {loading && (
        <div className="flex justify-center">
          <Loader size={150} />
        </div>
      )}
      {roleError && (
        <Error
          message={formatErrorMessage(roleError)}
          refetch={() => {
            setLoading(true);
            roleRefetch().finally(() => {
              setLoading(false);
            });
          }}
        />
      )}
      {(role || selected === "new") && (
        <CreateEditForm
          id={selected || ""}
          cb={() => {
            refetch();
            roleRefetch();
            onClose();
          }}
        />
      )}
    </SideSheet>
  );
};

const formSchema = z.object({
  name: z.string({ required_error: "You must provide a name" }),
  privileges: z
    .array(
      z.object({
        id: z.string(),
      })
    )
    .min(1),
});

const CreateEditForm = ({ id, cb }: { id: string; cb: () => void }) => {
  const { role } = useRole({
    id: id && id !== "new" ? id : "",
  });

  const { privileges } = usePrivileges({
    paginate: {
      pageSize: 150,
      page: 1,
    },
  });

  const { createRole, createRoleLoading } = useCreateRole();

  const { editRole, editRoleLoading } = useEditRole(id);

  const loading = createRoleLoading || editRoleLoading;

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role?.name || "",
      privileges:
        role?.privileges.map((privilege) => {
          return { id: privilege?.id };
        }) || [],
    },
  });

  watch("name");
  watch("privileges");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (id === "new") {
      return createRole(values).then(() => cb?.());
    }
    return editRole(values).then(() => cb?.());
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
        name="privileges"
        control={control}
        render={({ field: { ref, ...field } }) => {
          return (
            <SelectInput
              label="Value"
              placeholder="Privileges"
              disabled={loading}
              isMulti
              options={
                privileges?.privileges.map((privilege) => {
                  return {
                    label: privilege?.name,
                    value: privilege?.id,
                  };
                }) || []
              }
              {...field}
              value={
                field.value.map((item) => {
                  return {
                    value: item?.id,
                    label:
                      privileges?.privileges?.find(
                        (privilege) => privilege?.id === item?.id
                      )?.name || "",
                  };
                }) || []
              }
              onChange={(e) => {
                field?.onChange(
                  e.map((item: { value: string }) => ({
                    id: item?.value,
                  }))
                );
              }}
              error={errors.name?.message || ""}
            />
          );
        }}
      />
      <div className="flex justify-end">
        <Button
          disabled={
            !getValues("name") || !getValues("privileges")?.length || loading
          }
        >
          {loading ? "Please Wait" : id === "new" ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditRole;
