import PageTemplate from "@/templates/page-template";
import Page from "./page";
import { useSearchParams } from "react-router-dom";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Networks = () => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { createNetworksRole } = getRoles(me?.roles || []);
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Networks",
        },
      ]}
      title="Networks"
      titleActions={
        createNetworksRole ? (
          <Button
            className="gap-2"
            onClick={() => {
              search.set("selectedNetwork", "new");
              setSearch(search);
            }}
          >
            <PlusIcon size={18} /> Add Network
          </Button>
        ) : undefined
      }
    >
      <Page />
    </PageTemplate>
  );
};

export default Networks;
