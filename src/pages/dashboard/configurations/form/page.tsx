import { useFields } from "@/shared/services/fields";
import { useForm } from "@/shared/services/forms";
import { useParams, useSearchParams } from "react-router-dom";
import { formsOptions } from "../forms/data";
import { ReactNode, useState } from "react";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { compareArray, formatErrorMessage } from "@/shared/utils/helpers";
import NestedDragAndDrop, { NestedDnDItem } from "@/components/dnd/nested-dnd";
import { getRoles } from "@/shared/utils/roles";
import { useGetMe } from "@/shared/services/auth";
import CreateSection from "./create-section";
import Section from "./section";
import FieldItem from "./field-item";
import SectionItem from "./section-item";
import { UseMutateAsyncFunction } from "react-query";
import EditField from "./edit-field";

const Page = ({
  editFields,
  editFieldsLoading,
  editSections,
  editSectionsLoading,
}: {
  editSections: UseMutateAsyncFunction<
    any,
    unknown,
    {
      id: string;
      sortOrder: number;
      fields: { id: string }[];
    }[],
    unknown
  >;
  editFields: UseMutateAsyncFunction<
    any,
    unknown,
    {
      name: string;
      sortOrder: number;
      id?: string | undefined;
    }[],
    unknown
  >;
  editSectionsLoading: boolean;
  editFieldsLoading: boolean;
}) => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { createSectionsRole, editSectionsRole, editFieldsRole } = getRoles(
    me?.roles || []
  );
  const { formId } = useParams<{ formId: string }>();
  const [loading, setLoading] = useState(false);
  const { form, formLoading, formError, formRefetch, formRefetching } = useForm(
    formId || ""
  );
  const formData = formsOptions.find(({ code }) => form?.code === code);

  const { fields, fieldsError, fieldsLoading, fieldsRefetch, fieldsRefething } =
    useFields(formData?.field || "");

  const isLoading = loading || formLoading || fieldsLoading;

  const isRefetching =
    fieldsRefething ||
    formRefetching ||
    editFieldsLoading ||
    editSectionsLoading;

  const highestSortOrder: number | undefined =
    form?.sections?.sort((a, b) => b.sortOrder - a.sortOrder)?.[0]?.sortOrder ||
    0;

  const selectedField = fields?.find(
    (field) => field?.id === search.get("selectedField")
  );

  if (isLoading) {
    return (
      <div className="h-12 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (formError || fieldsError) {
    return (
      <Error
        message={
          formError
            ? formatErrorMessage(formError)
            : formatErrorMessage(fieldsError)
        }
        refetch={() => {
          setLoading(true);
          if (formError)
            formRefetch().finally(() => {
              setLoading(false);
            });
          if (fieldsError) fieldsRefetch().finally(() => setLoading(false));
        }}
      />
    );
  }

  if (fields && form)
    return (
      <div className="w-full overflow-x-auto">
        <NestedDragAndDrop
          data={groupSections({
            sections: form?.sections || [],
            fields,
            refetch: () => {
              formRefetch();
              fieldsRefetch();
            },
            canEditField: !!editFieldsRole,
            canEditSection: !!editSectionsRole,
          })}
          onDataReordering={async (data) => {
            const { sections, fields: newFields } = rearrangeData(data);
            const oldSections: NewSection[] =
              form.sections?.map((section) => ({
                id: section?.id,
                sortOrder: section?.sortOrder,
                fields: section?.fields?.map((field) => ({
                  id: field?.id,
                })),
              })) || [];
            const oldFields: NewField[] =
              fields?.map((field) => ({
                name: field?.name,
                id: field?.name,
                sortOrder: field?.sortOrder,
              })) || [];

            if (!compareArray(sections, oldSections))
              await editSections(sections);
            if (!compareArray(oldFields, newFields)) editFields(newFields);
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
              formRefetch();
              fieldsRefetch();
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
              formRefetch();
              fieldsRefetch();
            }}
          />
        )}
        {editFieldsRole && (
          <EditField
            field={selectedField}
            close={(shouldRefetch) => {
              if (shouldRefetch) {
                formRefetch();
                fieldsRefetch();
              }
              search.delete("selectedField");
              setSearch(search);
            }}
          />
        )}
      </div>
    );
  return null;
};

export default Page;

interface SubItem {
  id: string;
  canDrag?: boolean;
  content: ReactNode;
}

const groupSections = ({
  fields,
  sections,
  canEditField,
  canEditSection,
  refetch,
}: {
  sections: Section[];
  fields: Field[];
  canEditField?: boolean;
  canEditSection?: boolean;
  refetch: () => void;
}): NestedDnDItem[] => {
  const groupedSections: NestedDnDItem[] = [];

  const fieldsWithoutSection: SubItem[] = [];

  sections.forEach((section) => {
    const sectionFields: SubItem[] = [];

    section.fields?.forEach((field) => {
      sectionFields.push({
        id: field.code || "",
        canDrag: canEditField,
        content: <FieldItem field={field} />,
      });
    });

    // Sort fields within the section by sortOrder
    sectionFields.sort((a, b) => {
      const sortOrderA = fields.find((f) => f.code === a.id)?.sortOrder || 0;
      const sortOrderB = fields.find((f) => f.code === b.id)?.sortOrder || 0;
      return sortOrderA - sortOrderB;
    });

    const nestedSection: NestedDnDItem = {
      id: section.id,
      canDrag: canEditSection,
      sortOrder: section?.sortOrder,
      content: <SectionItem section={section} refetch={refetch} />,
      subItems: sectionFields,
    };

    groupedSections.push(nestedSection);
  });

  fields?.forEach((field) => {
    if (!sections.some((section) => section.fields?.includes(field))) {
      fieldsWithoutSection.push({
        id: field?.name,
        canDrag: canEditField,
        content: <FieldItem field={field} />,
      });
    }
  });

  // Sort fieldsWithoutSection by sortOrder
  fieldsWithoutSection.sort((a, b) => {
    const sortOrderA = fields.find((f) => f.name === a.id)?.sortOrder || 0;
    const sortOrderB = fields.find((f) => f.name === b.id)?.sortOrder || 0;
    return sortOrderA - sortOrderB;
  });

  const unnamedSection: NestedDnDItem = {
    id: "unnamed-section",
    sortOrder: 0,
    content: <SectionItem refetch={refetch} />,
    canDrag: false,
    subItems: fieldsWithoutSection,
  };

  groupedSections
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .unshift(unnamedSection);

  return groupedSections;
};

interface NewField {
  name: string;
  id?: string;
  sortOrder: number;
}

interface NewSection {
  id: string;
  sortOrder: number;
  fields: { id: string }[];
}

interface Result {
  sections: NewSection[];
  fields: NewField[];
}

const rearrangeData = (
  data: {
    id: string;
    subItems: {
      name: string;
      id?: string;
    }[];
  }[]
): Result => {
  const sections: NewSection[] = [];
  const fields: NewField[] = [];

  data.forEach((item, index) => {
    if (item.id !== "unnamed-section") {
      const section: NewSection = {
        id: item.id,
        sortOrder: index,
        fields:
          item?.subItems?.map((subItem) => ({ id: subItem?.id || "" })) || [],
      };
      sections.push(section);
      item.subItems.forEach((subItem, index) => {
        fields.push({ name: subItem?.name, id: subItem?.id, sortOrder: index });
      });
    } else if (
      item.id === "unnamed-section" &&
      item.subItems &&
      item.subItems.length > 0
    ) {
      item.subItems.forEach((subItem, index) => {
        fields.push({ name: subItem?.name, id: subItem?.id, sortOrder: index });
      });
    }
  });

  return { sections, fields };
};
