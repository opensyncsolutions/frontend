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
  id: string;
  user_id: number;
  full_name: string;
  email: string;
  active: boolean;
  is_logged_in: boolean;
  fcm_id?: number | string | null;
  current_administrative_area_type_id?: number | string | null;
  rand_tokens?: string | null;
  mobile?: string | number | null;
  assigned_clinic_id?: number | string | null;
  assigned_region_id?: number | string | null;
  PIN?: number | string | null;
  device_id?: string | null;
  remember_token?: string;
  created_at: string;
  updated_at: string;
  role_id: string;
  permission: string[];
  role: Record<string, string | number | boolean>;
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
  regionID: string;
  districtID: string;
  wardID: string;
  clinicID: string;
  enrolled_clinicID: string;
  studyID: string;
  CTC_ID: string;
  DCID: string;
  recent_attended_visit: string;
  participant_consent: string;
  nearest_landmark: string;
  street_village: string;
  informed_consent: string;
  send_funds_confirmation: string;
  first_name: string;
  middle_name: string;
  sur_name: string;
  nick_name: string | null;
  gender: string;
  someone_else_number: string | null;
  mobile_phone_access: string;
  mobile_money_access: string;
  informed_consent_followup: string;
  mobile_money_number: string | null;
  mobile_network_id: string | null;
  phone_one: string;
  phone_two: string | null;
  phone_three: string | null;
  phone_four: string | null;
  phone_five: string | null;
  DOB: string;
  recent_scheduled_appointment: string;
  hbc_name: string;
  hbc_number: string;
  enrollment_date: string;
  version: string;
  startdate: string;
  enddate: string;
  reenter_CTC_ID: string;
  screening_id: string;
  reenter_screening_id: string;
  scheduled_return_to_care: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  mother_name: string | null;
  objective: number;
  full_name: string;
  district: {
    id: string;
    district_name: string;
  };
  ward: {
    id: string;
    ward_name: string;
  };
  clinic: {
    id: string;
    name: string;
    cash_status: string;
  };
  enrolled_clinic: {
    id: string;
    name: string;
    cash_status: string;
  };
  collector: {
    id: string;
    full_name: string;
  };
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
