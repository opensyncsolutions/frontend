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
  roles?: Role[];
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

interface FollowUp {
  id: string;
  created: string;
  updated: string;
  createdBy: User;
  enrollment: Enrollment;
  nextVisit?: string;
  firstReturn?: string;
}

type Disbursement = {
  id: string;
  created: string;
  updated: string;
  amount: number;
  transid: string;
  utilityref: string;
  createdBy: User;
};

type DataCollection = {
  id: string;
  created: string;
  updated: string;
  midlineHvlStatus: string;
  baselineSurveyStatus: string;
  endlineSurveyStatus: string;
};

type BloodCollection = {
  id: string;
  created: string;
  updated: string;
  mdhCollection: string;
  result: string;
  resultDate: string;
};

interface Field {
  id: string;
  code: string;
  value: string;
  name: string;
  mandatory: boolean;
  type: "DATE" | "BOOLEAN" | "TEXT" | "NUMBER";
  description?: string;
  sortOrder: number;
  options: Record<"name" | "value", string>[];
  translations?: Record<
    Languages,
    Record<"name" | "code" | "description", string>
  >;
}

interface Section {
  id: string;
  code?: string;
  name?: string;
  sortOrder: number;
  fields?: Field[];
  translations?: Record<Languages, Record<"code" | "name", string>>;
}

interface Role {
  id: string;
  created: string;
  updated: string;
  name: string;
  system: boolean;
  privileges: Privilege[];
}

interface Privilege {
  id: string;
  created: string;
  updated: string;
  system: boolean;
  name: string;
  value: string;
}

interface Menu {
  id: string;
  created: string;
  updated: string;
  path: string;
  sortOrder: number;
  name: string;
  code?: string;
  translations?: Record<Languages, Record<"name", string>>;
}

interface FormResponse {
  id: string;
  name: string;
  code: string;
  translations?: Record<Languages, Record<"name", string>>;
  fields?: Field[];
  sections?: Section[];
}

type Form =
  | "ENROLLMENT"
  | "FOLLOWUP"
  | "DISBURSEMENT"
  | "BLOODCOLLECTION"
  | "DATACOLLECTION"
  | "EAC";

type Fields =
  | "menus"
  | "eacs"
  | "enrollments"
  | "followups"
  | "dataCollections"
  | "bloodCollections"
  | "disbursements"
  | "sections"
  | "fields"
  | "forms";

type FormNames =
  | "Enrollments"
  | "Followups"
  | "Disbursements"
  | "Blood Collections"
  | "Data Collections"
  | "Eacs";

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

interface ValueLabel {
  label: string;
  value: string;
}

interface Filter {
  key: string;
  value: string[];
}

// End UI

// start language
type Languages = "en" | "sw" | "fr";
type LanguagesNames = "English" | "Swahili" | "Franc";

// end language
