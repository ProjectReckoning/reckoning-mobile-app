export const modalData = [
  {
    id: "APPROVAL_REQUIRED",
    title: "Persetujuan Anggota Diperlukan",
    subTitle:
      "Untuk transfer di atas nominal kontribusi yang telah kamu setorkan, diperlukan persetujuan dari semua anggota",
    image: require("@/assets/images/approval.png"), // Added image
    buttons: [
      {
        text: "Ubah Nominal",
      },
      {
        text: "Kirim Permintaan Persetujuan",
      },
    ],
  },
  {
    id: "EXCEEDS_CONTRIBUTION",
    title: "Penarikan Melebihi Kontribusi",
    subTitle:
      "Untuk melanjutkan, silakan sesuaikan nominal penarikan dengan jumlah kontribusi yang telah kamu setor ke pocket ini.",
    image: require("@/assets/images/contribution.png"), // Added image
    buttons: [
      {
        text: "Ubah Nominal",
      },
      {
        text: "Cek saldo pocket",
      },
    ],
  },
  {
    id: "CHANGE_TO_SAVING_POCKET",
    title: "Ganti ke Saving Pocket",
    subTitle:
      "Untuk dapat menetapkan target tabunganmu, kamu perlu mengganti tipe pocket ini dari 'Spending' menjadi 'Saving'.",
    image: require("@/assets/images/targetchange.png"), // Using fallback image
    buttons: [
      {
        text: "Ganti ke Saving",
      },
      {
        text: "Batal",
      },
    ],
  },
  {
    id: "CHANGE_TO_SPENDING_POCKET",
    title: "Ganti ke Spending Pocket",
    subTitle:
      "Untuk menghilangkan target pengeluaranmu, kamu perlu mengganti tipe pocket ini dari 'Saving' menjadi 'Spending'.",
    image: require("@/assets/images/approval.png"), // Using fallback image
    buttons: [
      {
        text: "Ganti ke Spending",
      },
      {
        text: "Batal",
      },
    ],
  },
  {
    id: "BUSINESS_APPROVAL_REQUIRED",
    title: "Persetujuan Admin Diperlukan",
    subTitle: "Transfer ini memerlukan persetujuan dari semua admin",
    image: require("@/assets/images/approval.png"), // Added image
    buttons: [
      {
        text: "Kirim Permintaan Persetujuan",
      },
      {
        text: "Ubah Nominal",
      },
    ],
  },
];
