import PageTemplate from "@/templates/page-template";
import Page from "./page";

const FollowUp = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Followup",
        },
      ]}
      title="Followup"
    >
      <Page />
    </PageTemplate>
  );
};

export default FollowUp;
