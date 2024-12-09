import React from "react";
import { Pagination } from "antd";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4 items-center gap-2 text-tertiary">
      <Pagination
        current={currentPage}
        total={totalPages * 10}
        pageSize={10}
        onChange={(page) => onPageChange(page)}
        showSizeChanger={false}
        showQuickJumper
      />
    </div>
  );
};

export default CustomPagination;
