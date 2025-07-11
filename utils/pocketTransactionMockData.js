// transactionMockData.js
// This file contains mock transaction data for history.

import { MEMBER_MOCK_DATA } from "./pocketMemberMockData";

// --- Original TRANSACTION_MOCK_DATA, now with years updated to 2025 ---
export const TRANSACTION_MOCK_DATA_ALL_YEARS = [
  // --- June 2025 (was June 2024) ---
  {
    id: "txn_20250601",
    date: "2025-06-05", // Updated year
    description: "Deposit Gaji Bulanan",
    amount: 15000000,
    type: "deposit",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250602",
    date: "2025-06-05", // Updated year, Same day as above
    description: "Pembayaran Listrik",
    amount: 750000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250603",
    date: "2025-06-10",
    description: "Beli Tiket Konser",
    amount: 1200000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[2].id, // FARREL BRIAN RAFI
  },
  {
    id: "txn_20250604",
    date: "2025-06-12",
    description: "Top-up E-Wallet",
    amount: 250000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250605", // Adding a new transaction for today's date (June 16, 2025)
    date: "2025-06-16",
    description: "Pembelian Kopi",
    amount: 45000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250606", // Adding another transaction for yesterday's date (June 15, 2025)
    date: "2025-06-15",
    description: "Makan Malam",
    amount: 200000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },

  // --- May 2025 (was May 2024) ---
  {
    id: "txn_20250501",
    date: "2025-05-01", // Updated year
    description: "Pembelian Buku",
    amount: 150000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[1].id, // DAFFA HAFIIZH PERMADI
  },
  {
    id: "txn_20250502",
    date: "2025-05-10", // Updated year
    description: "Transfer ke Sahabat",
    amount: 500000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250503",
    date: "2025-05-15", // Updated year
    description: "Pembayaran Langganan Streaming",
    amount: 100000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[3].id, // IVANKA LARASATI
  },
  {
    id: "txn_20250504",
    date: "2025-05-20", // Updated year
    description: "Pengembalian Dana Online Shop",
    amount: 300000,
    type: "deposit",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },

  // --- April 2025 (was April 2024) ---
  {
    id: "txn_20250401",
    date: "2025-04-03", // Updated year
    description: "Makan Siang Restoran",
    amount: 120000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250402",
    date: "2025-04-10", // Updated year
    description: "Pengeluaran Transportasi",
    amount: 50000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[4].id, // JOHN DOE
  },
  {
    id: "txn_20250403",
    date: "2025-04-10", // Updated year, Same day as above
    description: "Pembelian Groceries",
    amount: 800000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20250404",
    date: "2025-04-25", // Updated year
    description: "Bonus Kinerja",
    amount: 2000000,
    type: "deposit",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },

  // --- March 2025 (was March 2024) ---
  {
    id: "txn_20250301",
    date: "2025-03-15", // Updated year
    description: "Pembayaran Internet Bulanan",
    amount: 300000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[5].id, // SARAH MITCHELL
  },
  {
    id: "txn_20250302",
    date: "2025-03-20", // Updated year
    description: "Deposit dari Tabungan",
    amount: 1000000,
    type: "deposit",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },

  // --- February 2025 (was February 2024) ---
  {
    id: "txn_20250201",
    date: "2025-02-08", // Updated year
    description: "Pembelian Pulsa",
    amount: 50000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  // --- January 2025 (example of new data for a past month in the 1-year look back) ---
  {
    id: "txn_20250101",
    date: "2025-01-10",
    description: "Donasi Amal",
    amount: 100000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  // --- December 2024 (example of data for a previous year in the 1-year look back) ---
  {
    id: "txn_20241201",
    date: "2024-12-01",
    description: "Bayar Cicilan Mobil",
    amount: 3000000,
    type: "withdrawal",
    memberId: MEMBER_MOCK_DATA[0].id, // ME
  },
  {
    id: "txn_20241202",
    date: "2024-12-15",
    description: "Pengembalian Pinjaman",
    amount: 500000,
    type: "deposit",
    memberId: MEMBER_MOCK_DATA[1].id, // DAFFA
  },
];

// Add destination_account_id based on transaction type for the full dataset
TRANSACTION_MOCK_DATA_ALL_YEARS.forEach((transaction) => {
  if (transaction.type === "deposit") {
    transaction.destination_account_id = "1"; // Incoming
  } else if (transaction.type === "withdrawal") {
    transaction.destination_account_id = "2"; // Outgoing
  }
});

// Helper function to map internal type/amount to BE format
const formatTransactionForBE = (transaction) => {
  const beType = transaction.type === "deposit" ? "Contribution" : "Withdrawal";
  const beTransactionType = transaction.type === "deposit" ? 1 : 0;
  const beAmount =
    transaction.type === "withdrawal"
      ? -transaction.amount
      : transaction.amount;

  return {
    id: parseInt(transaction.id.replace("txn_", "")), // Convert id to number if BE expects number
    type: beType,
    transaction_type: beTransactionType,
    amount: beAmount,
    description: transaction.description,
    is_business_expense: false, // Always false as per instruction
  };
};

// --- Mock Data for a Backend Response (e.g., when 'June 2025' is selected) ---
// This assumes the backend returns an array of sections, already grouped by date.
export const TRANSACTIONS_GROUPED_FOR_JUNE_2025 = [
  {
    date: "2025-06-16",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250605",
        date: "2025-06-16",
        description: "Pembelian Kopi",
        amount: 45000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "2",
      }),
    ],
  },
  {
    date: "2025-06-15",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250606",
        date: "2025-06-15",
        description: "Makan Malam",
        amount: 200000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "2",
      }),
    ],
  },
  {
    date: "2025-06-12",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250604",
        date: "2025-06-12",
        description: "Top-up E-Wallet",
        amount: 250000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "2",
      }),
    ],
  },
  {
    date: "2025-06-10",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250603",
        date: "2025-06-10",
        description: "Beli Tiket Konser",
        amount: 1200000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[2].id,
        destination_account_id: "2",
      }),
    ],
  },
  {
    date: "2025-06-05",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250601",
        date: "2025-06-05",
        description: "Deposit Gaji Bulanan",
        amount: 15000000,
        type: "deposit",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "1",
      }),
      formatTransactionForBE({
        id: "txn_20250602",
        date: "2025-06-05",
        description: "Pembayaran Listrik",
        amount: 750000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "2",
      }),
    ],
  },
];

// Example of what the backend might send for another month, e.g., May 2025
export const TRANSACTIONS_GROUPED_FOR_MAY_2025 = [
  {
    date: "2025-05-20",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250504",
        date: "2025-05-20",
        description: "Pengembalian Dana Online Shop",
        amount: 300000,
        type: "deposit",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "1",
      }),
    ],
  },
  {
    date: "2025-05-15",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250503",
        date: "2025-05-15",
        description: "Pembayaran Langganan Streaming",
        amount: 100000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[3].id,
        destination_account_id: "2",
      }),
    ],
  },
  {
    date: "2025-05-10",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250502",
        date: "2025-05-10",
        description: "Transfer ke Sahabat",
        amount: 500000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[0].id,
        destination_account_id: "2",
      }),
    ],
  },
  {
    date: "2025-05-01",
    transactions: [
      formatTransactionForBE({
        id: "txn_20250501",
        date: "2025-05-01",
        description: "Pembelian Buku",
        amount: 150000,
        type: "withdrawal",
        memberId: MEMBER_MOCK_DATA[1].id,
        destination_account_id: "2",
      }),
    ],
  },
];
