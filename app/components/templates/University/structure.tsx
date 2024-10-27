import React from "react";

const UniversityInfoTable = () => {
  const data = [
    { id: 1, name: "Nomi", info: "<<XALQARO NORDIK UNIVERSITETI >> MCHJ" },
    {
      id: 2,
      name: "Rasmiy manzilimiz",
      info: "Toshkent shahri, Olmazor tumani, Farobiy ko'chasi, 290-uy",
    },
    {
      id: 3,
      name: "Manzil",
      info: "Toshkent sh, Chilonzor tum, <E> kv, Bunyodkor ko'ch, 8/2-uy",
    },
    { id: 4, name: "Telefon raqami", info: "(55) 508-44-00" },
    { id: 5, name: "Akkount raqami", info: "2020 8000 9055 2506 1001" },
    { id: 6, name: "Bank", info: "<Ipak yo'li> Bank, Sag'bon filiali" },
    { id: 7, name: "MFO", info: "01036" },
    { id: 8, name: "STIR", info: "309533058" },
    { id: 9, name: "IFUT", info: "85420" },
    { id: 10, name: "EMAIL", info: "info@nordicuniversity.org" },
  ];

  return (
    <div className="overflow-x-auto mt-14">
      <table className="min-w-full max-sm:text-nowrap border border-gray-300">
        <thead>
          <tr className="bg-white">
            <th className="px-4 py-2 border border-gray-300">#</th>
            <th className="px-4 py-2 border border-gray-300">Nomi</th>
            <th className="px-4 py-2 border border-gray-300">Ma'lumotlar</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2 border border-gray-300 bg-white text-center">
                {item.id}
              </td>
              <td className="px-4 py-2 border border-gray-300 bg-text_tertiary">
                {item.name}
              </td>
              <td className="px-4 py-2 bg-text_tertiary border border-gray-300">
                {item.info}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UniversityInfoTable;
