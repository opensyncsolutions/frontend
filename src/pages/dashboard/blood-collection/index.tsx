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
          label: "Blood Collections",
        },
      ]}
      title="Blood Collections"
    >
      <Page />
    </PageTemplate>
  );
};

export default BloodCollection;
