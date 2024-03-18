import PageTemplate from "@/templates/page-template";
import Menu from "./menu";

const Configurations = () => {
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
      <Menu />
    </PageTemplate>
  );
};

export default Configurations;
