import { useBulkyEditFields, useFields } from "@/shared/services/fields";
import { useForm } from "@/shared/services/forms";
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { compareArray, formatErrorMessage } from "@/shared/utils/helpers";
import NestedDragAndDrop from "@/components/dnd/nested-dnd";
import { getRoles } from "@/shared/utils/roles";
import { useGetMe } from "@/shared/services/auth";
import CreateSection from "./create-section";
import Section from "./section";
import FieldItem from "./field-item";
import SectionItem from "./section-item";
import EditField from "./edit-field";
import DragAndDropList from "@/components/dnd";
import { useBulkyEditSections, useSections } from "@/shared/services/sections";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { formsOptions } from "../forms/data";

const Page = ({
  updateLoadingStatus,
}: {
  updateLoadingStatus: (isLoading: boolean) => void;
}) => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { createSectionsRole, editSectionsRole, editFieldsRole } = getRoles(
    me?.roles || []
  );
  const { formId } = useParams<{ formId: string }>();
  const [loading, setLoading] = useState(false);
  const [sectionLoading, setSectionLoading] = useState(false);
  const { form, formLoading, formError, formRefetch, formRefetching } = useForm(
    formId || ""
  );

  const formData = formsOptions.find(({ code }) => form?.code === code);

  const { fields, fieldsLoading } = useFields(formData?.field || "");

  const {
    sections,
    sectionsError,
    sectionsLoading,
    sectionsRefetch,
    sectionsRefetching,
  } = useSections({
    form: form?.sections?.length ? form?.id : "",
  });

  const isLoading = loading || formLoading;

  const isSectionsLoading = sectionLoading || sectionsLoading;

  const { editFields, editFieldsLoading } = useBulkyEditFields(() => {
    formRefetch();
  });
  const { editSections, editSectionsLoading } = useBulkyEditSections(() => {
    sectionsRefetch();
    formRefetch();
  });

  const isRefetching =
    formRefetching ||
    editFieldsLoading ||
    editSectionsLoading ||
    sectionsRefetching;

  const highestSortOrder: number | undefined =
    form?.sections?.sort((a, b) => b.sortOrder - a.sortOrder)?.[0]?.sortOrder ||
    0;

  const selectedField = form?.fields?.find(
    (field) => field?.id === search.get("selectedField")
  );

  useEffect(() => {
    updateLoadingStatus(isRefetching);
  }, [isRefetching]);

  if (isLoading || fieldsLoading) {
    return (
      <div className="h-12 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (formError) {
    return (
      <Error
        message={formatErrorMessage(formError)}
        refetch={() => {
          setLoading(true);
          formRefetch().finally(() => {
            setLoading(false);
          });
        }}
      />
    );
  }

  if (form && !form?.sections?.length) {
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h3>Fields</h3>
          {createSectionsRole && (
            <Button
              className="gap-2"
              variant={"secondary"}
              onClick={() => {
                search.set("selectedSection", "new");
                setSearch(search);
              }}
            >
              <PlusIcon size={15} /> Add Section
            </Button>
          )}
        </div>
        <DragAndDropList
          data={
            form?.fields
              ?.sort((a, b) => a.sortOrder - b.sortOrder)
              ?.map((field) => ({
                id: field?.id,
                content: <FieldItem field={field} />,
              })) || []
          }
          onDataReordering={(data) => {
            const prevData =
              form?.fields
                ?.sort((a, b) => a.sortOrder - b.sortOrder)
                .map((field) => ({
                  id: field?.id,
                  sortOrder: field?.sortOrder,
                })) || [];

            const newData: { id: string; sortOrder: number }[] = data?.map(
              (field, index) => {
                return {
                  id: field.id,
                  sortOrder: index,
                };
              }
            );
            if (!compareArray(prevData, newData)) {
              editFields(newData);
            }
          }}
          loading={editFieldsLoading || formRefetching}
        />
        {createSectionsRole && (
          <CreateSection
            open={
              createSectionsRole
                ? search.get("selectedSection") === "new"
                : false
            }
            close={() => {
              if (search.get("selectedSection"))
                search.delete("selectedSection");
              setSearch(search);
            }}
            form={form?.id}
            refetch={() => {
              sectionsRefetch();
              formRefetch();
            }}
            highestSortOrder={highestSortOrder}
          />
        )}
        {editSectionsRole && (
          <Section
            id={
              search.get("selectedSection") &&
              search.get("selectedSection") !== "new"
                ? (search.get("selectedSection") as string)
                : ""
            }
            close={() => {
              if (search.get("selectedSection"))
                search.delete("selectedSection");
              setSearch(search);
            }}
            form={form?.id}
            refetch={() => {
              sectionsRefetch();
              formRefetch();
            }}
          />
        )}
        {editFieldsRole && (
          <EditField
            field={selectedField}
            close={(shouldRefetch) => {
              if (shouldRefetch) {
                sectionsRefetch();
                formRefetch();
              }
              search.delete("selectedField");
              setSearch(search);
            }}
          />
        )}
      </div>
    );
  }

  if (isSectionsLoading) {
    return (
      <div className="h-12 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (sectionsError) {
    return (
      <Error
        message={formatErrorMessage(sectionsError)}
        refetch={() => {
          setSectionLoading(true);
          sectionsRefetch().finally(() => {
            setSectionLoading(false);
          });
        }}
      />
    );
  }

  if (!sections?.sections?.length && form) {
    return (
      <>
        <Error
          message={"Sections not found"}
          type="default"
          refetch={() => {
            search.set("selectedSection", "new");
            setSearch(search);
          }}
          retryText="Create Section"
        />
        {createSectionsRole && (
          <CreateSection
            open={
              createSectionsRole
                ? search.get("selectedSection") === "new"
                : false
            }
            close={() => {
              if (search.get("selectedSection"))
                search.delete("selectedSection");
              setSearch(search);
            }}
            form={form?.id}
            refetch={() => {
              sectionsRefetch();
              formRefetch();
            }}
            highestSortOrder={highestSortOrder}
          />
        )}
      </>
    );
  }

  const selectedFields: Field[] = [];

  // Iterate through each section
  sections?.sections?.forEach((section) => {
    selectedFields.push(...(section?.fields || []));
  });

  const unselectedFields = fields?.filter(
    (field) =>
      !selectedFields?.find(
        (selectedField) => selectedField?.name === field?.name
      )
  );

  if (sections?.sections?.length && form)
    return (
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h3>Sections</h3>
          {createSectionsRole && (
            <Button
              className="gap-2"
              variant={"secondary"}
              onClick={() => {
                search.set("selectedSection", "new");
                setSearch(search);
              }}
            >
              <PlusIcon size={15} /> Add Section
            </Button>
          )}
        </div>
        <div className="w-full pb-5">
          <NestedDragAndDrop
            // @ts-ignore
            data={[
              ...(unselectedFields?.length
                ? [
                    {
                      id: "",
                      canDrag: false,
                      content: <SectionItem />,
                      subItems:
                        unselectedFields.map((field) => ({
                          id: field?.name || "",
                          content: <FieldItem field={field} />,
                          canDrag: true,
                        })) || [],
                    },
                  ]
                : []),
              ...sections?.sections
                ?.sort((a, b) => a.sortOrder - b.sortOrder)
                ?.map((section) => ({
                  id: section?.id,
                  content: (
                    <SectionItem
                      section={section}
                      refetch={() => {
                        sectionsRefetch();
                        formRefetch();
                      }}
                    />
                  ),
                  canDrag: true,
                  sortOrder: section?.sortOrder,
                  subItems: section?.fields
                    ?.sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((field) => ({
                      id: field?.id,
                      content: <FieldItem field={field} />,
                      canDrag: true,
                    })),
                })),
            ]}
            onDataReordering={async (data) => {
              const oldSections = sections?.sections?.map((section) => ({
                id: section?.id,
                sortOrder: section?.sortOrder,
                fields: section?.fields?.map((field) => ({
                  id: field?.id,
                  sortOrder: field?.sortOrder,
                })),
              }));
              const newSections = data
                ?.filter((section) => section?.id)
                ?.map((section, index) => ({
                  id: section?.id,
                  sortOrder: index,
                  fields: section?.subItems?.map((field, index) => {
                    const newField = form?.fields?.find(
                      (fieldItem) => fieldItem?.name === field?.id
                    );
                    if (newField) {
                      return newField;
                    }
                    return {
                      id: field?.id,
                      sortOrder: index,
                    };
                  }),
                }));

              if (!compareArray(oldSections, newSections))
                await editSections(newSections);
            }}
            loading={isRefetching || editSectionsLoading || editFieldsLoading}
          />
          {createSectionsRole && (
            <CreateSection
              open={
                createSectionsRole
                  ? search.get("selectedSection") === "new"
                  : false
              }
              close={() => {
                if (search.get("selectedSection"))
                  search.delete("selectedSection");
                setSearch(search);
              }}
              form={form?.id}
              refetch={() => {
                sectionsRefetch();
                formRefetch();
              }}
              highestSortOrder={highestSortOrder}
            />
          )}
          {editSectionsRole && (
            <Section
              id={
                search.get("selectedSection") &&
                search.get("selectedSection") !== "new"
                  ? (search.get("selectedSection") as string)
                  : ""
              }
              close={() => {
                if (search.get("selectedSection"))
                  search.delete("selectedSection");
                setSearch(search);
              }}
              form={form?.id}
              refetch={() => {
                sectionsRefetch();
                formRefetch();
              }}
            />
          )}
          {editFieldsRole && (
            <EditField
              field={selectedField}
              close={(shouldRefetch) => {
                if (shouldRefetch) {
                  sectionsRefetch();
                  formRefetch();
                }
                search.delete("selectedField");
                setSearch(search);
              }}
            />
          )}
        </div>
      </div>
    );
  return null;
};

export default Page;
