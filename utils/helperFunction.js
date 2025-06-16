// This file will contain general utility and helper functions

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
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(itemDate);
  }
};

// You can add other helper functions here as needed
/*
export const calculatePercentage = (current, target) => {
  if (target === 0) return 0;
  return (current / target) * 100;
};
*/
