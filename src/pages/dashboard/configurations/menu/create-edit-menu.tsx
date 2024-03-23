import { useState } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Loader from "@/components/ui/loader";
import SideSheet from "@/components/ui/side-sheet";
import Error from "@/pages/error";
import {
  useCreateMenu,
  useEditMenu,
  useMenu,
  useMenus,
} from "@/shared/services/menus";
import {
  capitalizeFirstLetter,
  formatErrorMessage,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { Button } from "@/components/ui/button";
import { useFields } from "@/shared/services/fields";
import { Input } from "@/components/ui/input";
import SelectInput from "@/components/ui/select-input";
import { paths } from "@/layout/data";
import { languages } from "@/shared/constants/constants";

const CreateEditMenu = ({
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

  const { menuLoading, menuError, menu, menuRefetch } = useMenu(
    selected && selected !== "new" ? selected : ""
  );

  const loading = menuLoading || isLoading;
  return (
    <SideSheet open={!!selected} close={onClose}>
      {loading && (
        <div className="flex justify-center">
          <Loader size={150} />
        </div>
      )}
      {menuError ? (
        <Error
          message={formatErrorMessage(menuError)}
          refetch={() => {
            setLoading(true);
            menuRefetch().finally(() => {
              setLoading(false);
            });
          }}
        />
      ) : null}
      {(menu || selected === "new") && (
        <CreateEditForm
          id={selected || ""}
          cb={() => {
            refetch();
            menuRefetch();
            onClose();
          }}
        />
      )}
    </SideSheet>
  );
};

const CreateEditForm = ({ id, cb }: { id: string; cb: () => void }) => {
  const { menu } = useMenu(id && id !== "new" ? id : "");
  const { menus } = useMenus();

  const highestSortOrder: number | undefined = menus?.menus?.sort(
    (a, b) => b.sortOrder - a.sortOrder
  )[0].sortOrder;

  const { fields, fieldsLoading, fieldsError, fieldsRefetch } =
    useFields("menus");

  const [isLoading, setLoading] = useState(false);

  const { createMenu, createMenuLoading } = useCreateMenu();

  const { editMenu, editMenuLoading } = useEditMenu(id);

  const loading = createMenuLoading || editMenuLoading;

  const LanguageSchema = z.object({
    displayName: z.string({ required_error: "You must provide a name" }),
  });

  const translationsObject: Record<string, typeof LanguageSchema> = {};
  languages.forEach((lang) => {
    translationsObject[lang.lang] = LanguageSchema;
  });

  const formSchema = z.object({
    code: z.string().optional(),
    displayName: z.string({ required_error: "You must provide a name" }),
    path: z.string({ required_error: "You must provide a name" }),
    translations: z.object(translationsObject),
  });

  const defaultTranslations: Record<string, Record<string, string>> = {};
  languages.forEach(({ lang }) => {
    defaultTranslations[lang] = {
      displayName: menu?.translations?.[lang]?.displayName || "",
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
      path: menu?.path || "",
      displayName: menu?.displayName || "",
      code: menu?.code || "",
      translations: defaultTranslations,
    },
  });

  watch("displayName");
  watch("path");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (id === "new") {
      return createMenu({
        ...values,
        sortOrder: highestSortOrder ? highestSortOrder + 1 : 1,
      }).then(() => cb?.());
    }
    return editMenu({
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

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-3 rounded border p-3">
        <h3>Default</h3>
        {fields?.map(({ name, type }) => {
          if (
            (type === "TEXT" || type === "NUMBER") &&
            name !== "path" &&
            name !== "name" &&
            name !== "sortOrder" &&
            name !== "description"
          ) {
            return (
              <Controller
                key={name}
                name={name as any}
                control={control}
                render={({ field }) => (
                  <Input
                    label={capitalizeFirstLetter(
                      separateTextOnCapitalLetter(field?.name)
                    )}
                    placeholder={`Enter ${separateTextOnCapitalLetter(
                      field?.name
                    )}`}
                    disabled={loading}
                    type={type === "NUMBER" ? "number" : "text"}
                    {...field}
                    error={
                      errors?.[name as "displayName" | "path" | "code"]
                        ?.message || ""
                    }
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
          if (type === "TEXT" && name === "path") {
            return (
              <Controller
                name="path"
                control={control}
                render={({ field: { ref, ...field } }) => {
                  return (
                    <SelectInput
                      label="Path"
                      placeholder="Select path"
                      disabled={loading}
                      options={[
                        ...(id !== "new" &&
                        paths?.find((path) => menu?.path === path)
                          ? [
                              {
                                label: menu?.path,
                                value: menu?.path,
                              },
                            ]
                          : []),
                        ...paths
                          .filter((path) => {
                            return !menus?.menus?.find(
                              (menu) => menu?.path === path
                            );
                          })
                          .map((path) => ({
                            label: path,
                            value: path,
                          })),
                      ]}
                      {...field}
                      value={
                        field?.value
                          ? {
                              // @ts-ignore
                              value: field?.value,
                              label: field?.value,
                            }
                          : undefined
                      }
                      onChange={(e) => {
                        field?.onChange(e.value);
                      }}
                      error={errors?.[name]?.message || ""}
                    />
                  );
                }}
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
                (type === "TEXT" || type === "NUMBER") &&
                name !== "path" &&
                name !== "name" &&
                name !== "sortOrder" &&
                name !== "description" &&
                name !== "code"
              ) {
                return (
                  <Controller
                    key={name}
                    name={("translations." + lang + "." + name) as any}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label={capitalizeFirstLetter(
                          separateTextOnCapitalLetter(name)
                        )}
                        placeholder={`Enter ${separateTextOnCapitalLetter(
                          name
                        )}`}
                        disabled={loading}
                        type={type === "NUMBER" ? "number" : "text"}
                        {...field}
                        error={
                          errors?.[
                            ("translations." + lang + "." + name) as
                              | "displayName"
                              | "path"
                              | "code"
                          ]?.message || ""
                        }
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

              return null;
            })}
          </div>
        );
      })}

      <div className="flex justify-end">
        <Button
          disabled={!getValues("displayName") || !getValues("path") || loading}
        >
          {loading ? "Please Wait" : id === "new" ? "Create" : "Edit"}
        </Button>
      </div>
    </form>
  );
};

export default CreateEditMenu;
