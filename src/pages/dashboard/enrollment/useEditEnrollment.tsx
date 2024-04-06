import { useEnrollement } from "@/shared/services/enrollments";

export const useEditEnrollment = (id: string) => {
  const {} = useEnrollement(id);
};
