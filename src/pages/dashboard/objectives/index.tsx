import { PlusIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import PageTemplate from "@/templates/page-template";
import Page from "./page";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";

const Objectives = () => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { createObjectivesRole } = getRoles(me?.roles || []);

  return (
    <PageTemplate
      title="Objectives"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Objectives",
        },
      ]}
      titleActions={
        createObjectivesRole ? (
          <Button
            className="gap-2"
            onClick={() => {
              search.set("selectedObjective", "new");
              setSearch(search);
            }}
          >
            <PlusIcon size={18} /> Add Objective
          </Button>
        ) : undefined
      }
    >
      <Page />
    </PageTemplate>
  );
};

export default Objectives;
