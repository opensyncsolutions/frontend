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

export const separateTextOnCapitalLetter = (name: string): string => {
  return name
    ?.split(".")
    ?.join(" ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase();
};

export const compareArray = (
  arr1: { id: string }[],
  arr2: { id: string }[]
): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((obj, index) => obj.id === arr2[index].id);
};
