import { useLanguage } from "@/shared/contexts/languages";
import { useTranslations } from "@/shared/hooks/use-translations";
import { Eye, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteForm from "./delete-form";

const FormItem = ({
  form,
  canDelete,
  refetch,
}: {
  form: FormResponse;
  canDelete: boolean;
  refetch: () => void;
}) => {
  const { language } = useLanguage();
  const { translate } = useTranslations();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  return (
    <>
      <li
        className="p-3 w-full border bg-white rounded flex gap-4 justify-between items-center"
        onClick={() => {
          navigate(`/configurations/forms/${form?.id}`);
        }}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/configurations/forms/${form?.id}`);
          }
        }}
      >
        <div className="flex flex-col gap-1 items-start w-full">
          <span className="font-bold">
            {form?.translations?.[language]?.name || form?.name}
          </span>
          <span className="text-xs">
            {translate("Code")}: {form?.code}
          </span>
        </div>
        <div className="flex justify-end items-center">
          <span className="px-2 py-2">
            <Eye size={16} />
          </span>
          {canDelete && (
            <button
              className="px-2 py-2 text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                setOpenDelete(true);
              }}
            >
              <Trash2Icon size={16} />
            </button>
          )}
        </div>
      </li>
      {canDelete && (
        <DeleteForm
          id={openDelete ? form?.id : ""}
          name={form?.translations?.[language]?.name || form?.name}
          cb={(deleted) => {
            if (deleted) {
              refetch();
            }
            setOpenDelete(false);
          }}
        />
      )}
    </>
  );
};

export default FormItem;
