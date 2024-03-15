import PageTemplate from "@/templates/page-template";
import Roles from "./roles";
import Privileges from "./privileges";

const RolesPrivileges = () => {
  return (
    <PageTemplate
      title="Roles and Privileges"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Roles and Privileges",
        },
      ]}
    >
      <div className="space-y-8">
        <Roles />
        <Privileges />
      </div>
    </PageTemplate>
  );
};

export default RolesPrivileges;
