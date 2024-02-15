import { Button } from "@/components/ui/button";
import PageTemplate from "@/templates/page-template";

const Users = () => {
  return (
    <PageTemplate title="Users" titleActions={<Button>Add User</Button>}>
      Hello users
    </PageTemplate>
  );
};

export default Users;
