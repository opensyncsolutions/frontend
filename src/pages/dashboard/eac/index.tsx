import PageTemplate from "@/templates/page-template";
import Page from "./page";

const EAC = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "EAC",
        },
      ]}
      title="EAC"
    >
      <Page />
    </PageTemplate>
  );
};

export default EAC;
