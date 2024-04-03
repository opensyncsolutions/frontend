import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFields } from "@/shared/services/fields";
import {
  useCreateObjective,
  useEditObjective,
  useObjective,
} from "@/shared/services/objectives";
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

const CreateEditObjectiveForm = ({
  id,
  cb,
}: {
  id: string;
  cb?: (shouldRefetch?: boolean) => void;
}) => {
  const { objective } = useObjective(id);
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("objectives");

  const [isLoading, setLoading] = useState(false);

  const { createObjective, createObjectiveLoading } = useCreateObjective();
  const { editObjective, editObjectiveLoading } = useEditObjective(id, () =>
    cb?.(true)
  );

  const loading = createObjectiveLoading || editObjectiveLoading;

  const LanguageSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

  const translationsObject: Record<string, typeof LanguageSchema> = {};
  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  const formSchema = z.object({
    name: z.string({ required_error: "You must provide a name" }),
    code: z.string().optional(),
    description: z.string().optional(),
    translations: z.object(translationsObject),
  });

  const defaultTranslations: Record<string, Record<string, string>> = {};
  languages.forEach(({ lang }) => {
    defaultTranslations[lang] = {
      name: objective?.translations?.[lang]?.name || "",
      description: objective?.translations?.[lang]?.description || "",
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
      name: objective?.name || "",
      description: objective?.description || "",
      translations: defaultTranslations,
    },
  });

  watch("name");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id) {
      return createObjective({
        ...values,
      }).then(() => cb?.());
    }
    return editObjective({
      ...values,
    }).then(() => cb?.());
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

  console.log(fields);

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 rounded border p-3">
        <h3>Default</h3>
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
                    error={errors?.[name as "name"]?.message || ""}
                  />
                )}
              />
            );
          }
          return null;
        })}
      </div>
      {languages.map(({ lang, name }) => {
        return (
          <div className="space-y-3 rounded border p-3" key={lang}>
            <h3>{name}</h3>
            {fields?.map(({ name, type }) => {
              if (
                type === "TEXT" &&
                (name === "name" || name === "description")
              ) {
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
                            ("translations." + lang + "." + name) as
                              | "name"
                              | "description"
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
        <Button disabled={!getValues("name") || loading}>
          {loading ? "Please Wait" : !id ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditObjectiveForm;
