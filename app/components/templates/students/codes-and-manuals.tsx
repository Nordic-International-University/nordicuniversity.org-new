import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import { useTranslations } from "next-intl";
import { PiFilePdfDuotone } from "react-icons/pi";
import gsap from "gsap";

interface CodesAndManualsProps {
  id: string;
  name: string;
  file: {
    file_path: string;
  };
  image: {
    file_path: string;
  };
}

const CodesAndManuals = ({ props }: { props: CodesAndManualsProps[] }) => {
  const t = useTranslations("student.CodesAndManuals");

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  useEffect(() => {
    if (itemRefs.current) {
      gsap.fromTo(
        itemRefs.current.filter(Boolean),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [props]);

  console.log(props);

  const showModal = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPdf(null);
  };

  return (
    <article className="mt-10 mb-10">
      <div className="grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-14 grid max-md:place-items-center">
        {props.map((item, index) => (
          <div
            className="max-w-[300px] max-sm:w-full h-[450px]"
            key={item.id}
            ref={(el: any) => (itemRefs.current[index] = el)}
          >
            <Image
              width={300}
              height={500}
              src={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.image.file_path}`}
              alt={item.name}
              className="h-[400px] max-sm:w-full"
            />
            <div className="mt-4 items-center justify-between">
              <h2 className="max-sm:text-sm text-xl text-text_secondary">
                {item.name}
              </h2>
              <Button
                icon={<PiFilePdfDuotone />}
                className="px-8 max-sm:px-4 w-full mt-3 max-sm:text-sm rounded-sm text-xl text-white bg-text_secondary"
                type="primary"
                onClick={() =>
                  showModal(
                    `${process.env.NEXT_PUBLIC_URL_BACKEND}${item.file.file_path}`,
                  )
                }
              >
                PDF
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying PDF */}
      <Modal
        title="PDF Document"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="60%"
        destroyOnClose
      >
        <div className="flex justify-center">
          {selectedPdf && (
            <iframe
              src={selectedPdf}
              width="100%"
              height="600px"
              frameBorder="0"
              title="PDF Viewer"
            />
          )}
        </div>
      </Modal>
    </article>
  );
};

export default CodesAndManuals;
