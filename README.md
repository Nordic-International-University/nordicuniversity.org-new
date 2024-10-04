# Nordic Universiteti Journal Sayti

## Sayt havolasi

[Saytga kirish](https://journal.nordicuniversity.org/)

Bu Nordic Universiteti rasmiy journal sayti loyihasidir.

## Loyihaning Umumiy Tavsifi

Nordic Universiteti Journal sayti jurnal maqolalari va ilmiy ishlarni taqdim etuvchi platformadir. Sayt [Next.js](https://nextjs.org/) asosida qurilgan bo'lib, [figma](https://www.figma.com/design/dkYm4UTf0taUmSL1oEoGGU/journal?node-id=0-1&t=kxeTr6ugQDLORxuS-1) dizayn asosida qilingan. foydalanuvchilarga zamonaviy va mobil qurilmalar uchun moslashuvchan interfeysni taqdim etadi. Ushbu loyiha ma’lumotlarni dinamik tarzda yuklash, PDF ko'rish va bilim almashish uchun qulay vositalarni taklif qiladi.

## Jamoa A’zolari

- **Frontend dasturchilar**: `Sherzod Uralov va Abdulaziz Abdullayev`

- **Backend dasturchilar**: `Abdurauf To‘qliyev va Akbar Mansurov`

## Xususiyatlar

- **Statik Sahifalar**: Saytning quyidagi sahifalari statik tarzda ishlab chiqilgan:
    - `/search`
    - `/profile`
    - `/about`
    - `/volumes`
    - `/instruction`
    - `/publications`
    - `/register`
    - `/createarticle`
    - `/contact`
    - `/articles`

- **Dinamik Maqola Sahifalari**: Jurnalning har bir maqolasi dinamik route orqali ko'rsatiladi. Har bir maqola uchun dinamik route quyidagi ko'rinishda bo'ladi:

    - `/article/:slug`

  Bu yerda `:slug` maqolaning unique identifikatori bo'lib, har bir maqola uchun alohida URL manzili taqdim etadi.

- **PDF Ko'rish**: Foydalanuvchilar PDF formatidagi hujjatlarni ko'rish va yuklab olishlari mumkin.
- **Responsiv Dizayn**: Mobil va desktop foydalanuvchilar uchun moslashtirilgan dizayn.
- **Shrift Optimallashtirish**: [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) orqali shriftnarni optimallashtirish.

## Texnologiyalar

Loyihada quyidagi asosiy texnologiyalar va kutubxonalar ishlatilgan:

### Frontend Texnologiyalar:

- **Next.js**: React asosidagi to'liq stack framework bo'lib, server va mijoz tomonida kod ishlash imkonini beradi.
- **React**: Foydalanuvchi interfeysi yaratish uchun ishlatiladigan mashhur JavaScript kutubxonasi.
- **Tailwind CSS**: UI dizaynini yaratishda foydalanilgan CSS framework.
- **Ant Design**: UI komponentlarini yaratishda ishlatilgan React komponent kutubxonasi.
- **Redux Toolkit**: Shtatni boshqarish uchun eng yaxshi yechimlardan biri.
- **React Hook Form** va **Formik**: Formalarni boshqarish uchun ishlatilgan kutubxonalar.
- **Swiper**: Slayder va carousel yaratish uchun ishlatiladigan zamonaviy JavaScript kutubxonasi.
- **GSAP**: Animatsiyalarni samarali yaratish uchun ishlatiladigan kuchli kutubxona.

### Backend Texnologiyalar:

- **Express.js**: Backend qismi uchun ishlatilgan server framework.
- **TypeScript**: Backend va frontendda TypeScript tili ishlatilgan.
- **PostgreSQL**: Ma'lumotlar bazasi sifatida ishlatilgan.
- **Sequelize ORM**: Ma'lumotlar bazasini boshqarish uchun ishlatilgan ORM (Object-Relational Mapping).

## Loyihaning Tuzilishi

Loyiha quyidagi Next.js tuzilmasiga ega bo'lib, maqolalar dinamik route orqali ko'rsatiladi:

## Loyihani ishga tushirish

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Loyihani serverda ishga tushirish

```bash
#1
npm run build
#2
npm run start
```