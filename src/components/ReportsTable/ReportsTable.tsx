import React from "react";
import { Report } from "@/types";

type ReportsTableProps = {
  reports: Report[];
};

export const ReportsTable: React.FC<ReportsTableProps> = ({ reports }) => {
  return (
    <table className="w-full">
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
      <tbody className="bg-white divide-y divide-gray-200 ">
        {reports.map((report: Report) => (
          <tr key={report.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {report.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {report.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
