import { useSearchParams } from "react-router-dom";

import PageTemplate from "@/templates/page-template";
import Page from "./page";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const OrganisationUnits = () => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { createOrganisationUnitsRole } = getRoles(me?.roles || []);
  return (
    <PageTemplate
      title="Organisation Units"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Organisation Units",
        },
      ]}
      titleActions={
        createOrganisationUnitsRole ? (
          <Button
            className="gap-2"
            onClick={() => {
              search.set("selectedUnit", "new");
              setSearch(search);
            }}
          >
            <PlusIcon size={18} /> Add Unit
          </Button>
        ) : undefined
      }
    >
      <Page />
    </PageTemplate>
  );
};

export default OrganisationUnits;
