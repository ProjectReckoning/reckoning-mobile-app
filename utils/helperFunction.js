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
    return "";
  }

  const monthIndex = date.getMonth();
  const monthData = MOCK_MONTH_DATA.find(
    (item) => item.value === monthIndex + 1,
  );

  return monthData ? monthData.month : "";
}

export function formatDateWithMonthAbbreviation(dateInput) {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Invalid date input provided to date formatter:", dateInput);
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = getMonthAbbreviation(date);
  const year = date.getFullYear();

  const customFormattedString = `${day} ${month} ${year}`;

  return customFormattedString;
}

export function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatDigitCurrency(value) {
  if (!value) return "";
  const numeric = value.replace(/\D/g, "");
  return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function maskBalance(value) {
  const digits = value.toString().replace(/\D/g, "").length;
  return "Rp" + "*".repeat(digits);
}

export function maskPocketId(id, numDigits) {
  if (!id) return "";
  const visible = id.slice(-numDigits);
  return "*".repeat(id.length - numDigits) + visible;
}
