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
          label: "Enrollments",
        },
      ]}
      title="Enrollments"
    >
      <Page />
    </PageTemplate>
  );
};

export default Enrollment;
