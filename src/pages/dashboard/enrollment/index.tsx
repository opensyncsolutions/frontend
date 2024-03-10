import PageTemplate from "@/templates/page-template";
import Page from "./page";

const Enrollment = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Enrollment",
        },
      ]}
      title="Enrollment"
    >
      <Page />
    </PageTemplate>
  );
};

export default Enrollment;
