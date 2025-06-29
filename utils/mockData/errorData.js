export const modalData = [
  {
    id: "APPROVAL_REQUIRED",
    title: "Persetujuan Anggota Diperlukan",
    subTitle:
      "Untuk transfer di atas nominal kontribusi yang telah kamu setorkan, diperlukan persetujuan dari semua anggota",
    buttons: [
      {
        text: "Ubah Nominal", //ini balik lagi ke halaman input nominal dia sama kaya batal aja si
      },
      {
        text: "Kirim Permintaan Persetujuan", // ini bakal kirim permintaan persetujuan ke anggota lain
      },
    ],
  },
  {
    id: "EXCEEDS_CONTRIBUTION",
    title: "Penarikan Melebihi Kontribusi",
    subTitle:
      "Untuk melanjutkan, silakan sesuaikan nominal penarikan dengan jumlah kontribusi yang telah kamu setor ke pocket ini.",
    buttons: [
      {
        text: "Ubah Nominal", // ini balik lagi ke halaman input nominal dia sama kaya batal aja si
      },
      {
        text: "Cek saldo pocket", // ini bakal redirect ke halaman pocket detail balance
      },
    ],
  },
  {
    id: "CHANGE_TO_SAVING_POCKET",
    title: "Ganti ke Saving Pocket",
    subTitle:
      "Untuk dapat menetapkan target tabunganmu, kamu perlu mengganti tipe pocket ini dari 'Spending' menjadi 'Saving'.",
    buttons: [
      {
        text: "Ganti ke Saving", // ini bakal keganti ke tipe saving langsung dengan ada presentase targetnya
      },
      {
        text: "Batal", // gajadi apa-apa, balik ke halaman balance pocket
      },
    ],
  },
  {
    id: "CHANGE_TO_SPENDING_POCKET",
    title: "Ganti ke Spending Pocket",
    subTitle:
      "Untuk menghilangkan target pengeluaranmu, kamu perlu mengganti tipe pocket ini dari 'Saving' menjadi 'Spending'.",
    buttons: [
      {
        text: "Ganti ke Spending", // ini bakal keganti ke tipe spending gaada targetnya
      },
      {
        text: "Batal", // gajadi apa-apa, balik ke halaman balance pocket
      },
    ],
  },
];
