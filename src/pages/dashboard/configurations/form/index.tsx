import { useLanguage } from "@/shared/contexts/languages";
import { useForm } from "@/shared/services/forms";
import PageTemplate from "@/templates/page-template";
import { useParams } from "react-router-dom";

const Form = () => {
  const { language } = useLanguage();
  const { formId } = useParams<{ formId: string }>();
  const { form } = useForm(formId || "");

  console.log(form);

  return (
    <PageTemplate
      title={form ? form?.translations?.[language]?.name || form?.name : "Form"}
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Configurations",
          to: "/configurations",
        },
        {
          label: "Form",
        },
      ]}
      tabKey="form"
      tabs={[
        { name: "Details", value: "details" },
        { name: "Section & Fields", value: "sections-fields" },
      ]}
    >
      Single form page
    </PageTemplate>
  );
};

export default Form;
