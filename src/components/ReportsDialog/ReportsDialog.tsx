"use client";

import React, { useState } from "react";

import { Paginator } from "../Paginator";
import { Report } from "@/types";
import { dummyReports } from "@/data";

const itemsPerPage = 60;

export const ReportsDialog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItems = dummyReports.length;

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1); // Reset to first page whenever the items per page changes
  };

  // Calculate the current reports to display
  const indexOfLastReport = currentPage * itemsPerPage;
  const indexOfFirstReport = indexOfLastReport - itemsPerPage;
  const currentReports = dummyReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );
  return (
    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-start pt-10">
      <div className="relative bg-white w-full max-w-2xl mx-4 md:mx-0 border border-gray-300 shadow-lg rounded-lg">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recently Generated Reports
          </h3>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              {/* Here, you would use an actual filter icon */}
              <span className="text-gray-600">Filter</span>
            </button>
            <button className="ml-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              {/* Here, you would use an actual close icon */}
              <span className="text-gray-600">X</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Download
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentReports.map((report: Report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {/* Here, you would use an actual download icon */}
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginator
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={onPageChange}
            onItemsPerPageChange={onItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};
