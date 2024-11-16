import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";
import Image from "next/image";
import { Button } from "antd";

const NordicLifeJournal = ({ props }: { props: nordicLiveJournalProps[] }) => {
  return (
    <article className="mt-10 mb-10">
      <div className="gridd grid-cols-3 max-md:grid-cols-2 gap-6 grid max-md:place-items-center">
        {props.map((item, index) => (
          <div className="max-w-[300px]" key={index}>
            <Image
              width={300}
              height={500}
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
              alt={item.name}
            />
            <div className="flex mt-4 items-center justify-between">
              <h2 className="max-sm:text-sm text-xl text-text_secondary">
                {item.name}
              </h2>
              <Button
                className="px-8 max-sm:px-4 max-sm:text-sm rounded-sm text-xl text-white bg-text_secondary"
                type="primary"
              >
                O‘qish
              </Button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default NordicLifeJournal;
