import { Button } from "@/components/ui/button";
import PageTemplate from "@/templates/page-template";
import Page from "./page";
import { useSearchParams } from "react-router-dom";

const Users = () => {
  const [search, setSearch] = useSearchParams();
  return (
    <PageTemplate
      title="Users"
      titleActions={
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
      }
    >
      <Page />
    </PageTemplate>
  );
};

export default Users;
