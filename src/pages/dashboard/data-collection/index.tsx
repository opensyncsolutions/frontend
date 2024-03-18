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
          label: "Data Collections",
        },
      ]}
      title="Data Collections"
    >
      <Page />
    </PageTemplate>
  );
};

export default DataCollection;
