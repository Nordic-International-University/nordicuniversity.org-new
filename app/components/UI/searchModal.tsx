import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { handleCloseSearchModal } from "@/app/utils/slices/search.slice";

const SearchModal = ({ searchModal }: { searchModal: string }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchModal) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/search?query=${searchModal}&lang=uz`,
          );
          if (!response.ok) {
            throw new Error("Ma'lumotni yuklashda xatolik yuz berdi");
          }
          const result = await response.json();
          setData(result);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [searchModal]);

  return (
    <div className="p-4">
      {data.length > 0 ? (
        <div className="flex flex-col gap-4">
          {data.map((item, index) => (
            <Link href={item.route} key={index} legacyBehavior>
              <a
                onClick={() => dispatch(handleCloseSearchModal())}
                className="block p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                {item.includedText.map((textItem: any, textIndex: number) => (
                  <p
                    key={textIndex}
                    className="text-gray-700 line-clamp-1 text-sm"
                    dangerouslySetInnerHTML={{ __html: textItem.text }}
                  ></p>
                ))}
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <p>Natijalar topilmadi</p>
      )}
    </div>
  );
};

export default SearchModal;
