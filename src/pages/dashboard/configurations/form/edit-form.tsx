import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFields } from "@/shared/services/fields";
import { useEditForm } from "@/shared/services/forms";
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

const EditForm = ({
  form,
  cb,
}: {
  form: FormResponse;
  cb?: (edited: boolean) => void;
}) => {
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("forms");

  const { editForm, editFormLoading } = useEditForm(form?.id, () => cb?.(true));

  const [isLoading, setLoading] = useState(false);
  const LanguageSchema = z.object({
    name: z.string().optional(),
  });

  type LanguageSchemaType = typeof LanguageSchema;

  const translationsObject: Record<Languages, LanguageSchemaType> =
    {} as Record<Languages, LanguageSchemaType>;

  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  const formSchema = z.object({
    name: z.string({ required_error: "You must provide a type" }),
    translations: z.object(translationsObject),
  });

  const defaultTranslations: Record<string, Record<string, string>> = {};
  languages.forEach(({ lang }) => {
    defaultTranslations[lang] = {
      name: form?.translations?.[lang]?.name || "",
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
      name: form?.name || "",
      translations: defaultTranslations,
    },
  });

  watch("name");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    editForm(values);
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
      {fields?.map(({ name, type }) => {
        if (
          type === "TEXT" &&
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
                  disabled={editFormLoading}
                  {...field}
                  error={errors?.[name as "name"]?.message || ""}
                />
              )}
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
              if (type === "TEXT" && name === "name") {
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
                        disabled={editFormLoading}
                        {...field}
                        error={
                          errors?.[
                            ("translations." + lang + "." + name) as "name"
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
        <Button disabled={!getValues("name") || editFormLoading}>
          {editFormLoading ? "Please Wait" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default EditForm;
