import PageTemplate from "@/templates/page-template";
import Page from "./page";

const CashDisbursement = () => {
  return (
    <PageTemplate
      breadCrumb={[
        {
          label: "Dashboard",
          to: "/dashboard",
        },
        {
          label: "Cash Disbursement",
        },
      ]}
      title="Cash Disbursement"
    >
      <Page />
    </PageTemplate>
  );
};

export default CashDisbursement;
