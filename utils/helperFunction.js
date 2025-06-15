// This file will contain general utility and helper functions

export const formatCurrency = (value) => {
  return `Rp ${new Intl.NumberFormat("id-ID").format(value)}`;
};

// You can add other helper functions here as needed
/*
export const calculatePercentage = (current, target) => {
  if (target === 0) return 0;
  return (current / target) * 100;
};
*/
