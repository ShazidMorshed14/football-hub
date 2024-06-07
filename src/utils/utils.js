export const isArrayAndHasContent = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

export const isObjectAndHasProperties = (obj) => {
  return obj !== null && typeof obj === "object" && Object.keys(obj).length > 0;
};

export const convertToMillion = (number) => {
  if (typeof number !== "number") {
    throw new Error("Input must be a number");
  }

  // Check if the number is in the millions
  if (number >= 1000000) {
    const millionValue = number / 1000000;
    return `${millionValue.toFixed(1)}`;
  }

  // If the number is less than a million, return it as is
  return number;
};
