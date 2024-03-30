import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import SideSheet from "@/components/ui/side-sheet";
import { useEditField, useFields } from "@/shared/services/fields";
import { languages } from "@/shared/constants/constants";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import {
  capitalizeFirstLetter,
  formatErrorMessage,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectInput from "@/components/ui/select-input";

const EditField = ({
  field,
  close,
}: {
  field?: Field;
  close: (shouldRefetch?: boolean) => void;
}) => {
  return (
    <SideSheet
      open={!!(field?.name || field?.id)}
      close={close}
      title={"Edit Field"}
    >
      {field && <EditFieldForm cb={close} field={field} />}
    </SideSheet>
  );
};

export default EditField;

const EditFieldForm = ({
  field,
  cb,
}: {
  field: Field;
  cb?: (shouldRefetch?: boolean) => void;
}) => {
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("fields");

  const { editFields, editFieldsLoading } = useEditField(field?.id, () =>
    cb?.(true)
  );

  const [isLoading, setLoading] = useState(false);
  const LanguageSchema = z.object({
    description: z.string().optional(),
  });

  type LanguageSchemaType = typeof LanguageSchema;

  const translationsObject: Record<Languages, LanguageSchemaType> =
    {} as Record<Languages, LanguageSchemaType>;

  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  const formSchema = z.object({
    description: z.string({ required_error: "You must provide a type" }),
    type: z.string({ required_error: "You must provide a type" }),
    translations: z.object(translationsObject),
  });

  const defaultTranslations: Record<string, Record<string, string>> = {};
  languages.forEach(({ lang }) => {
    defaultTranslations[lang] = {
      description: field?.translations?.[lang]?.description || "",
    };
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
      description: field?.description || "",
      type: field?.type || "",
      translations: defaultTranslations,
    },
  });

  watch("description");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    editFields(values);
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
      {fields?.map(({ name, type, options }) => {
        if (
          type === "TEXT" &&
          name !== "name" &&
          name !== "value" &&
          name !== "type" &&
          name !== "code"
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
                    separateTextOnCapitalLetter(field?.name)
                  )}
                  placeholder={`Enter ${separateTextOnCapitalLetter(
                    field?.name
                  )}`}
                  disabled={editFieldsLoading}
                  {...field}
                  error={errors?.[name as "description"]?.message || ""}
                />
              )}
            />
          );
        }
        if (type === "TEXT" && options?.length) {
          return (
            <Controller
              name="type"
              control={control}
              render={({ field: { ref, ...field } }) => {
                return (
                  <SelectInput
                    label="Type"
                    placeholder="Select type"
                    disabled={editFieldsLoading}
                    options={options.map((option) => ({
                      label: option?.name,
                      value: option?.value,
                    }))}
                    {...field}
                    value={
                      options?.find((option) => option?.value === field?.value)
                        ? {
                            // @ts-ignore
                            label: options?.find(
                              (option) => option?.value === field?.value
                            )?.name as string,
                            value: options?.find(
                              (option) => option?.value === field?.value
                            )?.value,
                          }
                        : undefined
                    }
                    onChange={(e) => {
                      field?.onChange(e.value);
                    }}
                    error={errors?.["description"]?.message || ""}
                  />
                );
              }}
            />
          );
        }
        return null;
      })}
      {languages.map(({ lang, name }) => {
        return (
          <div className="space-y-3 rounded border p-3" key={lang}>
            <h3>{name}</h3>
            {fields?.map(({ name, type }) => {
              if (type === "TEXT" && name === "description") {
                return (
                  <Controller
                    key={name}
                    name={("translations." + lang + "." + name) as any}
                    control={control}
                    render={({ field }) => (
                      <Input
                        key={name}
                        label={capitalizeFirstLetter(
                          separateTextOnCapitalLetter(name)
                        )}
                        placeholder={`Enter ${separateTextOnCapitalLetter(
                          name
                        )}`}
                        disabled={editFieldsLoading}
                        {...field}
                        error={
                          errors?.[
                            ("translations." +
                              lang +
                              "." +
                              name) as "description"
                          ]?.message || ""
                        }
                      />
                    )}
                  />
                );
              }

              return null;
            })}
          </div>
        );
      })}
      <div className="flex justify-end">
        <Button disabled={!getValues("description") || editFieldsLoading}>
          {editFieldsLoading ? "Please Wait" : "Edit"}
        </Button>
      </div>
    </form>
  );
};
