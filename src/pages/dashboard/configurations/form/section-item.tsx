import { Edit2Icon, Trash2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { useLanguage } from "@/shared/contexts/languages";
import { useState } from "react";
import DeleteSection from "./delete-section";
import { getRoles } from "@/shared/utils/roles";
import { useGetMe } from "@/shared/services/auth";

const SectionItem = ({
  section,
  refetch,
}: {
  section?: Section;
  refetch: () => void;
}) => {
  const [search, setSearch] = useSearchParams();
  const [deleteSection, setDeleteSection] = useState(false);
  const { language } = useLanguage();

  const { me } = useGetMe();
  const { editSectionsRole, deleteSectionsRole } = getRoles(me?.roles || []);

  return (
    <div className="flex items-center justify-between w-[calc(100%-32px)] gap-2">
      <span className="truncate font-bold">
        {section?.translations?.[language]?.code ||
          section?.code ||
          "Unnamed Section"}
      </span>
      {section && (
        <div className="flex items-center gap-3">
          {editSectionsRole && (
            <button
              onClick={() => {
                search.set("selectedSection", section?.id);
                setSearch(search);
              }}
            >
              <Edit2Icon size={16} />
            </button>
          )}
          {deleteSectionsRole && (
            <button
              onClick={() => setDeleteSection(true)}
              className="text-red-500"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
      <DeleteSection
        name={section?.translations?.[language]?.code || section?.code || ""}
        cb={(shouldRefetch) => {
          if (shouldRefetch) refetch();
          setDeleteSection(false);
        }}
        id={deleteSection ? section?.id || "" : ""}
      />
    </div>
  );
};

export default SectionItem;
