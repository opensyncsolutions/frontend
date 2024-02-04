type ApiError = AxiosError<{
  message:
    | string
    | {
        response: {
          data: {
            msg: string;
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
  fcm_id: number | string | null;
  current_administrative_area_type_id: number | string | null;
  rand_tokens: string | null;
  mobile: string | number | null;
  assigned_clinic_id: number | string | null;
  assigned_region_id: number | string | null;
  PIN: number | string | null;
  device_id: string | null;
  remember_token: string;
  created_at: string;
  updated_at: string;
  role_id: string;
  permission: string[];
  role: Record<string, string | number | boolean>;
}
