import React from "react";
import { Collapse } from "antd";
import { accordionProps } from "@/types/about.types";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const AccordionItem = ({ item }: accordionProps) => {
  return (
    <Collapse
      expandIcon={(icon) =>
        icon ? (
          <PlusOutlined className="" />
        ) : (
          <MinusOutlined className="text-[#6C758F]" />
        )
      }
      className="border-x-0 rounded-none about-accordion"
      accordion
      items={item}
    />
  );
};

export default AccordionItem;
