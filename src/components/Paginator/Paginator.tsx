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

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  let pages: (number | string)[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (
      p === 1 ||
      p === totalPages ||
      (p >= currentPage - 1 && p <= currentPage + 1)
    ) {
      pages.push(p);
    } else if (
      (p === currentPage - 2 || p === currentPage + 2) &&
      totalPages > 7
    ) {
      pages.push("...");
      if (p === currentPage - 2) p = totalPages - 3;
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2 w-full my-4">
      <button
        className={`h-10 px-3 border rounded-md flex items-center justify-center ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "hover:bg-gray-100"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <GrPrevious className="text-lg" />
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={page}
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
        className={`h-10 px-3 border rounded-md flex items-center justify-center ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "hover:bg-gray-100"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
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
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num) && num > 0) {
              onItemsPerPageChange(num);
            }
          }}
          min="1"
        />
      </div>
    </div>
  );
};
