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

export const compareArray = (arr1: any[], arr2: any[]): boolean => {
  // Convert arrays to sets
  const set1 = new Set(arr1.map((obj) => JSON.stringify(obj)));
  const set2 = new Set(arr2.map((obj) => JSON.stringify(obj)));
  if (set1.size !== set2.size) {
    return false;
  }

  // Check if all elements in set1 are in set2
  for (const elem of set1) {
    if (!set2.has(elem)) {
      return false;
    }
  }

  // If sets have the same elements, return true
  return true;
};
