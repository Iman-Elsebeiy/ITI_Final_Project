"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Ban,
  Eye,
  Trash2,
} from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  university: string;
  status: "verified" | "pending" | "banned";
  itemsListed: number;
  totalRentals: number;
  joinedAt: string;
  rating: number;
};

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sara Mohamed",
    email: "sara@university.edu",
    university: "Cairo University",
    status: "verified",
    itemsListed: 5,
    totalRentals: 12,
    joinedAt: "2024-01-15",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Ahmed Ali",
    email: "ahmed@university.edu",
    university: "Ain Shams University",
    status: "pending",
    itemsListed: 2,
    totalRentals: 3,
    joinedAt: "2024-02-01",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Omar Khaled",
    email: "omar@university.edu",
    university: "Alexandria University",
    status: "verified",
    itemsListed: 8,
    totalRentals: 25,
    joinedAt: "2024-01-10",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Layla Hassan",
    email: "layla@university.edu",
    university: "Cairo University",
    status: "banned",
    itemsListed: 0,
    totalRentals: 2,
    joinedAt: "2024-01-20",
    rating: 2.1,
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "verified" | "pending" | "banned">("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleVerify = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "verified" as const } : u)));
  };

  const handleBan = (id: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: "banned" as const } : u)));
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          User Management
        </h1>
        <p className="text-[#2C2C2C]/60">Manage all registered users</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6]"
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3 relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1DA5A6] appearance-none"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          {/* Stats */}
          <div className="md:col-span-3 flex items-center justify-end gap-4 text-sm">
            <span className="text-[#2C2C2C]/60">
              Total: <strong>{filteredUsers.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  Rentals
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-[#2C2C2C]/60 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-[#2C2C2C] text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-[#2C2C2C]/60">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                    {user.university}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                        user.status === "verified"
                          ? "bg-green-100 text-green-700"
                          : user.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status === "verified" && <CheckCircle2 className="w-3 h-3" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                    {user.itemsListed}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2C2C2C]">
                    {user.totalRentals}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-semibold text-[#FFC83D]">
                      ⭐ {user.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                    {user.joinedAt}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {user.status === "pending" && (
                        <button
                          onClick={() => handleVerify(user.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Verify"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {user.status !== "banned" && (
                        <button
                          onClick={() => handleBan(user.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Ban"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
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
    </div>
  );
}