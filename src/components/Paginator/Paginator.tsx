import { GrNext, GrPrevious } from "react-icons/gr";

import React from "react";

type PaginatorProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
};

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const range = (start: number, end: number): number[] => {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
  };

  let pages: (number | string)[] = [];
  const sidePages = range(1, totalPages).filter(
    (page) =>
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 2 && page <= currentPage + 2)
  );

  sidePages.forEach((page, index, array) => {
    if (page - (array[index - 1] || 0) > 1) {
      pages.push("...");
    }
    pages.push(page);
    if ((array[index + 1] || totalPages + 1) - page > 1) {
      pages.push("...");
    }
  });

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex items-center justify-between space-x-1 w-full my-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`h-10 px-3 border rounded-md flex items-center justify-center ${
          currentPage === 1
            ? "cursor-not-allowed text-gray-500 bg-gray-300"
            : "hover:bg-gray-100"
        }`}
      >
        <GrPrevious className="text-lg" />
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            className={`w-10 h-10 border rounded-md flex items-center justify-center ${
              currentPage === page
                ? "bg-red-500 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={index}
            className="px-3 h-10 flex items-center justify-center"
          >
            {page}
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`h-10 px-3 border rounded-md flex items-center justify-center ${
          currentPage === totalPages
            ? "cursor-not-allowed text-gray-500 bg-gray-300"
            : "hover:bg-gray-100"
        }`}
      >
        <GrNext className="text-lg" />
      </button>

      <div className="flex items-center">
        <label htmlFor="rows-per-page" className="text-sm mr-2">
          Rows per page:
        </label>
        <input
          id="rows-per-page"
          type="number"
          className="w-16 pl-2 border rounded-md text-center"
          value={itemsPerPage}
          onChange={(e) => {
            const numValue = parseInt(e.target.value, 10);
            if (!isNaN(numValue) && numValue > 0) {
              onItemsPerPageChange(numValue);
            }
          }}
          min="1"
        />
      </div>
    </div>
  );
};
