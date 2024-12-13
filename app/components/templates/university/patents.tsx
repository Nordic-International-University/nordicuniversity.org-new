import { nordicLiveJournalProps } from "@/types/templates/nordiklieve.types";
import Image from "next/image";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Patents = ({ props }: { props: nordicLiveJournalProps[] }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ name: "", filePath: "" });

  const t = useTranslations("buttons");

  const handleOpenModal = (filePath: string, name: string) => {
    setSelectedItem({ filePath, name });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedItem({ name: "", filePath: "" });
  };

  return (
    <article className="mt-10 mb-10">
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-2 gap-6 max-md:place-items-center">
        {props.map((item, index) => (
          <div className="max-w-[300px]" key={index}>
            <Image
              width={300}
              height={500}
              className="h-[420px] object-cover"
              src={process.env.NEXT_PUBLIC_URL_BACKEND + item.image.file_path}
              alt={item.name}
            />
            <div className="flex mt-4 items-center justify-between">
              <h2 className="max-sm:text-sm line-clamp-1 text-md text-text_secondary">
                {item.name}
              </h2>
              <Button
                className="px-8 max-sm:px-4 max-sm:text-sm rounded-sm text-xl text-white bg-text_secondary"
                type="primary"
                onClick={() =>
                  handleOpenModal(
                    process.env.NEXT_PUBLIC_URL_BACKEND + item.file.file_path,
                    item.name,
                  )
                }
              >
                {t("read")}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered={true}
        width="60%"
        destroyOnClose={true}
        title={selectedItem.name || t("defaultTitle")}
      >
        <div className="relative w-full h-[80vh]">
          <iframe
            src={selectedItem.filePath}
            width="100%"
            height="100%"
            frameBorder="0"
            title="PDF Viewer"
          ></iframe>
        </div>
      </Modal>
    </article>
  );
};

export default Patents;
