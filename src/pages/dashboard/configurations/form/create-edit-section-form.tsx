import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { languages } from "@/shared/constants/constants";
import { useFields } from "@/shared/services/fields";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import {
  capitalizeFirstLetter,
  formatErrorMessage,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { Button } from "@/components/ui/button";
import {
  useCreateSection,
  useEditSection,
  useSection,
} from "@/shared/services/sections";

const CreateEditSectionForm = ({
  id,
  form,
  highestSortOrder,
  cb,
}: {
  id: string;
  form: string;
  highestSortOrder?: number;
  cb?: (created?: boolean) => void;
}) => {
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("sections");

  const { section } = useSection(id);

  const { createSection, createSectionLoading } = useCreateSection(cb);
  const { editSection, editSectionLoading } = useEditSection(id, cb);
  const [isLoading, setLoading] = useState(false);

  const loading = createSectionLoading || editSectionLoading;

  const LanguageSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional(),
  });

  type LanguageSchemaType = typeof LanguageSchema;

  const translationsObject: Record<Languages, LanguageSchemaType> =
    {} as Record<Languages, LanguageSchemaType>;

  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  const formSchema = z.object({
    code: z.string({ required_error: "You must provide a code" }),
    name: z.string({ required_error: "You must provide a name" }),
    translations: z.object(translationsObject),
  });

  const defaultTranslations: Record<string, Record<string, string>> = {};
  languages.forEach(({ lang }) => {
    defaultTranslations[lang] = {
      code: section?.translations?.[lang]?.code || "",
      name: section?.translations?.[lang]?.name || "",
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
      code: section?.code || "",
      name: section?.name || "",
      translations: defaultTranslations,
    },
  });

  watch("code");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id) {
      createSection({
        ...values,
        sortOrder: (highestSortOrder || 0) + 1,
        form,
      });
    } else {
      editSection({ ...values, form });
    }
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
                  error={errors?.[name as "code"]?.message || ""}
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
              if (type === "TEXT") {
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
                        disabled={loading}
                        {...field}
                        error={
                          errors?.[
                            ("translations." + lang + "." + name) as "code"
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
        <Button disabled={!getValues("code") || loading}>
          {loading ? "Please Wait" : !id ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditSectionForm;
