export const formatErrorMessage = (error: ApiError): string => {
  return (
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.message
  );
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const separateTextOnCapitalLetter = (displayName: string): string => {
  return displayName
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase();
};
