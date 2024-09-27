import {createSlice} from "@reduxjs/toolkit";

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
    aboutItems: [
        {
            name: "Saidahror Gʻulomov",
            title: "Iqtisodiyot fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Marat Raxmutlaev",
            title: "Texnika fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Baxtiyor Salimov",
            title: "Iqtisodiyot fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Olim Murtazayev",
            title: "Iqtisodiyot fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Shavkat Hasanov",
            title: "Iqtisodiyot fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Petri Juhani Raivo",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "Finlandiya",
        },
        {
            name: "Pekka Auvinen",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "Finlandiya",
        },
        {
            name: "Alisher Joʻrayev",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "O‘zbekiston",
        },
        {
            name: "Nizomiddin Urmonov",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD), dotsent",
            country: "O‘zbekiston",
        },
        {
            name: "Mahammadsiddik Amonboyev",
            title: "Iqtisodiyot fanlari nomzodi, dotsent",
            country: "O‘zbekiston",
        },
        {
            name: "Bruno Dallago",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "Italiya",
        },
        {
            name: "Kobil Ruziyev",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "Angliya",
        },
        {
            name: "Ihtiyor Bobojonov",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "Germaniya",
        },
        {
            name: "Odiljon Abdurazzakov",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "O‘zbekiston",
        },
        {
            name: "Nuriddin Murodullayev",
            title: "Xalqaro Nordik universiteti prorektori",
            country: "O‘zbekiston",
        },
        {
            name: "Mirza Tulaev",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD), dotsent",
            country: "O‘zbekiston",
        },
        {
            name: "Sabirov Xasan",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD), dotsent",
            country: "O‘zbekiston",
        },
        {
            name: "Zulfiya Xamidova",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD), dotsent",
            country: "O‘zbekiston",
        },
        {
            name: "Lochin Raxmonov",
            title: "Iqtisodiyot fanlari boʻyicha falsafa doktori (PhD)",
            country: "O‘zbekiston",
        },
        {
            name: "Musoxon Isakov",
            title: "Iqtisodiyot fanlari nomzodi, dotsent",
            country: "O‘zbekiston",
        },
        {
            name: "Maxammadmurod Shomirzayev",
            title: "Pedagogika fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Xusniddin Jo‘rayev",
            title: "Pedagogika fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Qurbonniyoz Panjiyev",
            title: "Pedagogika fanlari doktori, professor",
            country: "O‘zbekiston",
        },
        {
            name: "Dilafro‘z Miraliyeva",
            title: "Pedagogika fanlari bo‘yicha falsafa doktori (PhD)",
            country: "O‘zbekiston",
        },
        {
            name: "Nigora Lutfullayeva",
            title: "Psixologiya fanlari bo‘yicha falsafa doktori (PhD)",
            country: "O‘zbekiston",
        },
        {
            name: "Dilshod Nasriddinov",
            title: "Filologiya fanlari bo‘yicha falsafa doktori (PhD)",
            country: "O‘zbekiston",
        },
    ],
};

const aboutSLice = createSlice({
    name: "about",
    initialState: initialState,
    reducers: {},
});

export default aboutSLice.reducer;
