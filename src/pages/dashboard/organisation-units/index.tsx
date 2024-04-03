import PageTemplate from "@/templates/page-template";

const OrganisationUnits = () => {
  return (
    <PageTemplate
      title="Organisation Units"
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Organisation Units",
        },
      ]}
    >
      Hello Objectives
    </PageTemplate>
  );
};

export default OrganisationUnits;
