import PageTemplate from "@/templates/page-template";
import Page from "./page";

const DataCollection = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Data Collection",
        },
      ]}
      title="data Collection"
    >
      <Page />
    </PageTemplate>
  );
};

export default DataCollection;
