import PageTemplate from "@/templates/page-template";
import Menu from "./menu";
import { useGetMe } from "@/shared/services/auth";
import { getRoles } from "@/shared/utils/roles";

const Configurations = () => {
  const { me } = useGetMe();
  const { readMenuRole } = getRoles(me?.roles || []);
  return (
    <PageTemplate
      title="Configurations"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Configurations",
        },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {readMenuRole && <Menu />}
      </div>
    </PageTemplate>
  );
};

export default Configurations;
