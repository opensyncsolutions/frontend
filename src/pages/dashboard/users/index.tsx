import { Button } from "@/components/ui/button";
import PageTemplate from "@/templates/page-template";
import Page from "./page";

const Users = () => {
  return (
    <PageTemplate title="Users" titleActions={<Button>Add User</Button>}>
      <Page />
    </PageTemplate>
  );
};

export default Users;
