"use client";

import { useState } from "react";
import { Search, Filter, Eye, Trash2, CheckCircle2, XCircle } from "lucide-react";

type Item = {
  id: string;
  title: string;
  owner: string;
  category: string;
  price: number;
  status: "active" | "pending" | "rejected";
  rentals: number;
  createdAt: string;
};

const mockItems: Item[] = [
  {
    id: "1",
    title: "Scientific Calculator TI-84 Plus",
    owner: "Ahmed Hassan",
    category: "📚 Books & Textbooks",
    price: 50,
    status: "active",
    rentals: 12,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Arduino Starter Kit",
    owner: "Sara Mohamed",
    category: "🔬 Lab Equipment",
    price: 80,
    status: "pending",
    rentals: 0,
    createdAt: "2024-02-01",
  },
  {
    id: "3",
    title: "Canon EOS Camera",
    owner: "Omar Khaled",
    category: "📷 Photography Equipment",
    price: 200,
    status: "active",
    rentals: 8,
    createdAt: "2024-01-20",
  },
];

export default function AdminItemsPage() {
  const [items, setItems] = useState(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "rejected">("all");

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: "active" as const } : i)));
  };

  const handleReject = (id: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: "rejected" as const } : i)));
  };

  const handleDelete = (id: string) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          Items Management
        </h1>
        <p className="text-[#2C2C2C]/60">Manage all listed items</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6]"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6] appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Rentals
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-semibold text-[#2C2C2C]">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                  {item.owner}
                </td>
                <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                  {item.category}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-[#1DA5A6]">
                  EGP {item.price}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      item.status === "active"
                        ? "bg-green-100 text-green-700"
                        : item.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                  {item.rentals}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {item.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleReject(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}