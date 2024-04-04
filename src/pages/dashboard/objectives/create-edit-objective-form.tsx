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
import { useOrganisationUnits } from "@/shared/services/organisation-units";
import SelectInput from "@/components/ui/select-input";

const CreateEditObjectiveForm = ({
  id,
  cb,
}: {
  id: string;
  cb?: (shouldRefetch?: boolean) => void;
}) => {
  const { organisationUnits } = useOrganisationUnits({
    paginate: {
      pageSize: 1000,
      page: 1,
    },
  });
  const { objective } = useObjective(id);
  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("objectives");

  const [isLoading, setLoading] = useState(false);

  const { createObjective, createObjectiveLoading } = useCreateObjective(() =>
    cb?.(true)
  );
  const { editObjective, editObjectiveLoading } = useEditObjective(id, () =>
    cb?.(true)
  );

  const loading = createObjectiveLoading || editObjectiveLoading;

  const LanguageSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

  type LanguageSchemaType = typeof LanguageSchema;

  const translationsObject: Record<Languages, LanguageSchemaType> =
    {} as Record<Languages, LanguageSchemaType>;

  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  const formSchema = z.object({
    name: z.string({ required_error: "You must provide a name" }),
    organisationUnits: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .min(1),
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
      organisationUnits: objective?.organisationUnits?.map((unit) => ({
        value: unit?.id,
        label: unit?.name,
      })),
    },
  });

  watch("name");

  watch("organisationUnits");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id) {
      return createObjective({
        ...values,
        organisationUnits: values?.organisationUnits?.map((unit) => ({
          id: unit?.value,
        })),
      });
    }
    return editObjective({
      ...values,
      organisationUnits: values?.organisationUnits?.map((unit) => ({
        id: unit?.value,
      })),
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
        <Controller
          name="organisationUnits"
          control={control}
          render={({ field: { ref, ...field } }) => {
            return (
              <SelectInput
                label="Organisation Unit"
                placeholder="Select unit"
                disabled={loading}
                isMulti
                options={
                  organisationUnits?.organisationUnits?.map((unit) => ({
                    label: unit?.name,
                    value: unit?.id,
                  })) || []
                }
                {...field}
                value={field?.value ?? undefined}
                onChange={(e) => {
                  field?.onChange(e);
                }}
                error={errors?.organisationUnits?.message || ""}
              />
            );
          }}
        />
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
        <Button
          disabled={
            !getValues("name") ||
            !getValues("organisationUnits")?.length ||
            loading
          }
        >
          {loading ? "Please Wait" : !id ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditObjectiveForm;
