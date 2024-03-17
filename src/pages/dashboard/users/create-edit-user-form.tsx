import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRoles } from "@/shared/services/roles-privileges";
import { useCreateUser, useEditUser, useUser } from "@/shared/services/users";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import SelectInput from "@/components/ui/select-input";
import { Button } from "@/components/ui/button";

const CreateEditUserForm = ({ id, cb }: { id: string; cb: () => void }) => {
  const formSchema = z.object({
    name: z.string({ required_error: "You must provide a name" }),
    username: z.string({ required_error: "You must provide a name" }),
    email:
      id === "new"
        ? z.string({ required_error: "You must provide an email" }).email()
        : z.string().optional(),
    phoneNumber:
      id === "new"
        ? z.string({
            required_error: "You must provide a phone number",
          })
        : z.string().optional(),
    password:
      id === "new"
        ? z
            .string({ required_error: "You must provide a password" })
            .max(100, "Password must not exceed 100 characters")
            .regex(
              /[a-z]/,
              "Password must contain at least one lowercase letter"
            )
            .regex(
              /[A-Z]/,
              "Password must contain at least one uppercase letter"
            )
            .regex(/[0-9]/, "Password must contain at least one digit")
            .regex(
              /[^a-zA-Z0-9]/,
              "Password must contain at least one special character"
            )
            .min(8, { message: "Password must have atleast 8 characters" })
        : z.string().optional(),
    roles: z.array(
      z.object({
        id: z.string(),
      })
    ),
  });
  const { user } = useUser({
    id: id !== "new" ? id : "",
  });
  const { roles } = useRoles({
    paginate: {
      pageSize: 100,
      page: 1,
    },
    fields: ["id", "name"],
  });

  const { createUser, createUserLoading } = useCreateUser();
  const { editUser, editUserLoading } = useEditUser(id);

  const loading = createUserLoading || editUserLoading;

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      roles:
        user?.roles?.map((role) => {
          return { id: role?.id };
        }) || [],
    },
  });

  watch("name");
  watch("email");
  watch("username");
  watch("password");
  watch("username");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (id === "new") {
      return createUser(values).then(() => cb?.());
    }
    return editUser(values).then(() => cb?.());
  };

  return (
    <form className="space-y-3 mt-6" onSubmit={handleSubmit(onSubmit)}>
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
        name="username"
        control={control}
        render={({ field }) => (
          <Input
            label="Username"
            placeholder="Username"
            disabled={loading}
            {...field}
            error={errors.username?.message || ""}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="Email"
            placeholder="Email"
            disabled={loading}
            {...field}
            error={errors.email?.message || ""}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { value, onChange, name } }) => (
          <PhoneInput
            label={{
              text: "Phone Number",
            }}
            value={value}
            onChange={onChange}
            disabled={createUserLoading}
            name={name}
            error={errors.phoneNumber?.message || ""}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            label="Password"
            placeholder="Password"
            disabled={loading}
            {...field}
            error={errors.password?.message || ""}
          />
        )}
      />
      <Controller
        name="roles"
        control={control}
        render={({ field: { ref, ...field } }) => {
          return (
            <SelectInput
              label="Roles"
              placeholder="Roles"
              disabled={loading}
              isMulti
              options={
                roles?.roles?.map((role) => {
                  return {
                    label: role?.name,
                    value: role?.id,
                  };
                }) || []
              }
              {...field}
              value={
                field?.value?.map((item) => {
                  return {
                    value: item?.id,
                    label:
                      roles?.roles?.find((role) => role?.id === item?.id)
                        ?.name || "",
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
              error={errors.roles?.message || ""}
            />
          );
        }}
      />
      <div className="flex justify-end space-x-3">
        <Button disabled={loading} variant={"outline"} onClick={cb}>
          {"Cancel"}
        </Button>
        <Button
          disabled={!getValues("name") || !getValues("username") || loading}
        >
          {loading ? "Please Wait" : id === "new" ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditUserForm;
