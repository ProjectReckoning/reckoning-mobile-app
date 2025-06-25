import SavingDecorator from "@/assets/images/decorators/savingDecorator.svg";
import SpendingDecorator from "@/assets/images/decorators/spendingDecorator.svg";
import BusinessDecorator from "@/assets/images/decorators/businessDecorator.svg";

export const pocketTypes = [
  {
    subject: "Personal",
    type: "Saving",
    content: "Capai impian pribadimu dengan menabung bersama.",
    source: <SavingDecorator width={60} height={60} />,
  },
  {
    subject: "Personal",
    type: "Spending",
    content:
      "Kelola pengeluaran bersama untuk kebutuhan harian atau acara spesial.",
    source: <SpendingDecorator width={60} height={60} />,
  },
  {
    subject: "Business",
    type: "Business Fund",
    content: "Kumpulkan dana untuk proyek bisnis atau operasional tim Anda.",
    source: <BusinessDecorator width={60} height={60} />,
  },
];
