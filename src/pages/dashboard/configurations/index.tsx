import PageTemplate from "@/templates/page-template";

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
      Hello
    </PageTemplate>
  );
};

export default Configurations;
