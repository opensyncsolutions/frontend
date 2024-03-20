import { Button } from "@/components/ui/button";
import PageTemplate from "@/templates/page-template";
import Page from "./page";
import { useSearchParams } from "react-router-dom";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";

const Users = () => {
  const [search, setSearch] = useSearchParams();
  const { me } = useGetMe();
  const { createUsersRole } = getRoles(me?.roles || []);
  return (
    <PageTemplate
      title="Users"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Users",
        },
      ]}
      titleActions={
        createUsersRole && (
          <Button
            onClick={() => {
              if (search.get("selected")) {
                search.delete("selected");
              }
              search.append("selected", "new");
              setSearch(search);
            }}
          >
            Add User
          </Button>
        )
      }
    >
      <Page />
    </PageTemplate>
  );
};

export default Users;
