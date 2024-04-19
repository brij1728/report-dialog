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

  // Logic to determine which page numbers to show
  let startPage = Math.max(1, currentPage - 2);
  let endPage = currentPage + 2;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, totalPages - 4);
  }

  let pageNumbers: number[] = [];
  for (let page = startPage; page <= endPage; page++) {
    pageNumbers.push(page);
  }

  return (
    <div className="flex items-center justify-center space-x-1 w-full">
      <button
        className={`flex items-center justify-center px-2 h-10 border rounded-lg ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-white"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <GrPrevious className="text-lg" />
        <span className="ml-1">Prev</span>
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`w-10 h-10 flex items-center justify-center border rounded-lg ${
            currentPage === number ? "bg-red-500 text-white" : "bg-white"
          }`}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}

      <button
        className={`flex items-center justify-center px-2 h-10 border rounded-lg ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed text-gray-500"
            : "bg-white"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <span className="mr-1">Next</span>
        <GrNext className="text-lg" />
      </button>

      <div className="flex items-center">
        <label htmlFor="rows-per-page" className="text-sm mr-2">
          Rows per page:
        </label>
        <input
          id="rows-per-page"
          type="number"
          className="w-16 pl-2 border rounded text-center"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          min="1"
        />
      </div>
    </div>
  );
};
