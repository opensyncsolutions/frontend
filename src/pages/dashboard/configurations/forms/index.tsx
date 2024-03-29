import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ErrorComponent from "@/pages/error";
import { useTranslations } from "@/shared/hooks/use-translations";
import { useGetMe } from "@/shared/services/auth";
import { useCreateForm, useForms } from "@/shared/services/forms";
import { formatErrorMessage } from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import { PlusIcon, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { formsOptions } from "./data";
import { useNavigate } from "react-router-dom";
import FormItem from "./form-item";
import { useLanguage } from "@/shared/contexts/languages";

const Forms = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const { translate } = useTranslations();
  const navigate = useNavigate();
  const { me } = useGetMe();
  const { language } = useLanguage();
  const { createFormsRole, deleteFormsRole } = getRoles(me?.roles || []);
  const [isLoading, setLoading] = useState(false);
  const { forms, formsError, formsLoading, formsRefetch, formsRefething } =
    useForms();

  const { createForm, createFormLoading } = useCreateForm((id) => {
    formsRefetch();
    navigate(`/configurations/forms/${id}`);
  });

  const loading = formsLoading || isLoading;

  return (
    <div className="space-y-5 h-fit">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl">{translate("Forms")}</h3>
        <div className="flex gap-3 items-center animate-fade-in">
          <Button
            size={"sm"}
            onClick={() => formsRefetch()}
            variant={"secondary"}
          >
            <RefreshCcw
              size={15}
              className={cn(formsRefething ? "animate-rotate" : "")}
            />
          </Button>
          {createFormsRole && (
            <Popover open={createOpen} onOpenChange={setCreateOpen} modal>
              <PopoverTrigger asChild>
                <Button size={"sm"} onClick={() => {}}>
                  <PlusIcon size={15} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit px-0 py-2 mr-6">
                <div className="flex flex-col items-start">
                  {!formsOptions.filter(
                    (option) =>
                      !forms?.forms.find((form) => option?.code === form?.code)
                  )?.length ? (
                    <div className="px-5 py-1 text-sm">No option</div>
                  ) : (
                    ""
                  )}
                  {formsOptions
                    .filter(
                      (option) =>
                        !forms?.forms.find(
                          (form) => option?.code === form?.code
                        )
                    )
                    .map((form) => {
                      return (
                        <button
                          className="px-5 py-1 text-sm disabled:opacity-50"
                          key={form.code}
                          onClick={() => {
                            createForm(form);
                          }}
                          disabled={createFormLoading}
                        >
                          {form?.translations?.[language]?.name || form?.name}
                        </button>
                      );
                    })}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
      {(formsError || !forms?.forms?.length) && !loading && (
        <ErrorComponent
          message={
            formsError ? formatErrorMessage(formsError) : "No Data found"
          }
          type={formsError ? "destructive" : "default"}
          retryText={formsError || !createFormsRole ? "Retry" : "Create"}
          refetch={() => {
            if (!formsError && createFormsRole) {
              return setCreateOpen(!createOpen);
            }
            setLoading(true);
            formsRefetch().finally(() => {
              setLoading(false);
            });
          }}
          className="max-h-48"
        />
      )}
      {forms?.forms?.length ? (
        <ul className="space-y-2">
          {forms?.forms?.map((form) => (
            <FormItem
              form={form}
              refetch={() => formsRefetch()}
              key={form?.id}
              canDelete={!!deleteFormsRole}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Forms;
