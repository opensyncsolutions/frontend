import { useLanguage } from "@/shared/contexts/languages";
import { useGetMe } from "@/shared/services/auth";
import {
  capitalizeFirstLetter,
  separateTextOnCapitalLetter,
} from "@/shared/utils/helpers";
import { getRoles } from "@/shared/utils/roles";
import { Edit2Icon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const FieldItem = ({ field }: { field: Field }) => {
  const [search, setSearch] = useSearchParams();
  const { language } = useLanguage();
  const { me } = useGetMe();
  const { editFieldsRole } = getRoles(me?.roles || []);
  return (
    <div className="flex items-center justify-between w-[calc(100%-32px)] gap-2">
      <span>
        {field?.translations?.[language]?.description ||
          capitalizeFirstLetter(
            separateTextOnCapitalLetter(field?.description || field?.name || "")
          )}
      </span>
      {editFieldsRole && (
        <button
          onClick={() => {
            search.set("selectedField", field?.id);
            setSearch(search);
          }}
        >
          <Edit2Icon size={16} />
        </button>
      )}
    </div>
  );
};

export default FieldItem;
