import { useCashDisbursementSummary } from "@/shared/services/summary";
import { PageProps } from "./page";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";
import BarGraph from "@/components/charts/bar-chart";

const CashDisbursement = ({ objective = "" }: PageProps) => {
  const {
    cashDisbursementsSummary,
    cashDisbursementSummaryError,
    cashDisbursementSummaryLoading,
    cashDisbursementSummaryRefetch,
    cashDisbursementSummaryRefething,
  } = useCashDisbursementSummary(objective);
  const loading =
    cashDisbursementSummaryLoading || cashDisbursementSummaryRefething;

  if (loading)
    return (
      <div className="h-60 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (cashDisbursementSummaryError) {
    return (
      <Error
        message={formatErrorMessage(cashDisbursementSummaryError)}
        refetch={() => {
          cashDisbursementSummaryRefetch();
        }}
      />
    );
  }

  if (!cashDisbursementsSummary) {
    return null;
  }

  const data = generateCashDisbursementObjects(cashDisbursementsSummary);

  return (
    <BarGraph
      data={data}
      names={{
        uv: "Clinic Name",
      }}
    />
  );
};

export default CashDisbursement;

export const generateCashDisbursementObjects = (
  data: CashDisbursementSummaryResponse
): GraphObject[] => {
  const result: GraphObject[] = [];

  for (let i = 0; i < data.clinics.length; i++) {
    const clinicObject: GraphObject = {
      name: data.clinics[i],
      uv: Number(data.amount[i]),
    };
    result.push(clinicObject);
  }

  return result;
};
