import dayjs from "dayjs";
import { countryList } from "../constants/countries";
import { clubList } from "../constants/clubs";

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

export function calculateAgeFromUnixTimestamp(timestamp) {
  // Convert Unix timestamp to a Day.js object
  const birthday = dayjs.unix(timestamp);

  // Current date
  const currentDate = dayjs();

  // Calculate age
  const age = currentDate.diff(birthday, "year");

  return age;
}

export function getPlayerCountryDetails(id) {
  if (!id) return null;

  let countryDetails = countryList.filter((c) => c.id == id);

  let result = isArrayAndHasContent(countryDetails) ? countryDetails[0] : null;

  return result;
}

export function getPlayerClubDetails(id) {
  if (!id) return null;

  let clubDetails = clubList.filter((c) => c.id == id);

  let result = isArrayAndHasContent(clubDetails) ? clubDetails[0] : null;

  return result;
}

export function createFormationObject(formationString) {
  // Split the formation string into an array of numbers
  const formationArray = formationString.split("-").map(Number);

  // Create the object with the counts of each position
  const formationObject = {
    DEFENDER: formationArray[0] || 0,
    MIDFIELDER: formationArray[1] || 0,
    FORWARD: formationArray[2] || 0,
    GOALKEEPER: 1, // Goalkeeper is always 1
  };

  return formationObject;
}

const generatedIds = new Set();

export function generateUniqueId() {
  while (true) {
    const newId = Math.floor(1000 + Math.random() * 9000);
    if (!generatedIds.has(newId)) {
      generatedIds.add(newId);
      return newId;
    }
  }
}
