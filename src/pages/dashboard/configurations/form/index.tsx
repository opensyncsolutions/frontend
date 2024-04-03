import { useLanguage } from "@/shared/contexts/languages";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useForm, useForms } from "@/shared/services/forms";
import PageTemplate from "@/templates/page-template";
import { useNavigate, useParams } from "react-router-dom";
import Page from "./page";
import { formsOptions } from "../forms/data";
import { useFields } from "@/shared/services/fields";
import { Button } from "@/components/ui/button";
import { Edit2Icon, RefreshCcw, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";
import { useState } from "react";
import { useSections } from "@/shared/services/sections";
import DeleteForm from "../forms/delete-form";
import SideSheet from "@/components/ui/side-sheet";
import EditForm from "./edit-form";

const Form = () => {
  const [isRefetching, setRefetching] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { translate } = useTranslations();
  const { formId } = useParams<{ formId: string }>();
  const { form, formRefetch } = useForm(formId || "");
  const formData = formsOptions.find(({ code }) => form?.code === code);
  const { formsRefetch } = useForms();
  const { fields, fieldsRefetch } = useFields(formData?.field || "");

  const { sectionsRefetch } = useSections({
    form: form?.sections?.length ? form?.id : "",
  });

  const { me } = useGetMe();
  const { deleteFormsRole, editFormsRole } = getRoles(me?.roles || []);

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
                sectionsRefetch();
              }}
              variant={"secondary"}
            >
              <RefreshCcw
                size={15}
                className={cn(isRefetching ? "animate-rotate" : "")}
              />
            </Button>
            {deleteFormsRole && (
              <Button
                className="gap-2"
                variant={"destructive"}
                onClick={() => {
                  setOpenDelete(true);
                }}
              >
                <Trash2 size={15} />
              </Button>
            )}
            {editFormsRole && (
              <Button
                className="gap-2"
                onClick={() => {
                  setOpenEdit(true);
                }}
              >
                <Edit2Icon size={15} /> Edit Form
              </Button>
            )}
          </div>
        ) : undefined
      }
    >
      <Page updateLoadingStatus={(isLoading) => setRefetching(isLoading)} />
      <DeleteForm
        id={openDelete ? form?.id || "" : ""}
        name={form?.translations?.[language]?.name || form?.name || ""}
        cb={(deleted) => {
          if (deleted) {
            formsRefetch();
            navigate("/configurations");
          }
          setOpenDelete(false);
        }}
      />
      {form && (
        <SideSheet open={openEdit} close={() => setOpenEdit(false)}>
          {openEdit && (
            <EditForm
              form={form}
              cb={(edited) => {
                if (edited) {
                  formRefetch();
                  formsRefetch();
                }
                setOpenEdit(false);
              }}
            />
          )}
        </SideSheet>
      )}
    </PageTemplate>
  );
};

export default Form;
