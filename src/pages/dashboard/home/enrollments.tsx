import BarGraph from "@/components/charts/bar-chart";
import { PageProps } from "./page";
import { useEnrollmentSummary } from "@/shared/services/summary";
import Loader from "@/components/ui/loader";
import Error from "@/pages/error";
import { formatErrorMessage } from "@/shared/utils/helpers";

const Enrollments = ({ objective = "" }: PageProps) => {
  const {
    clinicEnrollmentSummary,
    clinicEnrollmentSummaryError,
    clinicEnrollmentSummaryLoading,
    clinicEnrollmentSummaryRefetch,
    clinicEnrollmentSummaryRefething,
  } = useEnrollmentSummary(objective);

  if (clinicEnrollmentSummaryLoading || clinicEnrollmentSummaryRefething)
    return (
      <div className="h-60 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (clinicEnrollmentSummaryError) {
    return (
      <Error
        message={formatErrorMessage(clinicEnrollmentSummaryError)}
        refetch={() => {
          clinicEnrollmentSummaryRefetch();
        }}
      />
    );
  }

  if (!clinicEnrollmentSummary) {
    return null;
  }

  const data = generateClinicObjects(clinicEnrollmentSummary);

  return (
    <BarGraph
      data={data}
      names={{
        uv: "Elligible",
        pv: "Non Elligible",
      }}
    />
  );
};

export default Enrollments;

export const generateClinicObjects = (
  data: EnrollmentSummaryResponse
): GraphObject[] => {
  const result: GraphObject[] = [];

  for (let i = 0; i < data.clinics.length; i++) {
    const clinicObject: GraphObject = {
      name: data.clinics[i],
      uv: Number(data.total_eligible[i]),
      pv: Number(data.totoal_non_eligible[i]),
    };
    result.push(clinicObject);
  }

  return result;
};
