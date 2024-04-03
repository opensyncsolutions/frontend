import PageTemplate from "@/templates/page-template";

const Objectives = () => {
  return (
    <PageTemplate
      title="Objectives"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Objectives",
        },
      ]}
    >
      Hello Objectives
    </PageTemplate>
  );
};

export default Objectives;
