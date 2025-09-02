import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button, Modal, message } from "antd"; // message import qilindi
import { useTranslations } from "next-intl";
import { PiFilePdfDuotone, PiCopySimpleDuotone } from "react-icons/pi";
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

  const showModal = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPdf(null);
  };

  // ✅ URL copy funksiyasi
  const handleCopyUrl = () => {
    if (selectedPdf) {
      navigator.clipboard.writeText(selectedPdf).then(() => {
        message.success("URL copied to clipboard!");
      });
    }
  };

  return (
    <article className="mt-10 mb-10">
      <div className="grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-14 grid max-md:place-items-center">
        {props.map((item, index) => (
          <div
            className="max-w-[300px] max-sm:shadow-md max-sm:w-full"
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
              <h2 className="max-sm:text-sm max-sm:pl-2 text-xl line-clamp-1 text-text_secondary">
                {item.name}
              </h2>
              <div className="hidden md:block">
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
              <div className="block md:hidden">
                <a
                  href={`${process.env.NEXT_PUBLIC_URL_BACKEND}${item.file.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-2 max-sm:px-4 w-full mt-3 max-sm:text-sm rounded-sm text-xl text-white bg-text_secondary inline-flex items-center justify-center"
                >
                  <PiFilePdfDuotone className="mr-2" />
                  PDF
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title="PDF Document"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="60%"
      >
        <div className="flex justify-end mb-4">
          {/* ✅ Copy URL tugmasi */}
          <Button
            icon={<PiCopySimpleDuotone />}
            onClick={handleCopyUrl}
            type="default"
          >
            pdfning havolasini nusxalash
          </Button>
        </div>
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
