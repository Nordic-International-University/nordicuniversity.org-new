import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accordionItems: [
    {
      key: "1",
      label: "Maqolani qabul qilish bo‘yicha qanday talablar mavjud?",
      children: "Maqola IMRAD talablari asosida qabul qilinadi.",
    },
    {
      key: "2",
      label: "Maqola topshirish pullikmi?",
      children: "Maqolalar bepul qabul qilinadi.",
    },
    {
      key: "3",
      label: "Maqolani topshirish muddati qachongacha?",
      children:
        "Jurnalining 2-soni uchun maqolalar 15-fevralga qadar qabul qilinadi.",
    },
    {
      key: "4",
      label:
        "Jurnal OAK ro‘yxatiga kiruvchi jurnallar qatoridan o‘rin olganmi?",
      children:
        "Yo‘q, hali o‘tkazilmagan, jurnalning 2-sonidan keyin o‘tkazish rejamiz bor.",
    },
    {
      key: "5",
      label: "Jurnalga kimlar maqola berishi mumkin?",
      children:
        "Jurnal barcha uchun ochiq, bu bo‘yicha hech qanday cheklovlar yo‘q.",
    },
    {
      key: "6",
      label:
        "Jurnalning bitta soniga ikki yoki undan ko‘p maqola berish mumkinmi?",
      children:
        "Bitta son uchun bitta eng dolzarb maqola berish tavsiya etiladi, agar maqolalar ikki va undan ortiq bo‘lsa keyingi sonlarda chiqarilishi mumkin.",
    },
    {
      key: "7",
      label:
        "Agar tahririyat tomonidan maqola nashr uchun tavsiya etilmasa nima qilish mumkin?",
      children:
        "Taqrizchi tomonidan maqola mazmuni va formati maqul deb topilmasa, muallifga kamchiliklarni tuzatish uchun qayta yuboriladi. Agar maqola belgilangan muddatlarda tahririyatga qayta kelib tushmasa, jurnalning keyingi sonlarida nashr qilishga tavsiya etadi.",
    },
  ],
};

const aboutSLice = createSlice({
  name: "about",
  initialState: initialState,
  reducers: {},
});

export default aboutSLice.reducer;
