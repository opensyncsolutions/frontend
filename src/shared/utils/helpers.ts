export const formatErrorMessage = (error: ApiError): string => {
  return (
    error?.response?.data?.msg ||
    error?.response?.data?.message ||
    error?.message
  );
};
