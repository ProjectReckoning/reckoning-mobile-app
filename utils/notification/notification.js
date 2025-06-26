export const notificationData = [
  {
    id: "1",
    title: "Pocket Pergi ke Korea 2026",
    description: "Permintaan Persetujuan Penarikan Dana",
    date: "25 Jun 2026",
    type: "transaction_approval_needed",
  },
  {
    id: "2",
    title: "Pocket Liburan ke Jepang 2025",
    description: "Penarikan Dana",
    date: "15 Agu 2025",
    type: "transaction_success",
  },
  {
    id: "3",
    title: "Dana Darurat",
    description: "Transfer Dana",
    date: "03 Mar 2026",
    type: "transaction_success",
  },
  {
    id: "4",
    title: "Beli Laptop Baru",
    description: "Shidqi dihapus dari Pocket.",
    date: "20 Nov 2028",
    type: "information",
  },
  {
    id: "5",
    title: "Pocket Dana Pendidikan Anak",
    description: "Laras keluar dari Pocket.",
    date: "10 Jan 2030",
    type: "information",
  },
  {
    id: "6",
    title: "Pocket Dana Pendidikan Hantu",
    description: "Permintaan persetujuan undang anggota.",
    date: "10 Jan 2030",
    type: "member_approval_needed",
  },
];

export const getUnreadCount = (readIds) =>
  notificationData.filter((item) => !readIds.includes(item.id)).length;
