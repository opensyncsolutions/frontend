import PageTemplate from "@/templates/page-template";
import Page from "./page";

const Networks = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Networks",
        },
      ]}
      title="Networks"
    >
      <Page />
    </PageTemplate>
  );
};

export default Networks;
