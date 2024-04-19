"use client";

import React, { useState } from "react";

import { Paginator } from "../Paginator";
import { Report } from "@/types";
import { dummyReports } from "@/data";

const itemsPerPage = 10;

export const ReportsDialog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastReport = currentPage * itemsPerPage;
  const indexOfFirstReport = indexOfLastReport - itemsPerPage;
  const currentReports = dummyReports.slice(
    indexOfFirstReport,
    indexOfLastReport
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recently Generated Reports
          </h3>
          <div className="mt-2 px-7 py-3">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-2 text-xs text-gray-500">Date</th>
                  <th className="px-6 py-2 text-xs text-gray-500">
                    Report Name
                  </th>
                  <th className="px-6 py-2 text-xs text-gray-500">Download</th>
                </tr>
              </thead>
              <tbody>
                {currentReports.map((report: Report) => (
                  <tr key={report.id} className="whitespace-nowrap">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {report.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{report.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
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
              totalItems={dummyReports.length}
              onPageChange={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
