// This file will contain general utility and helper functions
import { MOCK_MONTH_DATA } from "@/utils/mockData/monthMockData";

export const formatCurrency = (value) => {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
};

export const formatDateForHeader = (dateString) => {
  const today = new Date("2025-06-16"); // Hardcoding current date for mock data consistency
  const itemDate = new Date(dateString);

  today.setHours(0, 0, 0, 0);
  itemDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - itemDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today"; // Assuming '2025-06-16' is "Today"
  } else if (diffDays === 1) {
    return "Yesterday"; // Assuming '2025-06-15' is "Yesterday"
  } else {
    return new Intl.DateTimeFormat("id-ID", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(itemDate);
  }
};

export function formatToLocalizedDate(
  dateInput,
  options = { day: "numeric", month: "long", year: "numeric" },
  locale = "id-ID",
) {
  // Ensure the dateInput is a Date object. If it's a string, parse it.
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  // Check for invalid dates. An invalid Date object will result in "Invalid Date".
  if (isNaN(date.getTime())) {
    console.error(
      "Invalid date input provided to formatToLocalizedDate:",
      dateInput,
    );
    return "Invalid Date"; // Or return an empty string, or throw an error
  }

  try {
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Formatting Error"; // Handle potential formatting errors
  }
}

export function getMonthAbbreviation(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error(
      "Invalid date input provided to getMonthAbbreviation:",
      dateInput,
    );
    return ""; // Return empty string for invalid dates
  }

  // getMonth() returns 0 for January, 11 for December.
  // MOCK_MONTH_DATA values are 1-12, so add 1 to the month index.
  const monthIndex = date.getMonth(); // 0-11
  const monthData = MOCK_MONTH_DATA.find(
    (item) => item.value === monthIndex + 1,
  );

  return monthData ? monthData.month : "";
}

export function formatDateWithMonthAbbreviation(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Invalid date input provided to date formatter:", dateInput);
    return ""; // Return empty string for invalid dates
  }

  const day = date.getDate(); // Get day number
  const month = getMonthAbbreviation(date); // Get "Jul"
  const year = date.getFullYear(); // Get year number

  const customFormattedString = `${day} ${month} ${year}`;

  return customFormattedString;
}

// You can add other helper functions here as needed
/*
export const calculatePercentage = (current, target) => {
  if (target === 0) return 0;
  return (current / target) * 100;
};
*/
