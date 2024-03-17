import PageTemplate from "@/templates/page-template";
import Page from "./page";

const BloodCollection = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Blood Collection",
        },
      ]}
      title="Blood Collection"
    >
      <Page />
    </PageTemplate>
  );
};

export default BloodCollection;
