import PageTemplate from "@/templates/page-template";
import Roles from "./roles";
import Privileges from "./privileges";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";

const RolesPrivileges = () => {
  const { me } = useGetMe();
  const { readRolesRole, readAuthorityRole } = getRoles(me?.roles || []);
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
        {readRolesRole && <Roles />}
        {readAuthorityRole && <Privileges />}
      </div>
    </PageTemplate>
  );
};

export default RolesPrivileges;
