"use client";

import { useState } from "react";
import {
  Clock,
  Package,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign,
  User,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

type HistoryItem = {
  id: string;
  itemName: string;
  itemImage: string;
  type: "borrowed" | "lended";
  user: string;
  price: number;
  period: string;
  startDate: string;
  endDate: string;
  status: "completed" | "cancelled";
  rating?: number;
  review?: string;
};

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    itemName: "Scientific Calculator TI-84 Plus",
    itemImage: "https://via.placeholder.com/100",
    type: "lended",
    user: "Sara Mohamed",
    price: 50,
    period: "1 Week",
    startDate: "2025-01-01",
    endDate: "2025-01-08",
    status: "completed",
    rating: 5,
    review: "Great condition and very helpful!",
  },
  {
    id: "2",
    itemName: "Canon EOS M50 Camera",
    itemImage: "https://via.placeholder.com/100",
    type: "borrowed",
    user: "Omar Khaled",
    price: 600,
    period: "3 Days",
    startDate: "2024-12-20",
    endDate: "2024-12-23",
    status: "completed",
    rating: 5,
  },
  {
    id: "3",
    itemName: "Engineering Drawing Set",
    itemImage: "https://via.placeholder.com/100",
    type: "borrowed",
    user: "Layla Ibrahim",
    price: 90,
    period: "3 Weeks",
    startDate: "2024-12-10",
    endDate: "2024-12-31",
    status: "completed",
    rating: 4,
  },
  {
    id: "4",
    itemName: "Chemistry Textbook",
    itemImage: "https://via.placeholder.com/100",
    type: "lended",
    user: "Ahmed Ali",
    price: 120,
    period: "1 Month",
    startDate: "2024-11-15",
    endDate: "2024-12-15",
    status: "completed",
    rating: 5,
  },
  {
    id: "5",
    itemName: "Arduino Starter Kit",
    itemImage: "https://via.placeholder.com/100",
    type: "borrowed",
    user: "Mona Hassan",
    price: 160,
    period: "2 Weeks",
    startDate: "2024-11-01",
    endDate: "2024-11-15",
    status: "cancelled",
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<"all" | "borrowed" | "lended">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "cancelled">("all");

  const filteredHistory = mockHistory.filter((item) => {
    const matchesType = filter === "all" || item.type === filter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const totalEarned = mockHistory
    .filter((item) => item.type === "lended" && item.status === "completed")
    .reduce((sum, item) => sum + item.price, 0);

  const totalSpent = mockHistory
    .filter((item) => item.type === "borrowed" && item.status === "completed")
    .reduce((sum, item) => sum + item.price, 0);

  const completedRentals = mockHistory.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          Rental History
        </h1>
        <p className="text-[#2C2C2C]/60">
          View all your past rental transactions
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-sm text-[#2C2C2C]/60">Total Rentals</p>
          </div>
          <p className="text-3xl font-bold text-[#2C2C2C]">{completedRentals}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-[#2C2C2C]/60">Total Earned</p>
          </div>
          <p className="text-3xl font-bold text-green-600">EGP {totalEarned}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-sm text-[#2C2C2C]/60">Total Spent</p>
          </div>
          <p className="text-3xl font-bold text-red-600">EGP {totalSpent}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#1DA5A6]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#1DA5A6]" />
            </div>
            <p className="text-sm text-[#2C2C2C]/60">Net Balance</p>
          </div>
          <p className={`text-3xl font-bold ${totalEarned - totalSpent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            EGP {totalEarned - totalSpent}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {[
              { id: "all", label: "All" },
              { id: "borrowed", label: "Borrowed" },
              { id: "lended", label: "Lended" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === tab.id
                    ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white"
                    : "bg-[#F1F3F5] text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/40" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="h-10 pl-10 pr-4 bg-[#F1F3F5] rounded-lg text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-[#F1F3F5] text-[#2C2C2C] rounded-lg text-sm font-semibold hover:bg-[#1DA5A6]/10 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Clock className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
            No History Found
          </h3>
          <p className="text-[#2C2C2C]/60">
            Your rental history will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Item Image */}
                <img
                  src={item.itemImage}
                  alt={item.itemName}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                />

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">
                        {item.itemName}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-[#2C2C2C]/60">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {item.type === "borrowed" ? "From" : "To"}: {item.user}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-lg font-semibold ${
                            item.type === "borrowed"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-green-500/10 text-green-600"
                          }`}
                        >
                          {item.type === "borrowed" ? "Borrowed" : "Lended"}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        item.status === "completed"
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-semibold ${
                          item.status === "completed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.status === "completed" ? "Completed" : "Cancelled"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-[#1DA5A6]" />
                      <span className="text-[#2C2C2C]/70">
                        <strong className="text-[#2C2C2C]">EGP {item.price}</strong> -{" "}
                        {item.period}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-[#2C2C2C]/70">{item.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-red-500" />
                      <span className="text-[#2C2C2C]/70">{item.endDate}</span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-[#FFC83D]">
                            {i < item.rating! ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {item.review && (
                    <div className="p-3 bg-[#F1F3F5] rounded-lg">
                      <p className="text-sm text-[#2C2C2C]/70 italic">
                        "{item.review}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}