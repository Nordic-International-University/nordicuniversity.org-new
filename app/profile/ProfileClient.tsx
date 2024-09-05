"use client";

import React from "react";
import { Tabs, TabsProps } from "antd";

interface ProfileClientProps {
    data?: {
        data: {
            Articles: {
                title: string;
                status: string;
                category: string;
                createdAt: string;
                views: number;
            }[];
        };
    };
}

const testData=[ {
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }},{
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }},{
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }},{
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }},{
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }},{
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi vO‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi vO‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladiO‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }},{
    "id": "4acc9fc3-0ecb-4f69-a2da-b07d0ecf2ad7",
    "author_id": "80d34aa4-ff39-45c1-8ee0-d661c8f9f9c3",
    "categoryId": 10,
    "SubCategoryId": 63,
    "plagiarist_file_id": null,
    "source_id": "069a8922-f054-46e1-8876-3125e01c0109",
    "image_id": null,
    "title": "O‘zbekistonliklar Mustaqillik bayramida ketma-ket 4 kun dam oladi",
    "abstract": "Qo‘shimcha dam olish kunlari 2024 yilda rasmiy sanalarni nishonlash davrida qo‘shimcha ishlanmaydigan kunlarni belgilash va dam olish kunlarini ko‘chirish to‘g‘risidagi prezident farmonida belgilangan.",
    "description": "3 sentabr, seshanba ish haftasining turidan qat’i nazar, barcha xodimlar uchun qo‘shimcha dam olish kuni etib belgilangan. 1 sentabr — O‘zbekiston mustaqilligi kuni 2024 yilda yakshanba — dam olish kunlariga to‘g‘ri kelishi munosabati bilan ushbu dam olish kuni 2 sentabr, dushanba kuniga ko‘chiriladi.\n\n31 avgust, shanba — haftasiga 6 kun ishlaydiganlar uchun qo‘shimcha dam olish kuni, 5 kunliklar uchun odatiy dam olish kuni bo‘ladi.\n\nShu tariqa, o‘zbekistonliklar Mustaqillik bayrami munosabati bilan ketma-ket 4 kun dam oladi. ",
    "keyword": "o'zbekiston,toshkent,mustaqillik",
    "doi": null,
    "slug": "ozbekistonliklar-mustaqillik-bayramida-ketma-ket-4-kun-dam-oladi",
    "tg_source": null,
    "status": "NEW",
    "last_status": "NEW",
    "reason_for_rejection": null,
    "viewsCount": 1,
    "volume_id": null,
    "publish_date": null,
    "createdAt": "2024-08-08T06:37:22.074Z",
    "updatedAt": "2024-08-08T06:37:25.302Z",
    "volume": null,
    "category": {
        "id": 10,
        "name": "IQTISODIYOT FANLARI",
        "file_id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
        "createdAt": "2024-02-23T17:14:35.456Z",
        "updatedAt": "2024-07-01T10:17:23.829Z",
        "file": {
            "id": "a1256ed6-bbd6-4406-ab08-7ce283a4584e",
            "file_path": "/public/Files/757fa5373a1564493f7c2f7d407ba8c6.jpeg",
            "createdAt": "2024-07-01T10:17:22.909Z",
            "updatedAt": "2024-07-01T10:17:22.909Z"
        }
    }}]
export default function TableComponent({ data }: ProfileClientProps) {
    console.log("Prop Data", data);
    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...';
        }
        return text;
    };
    const tabsItem: TabsProps["items"] = [
        {
            key: "1",
            label: "Maqolalar",
            children: (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Sarlavha</th>
                            <th className="py-3 px-6 text-left">Holati</th>
                            <th className="py-3 px-6 text-left">Kategoriyasi</th>
                            <th className="py-3 px-6 text-left">Yaratilgan vaqt</th>
                            <th className="py-3 px-6 text-left">O'qishlar soni</th>
                        </tr>
                        </thead>
                        <tbody className="cursor-pointer">
                        {testData.map((article, index) => (
                            <tr className="border-b hover:bg-gray-100" key={index}>
                                <td className="py-4 px-6 overflow-hidden line-clamp-1">{article.title}</td>
                                <td className="py-4 px-6">{article.status}</td>
                                <td className="py-4 px-6">{article.category.name}</td>
                                <td className="py-4 px-6 text-nowrap">{article.createdAt}</td>
                                <td className="py-4 px-6">{article.viewsCount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ),
        },
        {
            key: "2",
            label: "nimadur",
            children: "Контент для Tab 2",
        },
        {
            key: "3",
            label: "Tab 3",
            children: "Контент для Tab 3",
        },
    ];

    return (
        <div className="overflow-x-auto">
            <Tabs defaultActiveKey="1" type="card" items={tabsItem} />
        </div>
    );
}
