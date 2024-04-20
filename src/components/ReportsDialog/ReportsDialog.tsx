"use client";

import React, { useEffect, useState } from "react";

import { Paginator } from "../Paginator";
import { Report } from "@/types";
import { ReportsTable } from "../ReportsTable";
import { dummyReports } from "@/data";

export const ReportsDialog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentReports, setCurrentReports] = useState<Report[]>([]);

  useEffect(() => {
    const indexOfLastReport = currentPage * itemsPerPage;
    const indexOfFirstReport = indexOfLastReport - itemsPerPage;
    setCurrentReports(
      dummyReports.slice(indexOfFirstReport, indexOfLastReport)
    );
  }, [currentPage, itemsPerPage]);

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onItemsPerPageChange = (numItems: number) => {
    setItemsPerPage(numItems);
    setCurrentPage(1);
  };

  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-10">
      <div className="relative bg-white w-full max-w-2xl mx-4 md:mx-0 border border-gray-300 shadow-lg rounded-lg">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recently Generated Reports
          </h3>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <span className="text-gray-600">Filter</span>
            </button>
            <button className="ml-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <span className="text-gray-600">X</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <ReportsTable reports={currentReports} />
          <Paginator
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={dummyReports.length}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};
