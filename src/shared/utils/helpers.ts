export const formatErrorMessage = (error: ApiError): string => {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message
  );
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
