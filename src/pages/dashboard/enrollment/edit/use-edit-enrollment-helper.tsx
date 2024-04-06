import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  useEditEnrollment,
  useEnrollement,
} from "@/shared/services/enrollments";
import { useForms } from "@/shared/services/forms";
import { useSections } from "@/shared/services/sections";
import { useSearchParams } from "react-router-dom";

export const useEditEnrollmentHelper = (id: string) => {
  const [search, setSearch] = useSearchParams();
  const { enrollment } = useEnrollement(id);
  const { forms } = useForms("ENROLLMENT");
  const form = forms?.forms?.[0];
  const { sections, sectionsLoading } = useSections({ form: form?.id || "" });
  const fields: Field[] = form?.fields || [];
  const { editEnrollment, editEnrollmentLoading } = useEditEnrollment(
    id,
    () => {
      search.delete("edit");
      setSearch(search);
    }
  );

  const formSchema = z.object({
    ...Object.fromEntries(
      fields?.map(({ name, type, mandatory }) => [
        name,
        ...(mandatory
          ? [type === "BOOLEAN" ? z.boolean() : z.string()]
          : [
              type === "BOOLEAN"
                ? z.boolean().optional()
                : z.string().optional(),
            ]),
        ,
      ])
    ),
    // phones: z.array({}),
  });

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    control,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: enrollment
      ? Object.keys(formSchema.shape).reduce((acc, key) => {
          const fieldValue = enrollment[key as keyof typeof enrollment];
          if (fieldValue !== undefined && typeof fieldValue !== "object") {
            acc[key] = fieldValue;
          }
          return acc;
        }, {} as Record<string, string | boolean>)
      : {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    editEnrollment(values);
  };

  watch(
    fields?.filter((field) => field?.mandatory)?.map((field) => field?.name)
  );

  // get remaining fields
  const sectionFieldIds = sections?.sections.flatMap((section) =>
    section?.fields?.map((field) => field.id)
  );
  const fieldsNotInSection = fields.filter(
    (field) => !sectionFieldIds?.includes(field.id)
  );

  return {
    control,
    errors,
    fields: fieldsNotInSection,
    sections: sections?.sections,
    sectionsLoading,
    loading: editEnrollmentLoading,
    handleSubmit,
    onSubmit,
    getValues,
  };
};
