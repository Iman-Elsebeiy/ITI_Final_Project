"use client";

import { useState } from "react";
import { AlertCircle, Eye, CheckCircle2, XCircle } from "lucide-react";

type Report = {
  id: string;
  type: "user" | "item" | "rental";
  reportedBy: string;
  subject: string;
  reason: string;
  description: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
};

const mockReports: Report[] = [
  {
    id: "1",
    type: "item",
    reportedBy: "Sara Mohamed",
    subject: "Calculator - Misleading Description",
    reason: "Item not as described",
    description: "The calculator was advertised as new but it's clearly used.",
    status: "pending",
    createdAt: "2024-02-01",
  },
  {
    id: "2",
    type: "user",
    reportedBy: "Ahmed Ali",
    subject: "User: Omar Khaled - Harassment",
    reason: "Inappropriate behavior",
    description: "Sending inappropriate messages repeatedly.",
    status: "pending",
    createdAt: "2024-02-02",
  },
  {
    id: "3",
    type: "rental",
    reportedBy: "Layla Hassan",
    subject: "Rental Issue - Late Return",
    reason: "Item not returned on time",
    description: "Item was supposed to be returned yesterday.",
    status: "resolved",
    createdAt: "2024-01-28",
  },
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState(mockReports);
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "resolved" | "dismissed">("all");

  const filteredReports = reports.filter((r) =>
    statusFilter === "all" ? true : r.status === statusFilter
  );

  const handleResolve = (id: string) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: "resolved" as const } : r)));
  };

  const handleDismiss = (id: string) => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: "dismissed" as const } : r)));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          Reports Management
        </h1>
        <p className="text-[#2C2C2C]/60">Review and manage user reports</p>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm p-3 mb-6 flex gap-2">
        {["all", "pending", "resolved", "dismissed"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status as any)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize ${
              statusFilter === status
                ? "bg-[#1DA5A6] text-white"
                : "text-[#2C2C2C]/60 hover:bg-gray-50"
            }`}
          >
            {status} ({reports.filter((r) => status === "all" || r.status === status).length})
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    report.type === "user"
                      ? "bg-red-100"
                      : report.type === "item"
                      ? "bg-yellow-100"
                      : "bg-blue-100"
                  }`}
                >
                  <AlertCircle
                    className={`w-6 h-6 ${
                      report.type === "user"
                        ? "text-red-600"
                        : report.type === "item"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2C2C] mb-1">
                    {report.subject}
                  </h3>
                  <p className="text-sm text-[#2C2C2C]/60 mb-2">
                    Reported by: {report.reportedBy} • {report.createdAt}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg mb-3">
                    <span className="text-xs font-semibold text-[#2C2C2C]">
                      {report.reason}
                    </span>
                  </div>
                  <p className="text-sm text-[#2C2C2C]/70">
                    {report.description}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  report.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : report.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {report.status}
              </span>
            </div>
            {report.status === "pending" && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleResolve(report.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Resolve
                </button>
                <button
                  onClick={() => handleDismiss(report.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Dismiss
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}