import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFields } from "@/shared/services/fields";
import { useCreatePhone, useEditPhone } from "@/shared/services/phones";
import Error from "@/pages/error";
import {
  capitalizeFirstLetter,
  formatErrorMessage,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import Loader from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Switch } from "@/components/ui/switch";

const CreateEditPhone = ({
  cb,
  enrollment,
  phone,
}: {
  phone?: Phone;
  enrollment: string;
  cb: (deleted?: boolean) => void;
}) => {
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("phones");

  const [isLoading, setLoading] = useState(false);

  const { createPhone, createPhoneLoading } = useCreatePhone(() => cb(true));

  const { editPhone, editPhoneLoading } = useEditPhone(phone?.id || "", () =>
    cb(true)
  );

  const loading = createPhoneLoading || editPhoneLoading;

  const formSchema = z.object({
    name: z.string().optional(),
    phone: z.string({ required_error: "You must provide a phone" }),
    personal: z.boolean(),
    mobileMoneyAccount: z.boolean(),
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
      name: phone?.name || "",
      phone: phone?.phone || "",
      personal: phone?.personal,
      mobileMoneyAccount: phone?.mobileMoneyAccount,
    },
  });

  watch("phone");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!phone?.id) {
      return createPhone({
        ...values,
        enrollment: {
          id: enrollment,
        },
      });
    }
    return editPhone(values);
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
            if (
              (type === "TEXT" || type === "NUMBER") &&
              name !== "code" &&
              name !== "phone"
            ) {
              return (
                <Controller
                  key={name}
                  name={name as any}
                  control={control}
                  render={({ field }) => (
                    <Input
                      key={name}
                      label={capitalizeFirstLetter(
                        separateTextOnCapitalLetter(name)
                      )}
                      placeholder={`Enter ${separateTextOnCapitalLetter(
                        field?.name
                      )}`}
                      disabled={loading}
                      {...field}
                      error={errors?.[name as "name"]?.message || ""}
                      onInput={
                        type === "NUMBER"
                          ? (e) => {
                              e.currentTarget.value =
                                e.currentTarget.value.replace(/\D/g, "");
                            }
                          : undefined
                      }
                    />
                  )}
                />
              );
            }

            if (name === "phone") {
              return (
                <Controller
                  key={name}
                  name={name as any}
                  control={control}
                  render={({ field }) => {
                    return (
                      <PhoneInput
                        label={{
                          text: capitalizeFirstLetter(
                            separateTextOnCapitalLetter(name)
                          ),
                        }}
                        placeholder={`+255 `}
                        {...field}
                        error={errors?.[name as "phone"]?.message || ""}
                      />
                    );
                  }}
                />
              );
            }

            if (type === "BOOLEAN") {
              return (
                <Controller
                  key={name}
                  name={name as any}
                  control={control}
                  render={({ field }) => {
                    return (
                      <span className="inline-flex items-center gap-4">
                        <Switch
                          {...field}
                          checked={field?.value}
                          onCheckedChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                        {capitalizeFirstLetter(
                          separateTextOnCapitalLetter(name)
                        )}
                      </span>
                    );
                  }}
                />
              );
            }

            return null;
          })}
      </div>

      <div className="flex justify-end">
        <Button disabled={!getValues("phone") || loading}>
          {loading ? "Please Wait" : !phone?.id ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditPhone;
