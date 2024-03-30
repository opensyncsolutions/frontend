import { useLanguage } from "@/shared/contexts/languages";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useForm } from "@/shared/services/forms";
import PageTemplate from "@/templates/page-template";
import { useParams, useSearchParams } from "react-router-dom";
import Page from "./page";
import { formsOptions } from "../forms/data";
import { useBulkyEditFields, useFields } from "@/shared/services/fields";
import { Button } from "@/components/ui/button";
import { PlusIcon, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";
import { useBulkyEditSections } from "@/shared/services/sections";

const Form = () => {
  const [search, setSearch] = useSearchParams();
  const { language } = useLanguage();
  const { translate } = useTranslations();
  const { formId } = useParams<{ formId: string }>();
  const { form, formRefetch, formRefetching } = useForm(formId || "");
  const formData = formsOptions.find(({ code }) => form?.code === code);

  const { fields, fieldsRefetch, fieldsRefething } = useFields(
    formData?.field || ""
  );

  const { editFields, editFieldsLoading } = useBulkyEditFields(() => {
    fieldsRefetch();
    formRefetch();
  });
  const { editSections, editSectionsLoading } = useBulkyEditSections(() => {
    fieldsRefetch();
    formRefetch();
  });

  const { me } = useGetMe();
  const { createSectionsRole } = getRoles(me?.roles || []);

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
          label: translate("Form"),
        },
      ]}
      titleActions={
        form || fields ? (
          <div className="flex items-center gap-3">
            <Button
              onClick={() => {
                formRefetch();
                fieldsRefetch();
              }}
              variant={"secondary"}
            >
              <RefreshCcw
                size={15}
                className={cn(
                  fieldsRefething ||
                    formRefetching ||
                    editFieldsLoading ||
                    editSectionsLoading
                    ? "animate-rotate"
                    : ""
                )}
              />
            </Button>
            {createSectionsRole && (
              <Button
                className="gap-2"
                onClick={() => {
                  search.set("selectedSection", "new");
                  setSearch(search);
                }}
              >
                <PlusIcon size={15} /> Add Section
              </Button>
            )}
          </div>
        ) : undefined
      }
    >
      <div>
        <Page
          editFields={editFields}
          editFieldsLoading={editFieldsLoading}
          editSections={editSections}
          editSectionsLoading={editSectionsLoading}
        />
      </div>
    </PageTemplate>
  );
};

export default Form;
