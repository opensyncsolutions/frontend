import { useEnrollement } from "@/shared/services/enrollments";

const EditEnrollment = ({ id }: { id: string }) => {
  const {} = useEnrollement(id);
  return <div>EditEnrollment</div>;
};

export default EditEnrollment;
