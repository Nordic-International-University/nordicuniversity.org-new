export default function NoDataComponent() {
  return (
    <div className="w-full mt-5 bg-white shadow-lg rounded-lg overflow-hidden flex justify-center">
      <div className="p-8 text-center w-full">
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Ma'lumot mavjud emas
        </h2>
        <p className="text-gray-600 mb-6">
          Afsuski, so'ralgan ma'lumot topilmadi yoki mavjud emas.
        </p>
        <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-sm text-gray-700">
            Iltimos, keyinroq qayta urinib ko'ring yoki boshqa so'rov bilan
            murojaat qiling.
          </span>
        </div>
      </div>
    </div>
  );
}
