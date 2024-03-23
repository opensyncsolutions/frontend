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
    <li className="p-3 border bg-white rounded flex gap-4 justify-between items-center">
      <div className="flex flex-col gap-1 items-start w-full">
        <span className="font-bold">
          {form?.translations?.[language]?.name || form?.name}
        </span>
        <span className="text-xs">
          {translate("Code")}: {form?.code}
        </span>
      </div>
      <div className="flex justify-end items-center">
        <button
          className="px-2 py-2"
          onClick={() => {
            navigate(`/configurations/forms/${form?.id}`);
          }}
        >
          <Eye size={16} />
        </button>
        {canDelete && (
          <button
            className="px-2 py-2 text-red-500"
            onClick={() => setOpenDelete(true)}
          >
            <Trash2Icon size={16} />
          </button>
        )}
      </div>
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
    </li>
  );
};

export default FormItem;
