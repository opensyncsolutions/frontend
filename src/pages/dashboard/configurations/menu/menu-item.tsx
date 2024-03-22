import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import DeleteMenu from "./delete-menu";
import { useSearchParams } from "react-router-dom";

const selectedMenuToEdit = "selectedMenuToEdit";

const MenuItem = ({ menu }: { menu: Menu }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [search, setSearch] = useSearchParams();
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-sm">{menu?.displayName}</span>
        <span className="text-xs">Path: {menu?.path}</span>
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
