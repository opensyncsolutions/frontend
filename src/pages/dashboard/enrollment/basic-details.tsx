import { format } from "date-fns";

import TitleDetailItem from "@/components/ui/title-detail-item";
import { DATE_FORMAT, DATE_TIME_FORMAT } from "@/shared/constants/constants";
import { useEnrollement } from "@/shared/services/enrollments";

const BasicDetails = ({ id }: { id: string }) => {
  const { enrollment } = useEnrollement(id);
  return (
    <div className="space-y-4">
      <h3 className="font-bold">Basic Details</h3>
      <div className="border rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {enrollment?.firstName && (
          <TitleDetailItem title="First Name" content={enrollment?.firstName} />
        )}
        {enrollment?.middleName && (
          <TitleDetailItem
            title="Middle Name"
            content={enrollment?.middleName}
          />
        )}
        {enrollment?.surname && (
          <TitleDetailItem title="Surname" content={enrollment?.surname} />
        )}
        {enrollment?.nickName && (
          <TitleDetailItem title="Nick Name" content={enrollment?.nickName} />
        )}
        {enrollment?.motherName && (
          <TitleDetailItem
            title="Mother's name"
            content={enrollment?.motherName}
          />
        )}
        {enrollment?.enrollmentDate && (
          <TitleDetailItem
            title="Enrollment Date"
            content={format(enrollment?.enrollmentDate, DATE_FORMAT)}
          />
        )}
        {enrollment?.created && (
          <TitleDetailItem
            title="Created"
            content={format(enrollment?.created, DATE_TIME_FORMAT)}
          />
        )}
        {enrollment?.updated && (
          <TitleDetailItem
            title="Updated"
            content={format(enrollment?.updated, DATE_TIME_FORMAT)}
          />
        )}
        {enrollment?.status && (
          <TitleDetailItem title="Status" content={enrollment?.status} />
        )}
      </div>
      <div className="border rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {enrollment?.village && (
          <TitleDetailItem title="Village" content={enrollment?.village} />
        )}

        {enrollment?.ctcId && (
          <TitleDetailItem title="CTC ID" content={enrollment?.ctcId} />
        )}
        {enrollment?.studyId && (
          <TitleDetailItem title="STudy ID" content={enrollment?.studyId} />
        )}
        {enrollment?.screeningId && (
          <TitleDetailItem
            title="Screening ID"
            content={enrollment?.screeningId}
          />
        )}
        {enrollment?.organisationUnit && (
          <TitleDetailItem
            title="Organisation Unit"
            content={enrollment?.organisationUnit?.name}
          />
        )}
        {enrollment?.objective && (
          <TitleDetailItem
            title="Objective"
            content={enrollment?.objective?.name}
          />
        )}
        {enrollment?.createdBy && (
          <TitleDetailItem
            title="Created By"
            content={enrollment?.createdBy?.name}
          />
        )}
        {enrollment?.updatedBy && (
          <TitleDetailItem
            title="Updated By"
            content={enrollment?.updatedBy?.name}
          />
        )}
        {enrollment?.recentVisit && (
          <TitleDetailItem
            title="Recent Visit"
            content={format(enrollment?.recentVisit, DATE_FORMAT)}
          />
        )}
        {enrollment?.hbcName && (
          <TitleDetailItem title="HBC Name" content={enrollment?.hbcName} />
        )}
        {enrollment?.hbcNumber && (
          <TitleDetailItem title="HBC Number" content={enrollment?.hbcNumber} />
        )}
        {enrollment?.landmark && (
          <TitleDetailItem title="Landmark" content={enrollment?.landmark} />
        )}
        {enrollment?.dob && (
          <TitleDetailItem
            title="DOB"
            content={format(enrollment?.dob, DATE_FORMAT)}
          />
        )}
        {enrollment?.gender && (
          <TitleDetailItem title="Gender" content={enrollment?.gender} />
        )}
        {enrollment?.appointment && (
          <TitleDetailItem
            title="Appointment"
            content={format(enrollment?.appointment, DATE_FORMAT)}
          />
        )}
        {enrollment?.scheduledReturn && (
          <TitleDetailItem
            title="Scheduled Return"
            content={format(enrollment?.scheduledReturn, DATE_FORMAT)}
          />
        )}
        {enrollment?.assessmentDate && (
          <TitleDetailItem
            title="Assessment Date"
            content={format(enrollment?.assessmentDate, DATE_FORMAT)}
          />
        )}
        {enrollment?.viralLoadDate && (
          <TitleDetailItem
            title="Viral Load Date"
            content={format(enrollment?.viralLoadDate, DATE_FORMAT)}
          />
        )}
        {enrollment?.counsellingDate && (
          <TitleDetailItem
            title="Counselling Date"
            content={format(enrollment?.counsellingDate, DATE_FORMAT)}
          />
        )}
        {enrollment?.clinicalInterventionVisit && (
          <TitleDetailItem
            title="Clinical Intervention Visit"
            content={format(enrollment?.clinicalInterventionVisit, DATE_FORMAT)}
          />
        )}
        {enrollment?.clinicalControlVisit && (
          <TitleDetailItem
            title="Clinical Control Visit"
            content={format(enrollment?.clinicalControlVisit, DATE_FORMAT)}
          />
        )}
      </div>
      <div className="border rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {typeof enrollment?.participantConsent === "boolean" && (
          <TitleDetailItem
            title="Participant Consent"
            content={enrollment?.participantConsent ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.informedConsent === "boolean" && (
          <TitleDetailItem
            title="Informed Consent"
            content={enrollment?.informedConsent ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.followupConsent === "boolean" && (
          <TitleDetailItem
            title="Followup Consent"
            content={enrollment?.followupConsent ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.fundsConfirmation === "boolean" && (
          <TitleDetailItem
            title="Funds Confirmation"
            content={enrollment?.fundsConfirmation ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.mainConsentStudy === "boolean" && (
          <TitleDetailItem
            title="Main Consent Study"
            content={enrollment?.mainConsentStudy ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.consentToBeContacted === "boolean" && (
          <TitleDetailItem
            title="Consent To Be Contacted"
            content={enrollment?.consentToBeContacted ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.completeBaselineSurvey === "boolean" && (
          <TitleDetailItem
            title="Completed Baseline Survey"
            content={enrollment?.completeBaselineSurvey ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.currentEnrolled === "boolean" && (
          <TitleDetailItem
            title="Current Enrolled"
            content={enrollment?.currentEnrolled ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.mobileAccess === "boolean" && (
          <TitleDetailItem
            title="Mobile Access"
            content={enrollment?.mobileAccess ? "Yes" : "No"}
          />
        )}
        {typeof enrollment?.returnMobileNumber === "boolean" && (
          <TitleDetailItem
            title="Return Mobile Number"
            content={enrollment?.returnMobileNumber ? "Yes" : "No"}
          />
        )}
      </div>
      {/* {enrollment?.phones?.length ? (
        <div className="border rounded p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {enrollment?.phones?.map((phone, index) => {
            return (
              <TitleDetailItem
                title={`Phone ${index + 1}`}
                key={index}
                content={phone?.phone}
              />
            );
          })}
        </div>
      ) : null} */}
    </div>
  );
};

export default BasicDetails;
