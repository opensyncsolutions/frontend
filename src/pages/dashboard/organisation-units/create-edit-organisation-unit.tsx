import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFields } from "@/shared/services/fields";
import {
  useCreateOrganisationUnit,
  useEditOrganisationUnit,
  useOrganisationUnits,
} from "@/shared/services/organisation-units";
import { languages } from "@/shared/constants/constants";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import {
  capitalizeFirstLetter,
  formatErrorMessage,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CreateEditOrganisationUnit = ({
  cb,
  organisationUnit,
}: {
  organisationUnit?: OrganisationUnit;
  cb?: (shouldRefetch: boolean) => void;
}) => {
  let path = organisationUnit?.path?.split("/")?.slice(-2, -1)[0];

  const { organisationUnits } = useOrganisationUnits({
    paginate: {
      pageSize: 1000,
      page: 1,
    },
  });
  const { fields, fieldsError, fieldsLoading, fieldsRefetch } =
    useFields("organisationUnits");
  const { createOrganisationUnit, createOrganisationUnitLoading } =
    useCreateOrganisationUnit(() => cb?.(true));
  const { editOrganisationUnit, editOrganisationUnitLoading } =
    useEditOrganisationUnit(organisationUnit?.id || "", () => cb?.(true));

  const [isLoading, setLoading] = useState(false);

  const loading = createOrganisationUnitLoading || editOrganisationUnitLoading;

  const LanguageSchema = z.object({
    name: z.string().optional(),
    shortName: z.string().optional(),
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
    shortName: z.string({ required_error: "You must provide a short name" }),
    code: z.string().optional(),
    data: z.boolean(),
    active: z.boolean(),
    parent: z
      .object({
        id: z.string(),
      })
      .optional(),
    description: z.string().optional(),
    translations: z.object(translationsObject),
  });

  const defaultTranslations: Record<string, Record<string, string>> = {};
  languages.forEach(({ lang }) => {
    defaultTranslations[lang] = {
      name: organisationUnit?.translations?.[lang]?.name || "",
      shortName: organisationUnit?.translations?.[lang]?.shortName || "",
      description: organisationUnit?.translations?.[lang]?.description || "",
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
      name: organisationUnit?.name || "",
      shortName: organisationUnit?.shortName || "",
      code: organisationUnit?.code || "",
      parent: {
        id: path || "",
      },
      active: organisationUnit?.active || false,
      data: organisationUnit?.data || false,
      description: organisationUnit?.description || "",
      translations: defaultTranslations,
    },
  });

  watch("name");
  watch("shortName");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!organisationUnit) {
      return createOrganisationUnit({
        ...values,
      });
    }
    return editOrganisationUnit({
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

  console.log(getValues());

  return (
    <form className="space-y-3 mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 rounded border p-3">
        <h3>Default</h3>
        {fields
          ?.sort((a, b) => a.sortOrder - b.sortOrder)
          ?.map(({ name, type }) => {
            if (type === "TEXT" && name !== "path") {
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
            if (type === "BOOLEAN") {
              return (
                <Controller
                  key={name}
                  name={name as any}
                  control={control}
                  render={({ field }) => (
                    <Label className="w-1/2 inline-flex items-center gap-2">
                      <Switch
                        key={name}
                        disabled={loading}
                        {...field}
                        checked={field?.value}
                        onCheckedChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                      {capitalizeFirstLetter(
                        separateTextOnCapitalLetter(field?.name)
                      )}
                    </Label>
                  )}
                />
              );
            }
            return null;
          })}

        <Controller
          name="parent"
          control={control}
          render={({ field: { ref, ...field } }) => {
            const unitValue = organisationUnits?.organisationUnits?.find(
              (unit) => unit?.id === field?.value?.id
            );
            return (
              <SelectInput
                label="Parent Organisation"
                placeholder="Select Parent"
                disabled={loading}
                options={
                  organisationUnits?.organisationUnits
                    ?.filter((unit) => unit?.id !== organisationUnit?.id)
                    ?.map((unit) => ({
                      label: unit?.name,
                      value: unit?.id,
                    })) || []
                }
                {...field}
                value={
                  unitValue
                    ? {
                        label: unitValue?.name || "",
                        value: unitValue?.id,
                      }
                    : undefined
                }
                onChange={(e) => {
                  field?.onChange({
                    id: e?.value
                  });
                }}
                error={errors?.parent?.message || ""}
              />
            );
          }}
        />
      </div>
      {languages.map(({ lang, name }) => {
        return (
          <div className="space-y-3 rounded border p-3" key={lang}>
            <h3>{name}</h3>
            {fields
              ?.sort((a, b) => a.sortOrder - b.sortOrder)
              ?.map(({ name, type }) => {
                if (
                  type === "TEXT" &&
                  (name === "name" ||
                    name === "description" ||
                    name === "shortName")
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
                                | "shortName"
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
          disabled={!getValues("name") || !getValues("shortName") || loading}
        >
          {loading ? "Please Wait" : !organisationUnit?.id ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditOrganisationUnit;
