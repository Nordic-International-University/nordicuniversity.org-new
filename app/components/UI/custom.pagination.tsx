import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@nextui-org/shared-icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  if (totalPages === 0) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4 items-center gap-2 text-tertiary">
      <ArrowLeftIcon
        onClick={handlePreviousPage}
        className={`text-2xl max-sm:text-xl ${
          currentPage === 1 ? "text-gray-400" : "cursor-pointer"
        }`}
      />
      <span className="flex items-center gap-3">
        {Array.from({ length: totalPages }, (_, i) => (
          <div
            key={i}
            onClick={() => handlePageClick(i + 1)}
            className={`py-1 px-3 max-sm:text-sm cursor-pointer rounded ${
              currentPage === i + 1
                ? "bg-text_secondary text-white"
                : "bg-text_tertiary text-text_secondary"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </span>
      <ArrowRightIcon
        onClick={handleNextPage}
        className={`text-2xl max-sm:text-xl ${
          currentPage === totalPages ? "text-gray-400" : "cursor-pointer"
        }`}
      />
    </div>
  );
};

export default CustomPagination;
