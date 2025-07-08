export const notificationData = [
  {
    title: "Korea yuk",
    body: "Permintaan Persetujuan Penarikan Dana",
    data: {
      _id: "1",
      date: "2026-06-25T00:00:00.000Z",
      type: "transaction_approval_needed",
      message:
        "Penarikan ini melebihi jumlah kontribusi anggota ke Shared Pocket.",
      amount: 200000,
      requestedBy: {
        id: 1915615851,
        name: "IVANKA LARASATI KUSUMADEWI",
        category: {
          bank: {
            name: "BNI",
            type: "TAPLUS PEGAWAI BNI",
          },
        },
      },
      pocket: {
        id: "622328260",
        name: "Korea yuk",
      },
    },
  },
  {
    title: "Haji 2027",
    body: "Penarikan Dana",
    data: {
      _id: "2",
      date: "2025-08-15T00:00:00.000Z",
      type: "transaction_success",
      message:
        "Penarikan ini sesuai dengan jumlah kontribusi anggota ke Shared Pocket.",
      amount: 150000,
      requestedBy: {
        id: 1915615851,
        name: "IVANKA LARASATI KUSUMADEWI",
        category: {
          bank: {
            name: "BNI",
            type: "TAPLUS PEGAWAI BNI",
          },
        },
      },
      pocket: {
        id: "119766546",
        name: "Haji 2027",
      },
    },
  },
  {
    title: "GaUniqLO",
    body: "Transfer Dana",
    data: {
      _id: "3",
      date: "2026-03-03T00:00:00.000Z",
      type: "transaction_success",
      message:
        "Penarikan ini sesuai dengan jumlah kontribusi anggota ke Shared Pocket.",
      amount: 150000,
      requestedBy: {
        id: 1915615851,
        name: "IVANKA LARASATI KUSUMADEWI",
        category: {
          bank: {
            name: "BNI",
            type: "TAPLUS PEGAWAI BNI",
          },
        },
      },
      pocket: {
        id: "656234030",
        name: "GaUniqLO",
      },
    },
  },
  {
    title: "Patungan Laptop",
    body: "Shidqi dihapus dari Pocket.",
    data: {
      _id: "4",
      date: "2028-11-20T00:00:00.000Z",
      type: "information",
    },
  },
  {
    title: "Nabung emas",
    body: "Laras keluar dari Pocket.",
    data: {
      _id: "5",
      date: "2030-01-10T00:00:00.000Z",
      type: "information",
    },
  },
  {
    title: "Arisan Keluarga",
    body: "Permintaan persetujuan undang anggota.",
    data: {
      _id: "6",
      date: "2030-01-10T00:00:00.000Z",
      type: "member_approval_needed",
      message:
        "Ivanka mengajakmu berkolaborasi di Shared Pocket 'Arisan Keluarga'. Bersama, kita bisa ciptakan hal-hal menakjubkan!",
      requestedBy: {
        id: 1915615851,
        name: "IVANKA LARASATI KUSUMADEWI",
        category: {
          bank: {
            name: "BNI",
            type: "TAPLUS PEGAWAI BNI",
          },
        },
      },
      pocket: {
        id: "PKT001234567893",
        name: "Arisan Keluarga",
      },
    },
  },
];

export const getUnreadCount = (readIds) =>
  notificationData.filter((item) => !readIds.includes(item.data._id)).length;

export const mockNotifications = [
  {
    title: "Persetujuan Penarikan Dana",
    date: "19 Jun 2025",
    type: "transaction_approval_needed",
    message:
      "Penarikan ini melebihi jumlah kontribusi anggota ke Shared Pocket.",
    data: [
      {
        title: "Diminta oleh",
        content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
      },
      {
        title: "Nominal",
        content: ["Rp200.000"],
        textClassName: "font-semibold",
      },
      {
        title: "Sumber Dana",
        content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
      },
    ],
  },

  // [1] Notifikasi 2: Butuh persetujuan anggota
  {
    title: "Undangan Shared Pocket Baru!",
    date: "18 Jun 2025",
    type: "member_approval_needed",
    message:
      "Ivanka mengajakmu berkolaborasi di Shared Pocket 'Pergi ke Korea 2026'. Bersama, kita bisa ciptakan hal-hal menakjubkan!",
    data: [
      {
        title: "Detail pengundang",
        content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
      },
      {
        title: "Detail pocket",
        content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
      },
    ],
  },

  {
    title: "Penarikan Dana Berhasil",
    date: "17 Jun 2025",
    type: "transaction_success",
    message:
      "Penarikan ini sesuai dengan jumlah kontribusi anggota ke Shared Pocket.",
    data: [
      {
        title: "Diminta oleh",
        content: ["Sdr IVANKA LARASATI KUSUMADEWI", "BNI. 1915615851"],
      },
      {
        title: "Nominal",
        content: ["Rp200.000"],
        textClassName: "font-semibold",
      },
      {
        title: "Sumber Dana",
        content: ["Pergi ke Korea 2026", "SHARED POCKET BNI. 0238928039"],
      },
    ],
  },
];
