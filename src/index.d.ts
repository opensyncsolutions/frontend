// Start API
type ApiError = AxiosError<{
  message:
    | string
    | {
        response: {
          data: {
            msg?: string;
            message?: string;
          };
          status: number;
        };
      };
}>;

interface User {
  id: strung;
  created: string;
  updated: string;
  lastLogin: string;
  username: string;
  dp: string;
  name: string;
  active: boolean;
}

interface TotalEligible {
  title: string;
  stat: number;
  value: number;
}

interface TotalNonEligible {
  title: string;
  stat: number;
  value: number;
}

interface TotalFollowups {
  title: string;
  stat: number;
  value: number;
}

interface DashboardSummaryType {
  totalEnrolled: number;
  totalEligible: TotalEligible;
  totalNonEligible: TotalNonEligible;
  totalFollowups: TotalFollowups;
}

interface EnrollmentSummaryResponse {
  clinics: string[];
  total_eligible: string[];
  totoal_non_eligible: string[];
}

interface CashDisbursementSummaryResponse {
  amount: string[];
  clinic_name: string[];
  clinics: string[];
  frequency: string[];
}

interface Paginate {
  page: number;
  pageSize: number;
}

interface Enrollment {
  id: string;
  created: string;
  updated: string;
  status: string;
  ctcId: string;
  recentVisit: string;
  participantConsent: boolean;
  informedConsent: boolean;
  followupConsent: boolean;
  fundsConfirmation: boolean;
  firstName: string;
  surname: string;
  dob: string;
  mainConsentStudy: boolean;
  consentToBeContacted: boolean;
  completeBaselineSurvey: boolean;
  currentEnrolled: boolean;
  gender: string;
}

// End API

// Start UI
type BreadCrumb = {
  label: string;
  to?: string;
  disabled?: boolean;
};

interface Pagination {
  page: number | undefined;
  pageSize: number | undefined;
  total: number | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
  fetching: boolean;
}

interface GraphObject {
  name: string;
  uv: number;
  pv?: number;
}

// End UI
