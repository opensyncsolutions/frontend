import { Button } from "@/components/ui/button";

import PageTemplate from "@/templates/page-template";
import { useSearchParams } from "react-router-dom";
import { useEditEnrollmentHelper } from "./use-edit-enrollment-helper";
import Section from "./section";
import Field from "./field-item";
import Loader from "@/components/ui/loader";

const EditEnrollmentForm = ({ id }: { id: string }) => {
  const [search, setSearch] = useSearchParams();
  const {
    fields,
    sections,
    handleSubmit,
    onSubmit,
    errors,
    control,
    sectionsLoading,
    loading,
  } = useEditEnrollmentHelper(id);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageTemplate
        title="Enrollment"
        breadCrumb={[
          {
            label: "Dashboard",
            to: "/dashboard",
          },
          {
            label: "Enrollments",
            to: "/enrollments",
          },
          {
            label: "Edit Enrollment",
          },
        ]}
        titleActions={
          <>
            <Button
              variant={"outline"}
              onClick={() => {
                search.delete("edit");
                setSearch(search);
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button disabled={loading}>{loading ? "Saving" : "Save"}</Button>
          </>
        }
      >
        {sectionsLoading && (
          <div className="h-12 flex justify-center items-center">
            <Loader />
          </div>
        )}
        {!sectionsLoading && (
          <div className="space-y-4">
            {sections?.length
              ? sections
                  ?.sort((a, b) => a.sortOrder - b.sortOrder)
                  ?.map((section, index) => {
                    if (section?.fields?.length === 0) {
                      return null;
                    }
                    return (
                      <Section
                        section={section}
                        fields={section?.fields || []}
                        control={control}
                        errors={errors}
                        key={section?.id}
                        index={index + 1}
                      />
                    );
                  })
              : null}
            {fields?.length && sections?.length ? (
              <Section
                fields={fields}
                control={control}
                errors={errors}
                index={sections?.length + 1}
              />
            ) : null}
            {!sections?.length && fields?.length && (
              <div className="border rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {fields
                  ?.sort((a, b) => a.sortOrder - b.sortOrder)
                  ?.map((field) => (
                    <Field
                      field={field}
                      errors={errors}
                      control={control}
                      key={field?.id}
                    />
                  ))}
              </div>
            )}
          </div>
        )}
      </PageTemplate>
    </form>
  );
};

export default EditEnrollmentForm;
