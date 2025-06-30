import TabunganKeluargaIcon from "@/assets/images/icon/tabunganKeluarga.svg";
import PernikahanIcon from "@/assets/images/icon/pernikahan.svg";
import WisataBersamaIcon from "@/assets/images/icon/wisataBersama.svg";
import MakananIcon from "@/assets/images/icon/makanan.svg";
import PakaianIcon from "@/assets/images/icon/fashion.svg";
import OtomotifIcon from "@/assets/images/icon/otomotif.svg";

import WisataBersamaDecorator from "@/assets/images/decorators/wisataBersamaDecorator.svg";
import TabunganKeluargaDecorator from "@/assets/images/decorators/tabunganKeluargaDecorator.svg";
import PernikahanDecorator from "@/assets/images/decorators/pernikahanDecorator.svg";
import CustomGoalDecorator from "@/assets/images/decorators/customGoalDecorator.svg";
import MakananDecorator from "@/assets/images/decorators/makananDecorator.svg";
import PakaianDecorator from "@/assets/images/decorators/pakaianDecorator.svg";
import OtomotifDecorator from "@/assets/images/decorators/otomotifDecorator.svg";
import CustomBisnisDecorator from "@/assets/images/decorators/customBisnisDecorator.svg";

export const savingGoals = [
  {
    title: "Tabungan keluarga",
    title2: "Dana impian keluarga",
    subtitle: "Dana untuk masa depan cerah keluarga Anda.",
    subtitle2: "Wujudkan impian keluarga bersama!",
    icon: (
      <TabunganKeluargaIcon
        width={100}
        height={100}
        style={{
          position: "absolute",
          top: -1,
          right: -1,
        }}
      />
    ),
    decorator: (
      <TabunganKeluargaDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: -1,
          right: -20,
        }}
      />
    ),
  },
  {
    title: "Pernikahan",
    title2: "Nikah impianmu",
    subtitle: "Dana persiapan hari spesialmu dengan pasangan.",
    subtitle2: "Rancang hari bahagia bersama pasanganmu!",
    icon: (
      <PernikahanIcon
        width={100}
        height={100}
        style={{
          position: "absolute",
          top: -1,
          right: -1,
        }}
      />
    ),
    decorator: (
      <PernikahanDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: -1,
          right: -10,
        }}
      />
    ),
  },
  {
    title: "Wisata bersama",
    title2: "Liburan impian kita",
    subtitle: "Wujudkan destinasi impianmu, ditemani orang-orang terdekat.",
    subtitle2: "Rencanakan petualangan seru bareng teman-teman!",
    icon: (
      <WisataBersamaIcon
        width={100}
        height={100}
        style={{
          position: "absolute",
          top: -1,
          right: -1,
        }}
      />
    ),
    decorator: (
      <WisataBersamaDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: -10,
          right: 0,
        }}
      />
    ),
  },
  {
    isCustom: true,
    title: "Custom Goal",
    title2: "Wujudkan target kalian",
    subtitle: "Buat tujuan unikmu sendiri dan wujudkan bersama!",
    subtitle2: "Dana impian kalian, selangkah lebih dekat!",
    decorator: (
      <CustomGoalDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: 5,
          right: -5,
        }}
      />
    ),
  },
];

export const spendingDetails = [
  {
    isCustom: true,
    title: "Custom Goal",
    title2: "Kelola dana kalian",
    subtitle: "Buat tujuan unikmu sendiri dan wujudkan bersama!",
    subtitle2: "Atur keuanganmu dan capai tujuanmu!",
    decorator: (
      <CustomGoalDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: 5,
          right: -5,
        }}
      />
    ),
  },
];

export const businessGoals = [
  {
    title: "Bisnis Makanan",
    title2: "Kelola bisnismu",
    subtitle: "Kelola dana bisnis makanan secara teratur.",
    subtitle2: "Kelola dana bisnis makanan secara teratur.",
    icon: (
      <MakananIcon
        width={110}
        height={110}
        style={{
          position: "absolute",
          top: -5,
          right: -1,
        }}
      />
    ),
    decorator: (
      <MakananDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: 0,
          right: -23,
        }}
      />
    ),
  },
  {
    title: "Bisnis Pakaian",
    title2: "Kelola bisnismu",
    subtitle: "Kelola dana bisnis pakaian secara teratur.",
    subtitle2: "Kelola dana bisnis pakaian secara teratur.",
    icon: (
      <PakaianIcon
        width={110}
        height={110}
        style={{
          position: "absolute",
          top: -5,
          right: -1,
        }}
      />
    ),
    decorator: (
      <PakaianDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: 0,
          right: -22,
        }}
      />
    ),
  },
  {
    title: "Bisnis Otomotif",
    title2: "Kelola bisnismu",
    subtitle: "Kelola dana bisnis otomotif secara teratur.",
    subtitle2: "Kelola dana bisnis otomotif secara teratur.",
    icon: (
      <OtomotifIcon
        width={110}
        height={110}
        style={{
          position: "absolute",
          top: -1,
          right: -1,
        }}
      />
    ),
    decorator: (
      <OtomotifDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: 0,
          right: -23,
        }}
      />
    ),
  },
  {
    isCustom: true,
    title: "Custom Goal",
    title2: "Wujudkan target kalian",
    subtitle: "Buat tujuan unikmu sendiri dan wujudkan bersama!",
    subtitle2: "Dana impian kalian, selangkah lebih dekat!",
    decorator: (
      <CustomBisnisDecorator
        width={190}
        height="100%"
        style={{
          position: "absolute",
          bottom: 1,
          right: -23,
        }}
      />
    ),
  },
];
