import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useRef, useState } from "react";
import DeleteMenu from "./delete-menu";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/shared/contexts/languages";
import { useTranslations } from "@/shared/hooks/use-translations";
import { languages } from "@/shared/constants/constants";

const selectedMenuToEdit = "selectedMenuToEdit";

const MenuItem = ({ menu }: { menu: Menu }) => {
  const content = useRef<HTMLDivElement>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { language } = useLanguage();
  const { translate } = useTranslations();
  const [viewMore, setViewMore] = useState(false);
  return (
    <div className="flex justify-between gap-3 w-full">
      <div className="flex flex-col gap-1 items-start w-full">
        <span className="font-bold">
          {menu?.translations?.[language]?.displayName || menu?.displayName}
        </span>
        <span className="text-xs">
          {translate("Path")}: /{menu?.path}
        </span>
        <div
          ref={content}
          style={{
            maxHeight: viewMore ? content.current?.scrollHeight : "0px",
            overflowY: "hidden",
            transition: "max-height 0.15s ease, min-height 0.15s ease",
          }}
          className="w-full"
        >
          <div className="rounded bg-neutral-100 w-full p-3 flex flex-col gap-1">
            <p className="text-sm font-bold">{translate("Translations")}</p>
            {languages.map((lang) => {
              if (!menu?.translations?.[lang?.lang]) {
                return null;
              }
              return (
                <div className="flex gap-1 text-xs">
                  <span>{lang.name}: </span>
                  <span>{menu?.translations?.[lang?.lang].displayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="p-0 text-xs text-primary"
          onClick={() => setViewMore(!viewMore)}
        >
          {!viewMore ? translate("More") : translate("Less")}
        </button>
      </div>
      <div className="flex justify-end items-center">
        <button
          className="px-2 py-2"
          onClick={() => {
            if (search.get(selectedMenuToEdit)) {
              search.delete(selectedMenuToEdit);
            }
            search.append(selectedMenuToEdit, menu?.id);
            setSearch(search);
          }}
        >
          <Edit2Icon size={16} />
        </button>
        <button
          className="px-2 py-2 text-red-500"
          onClick={() => setOpenDelete(true)}
        >
          <Trash2Icon size={16} />
        </button>
      </div>
      <DeleteMenu
        id={openDelete ? menu?.id : ""}
        cb={() => {
          setOpenDelete(false);
        }}
      />
    </div>
  );
};

export default MenuItem;
