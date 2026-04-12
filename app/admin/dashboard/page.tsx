"use client";

import { useState } from "react";
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("week");

  const stats = {
    totalUsers: 1234,
    newUsers: 45,
    totalItems: 567,
    activeRentals: 89,
    revenue: 12450,
    pendingApprovals: 12,
  };

  const recentUsers = [
    {
      id: "1",
      name: "Sara Mohamed",
      email: "sara@university.edu",
      university: "Cairo University",
      status: "pending",
      joinedAt: "5 min ago",
    },
    {
      id: "2",
      name: "Ahmed Ali",
      email: "ahmed@university.edu",
      university: "Ain Shams",
      status: "verified",
      joinedAt: "1 hour ago",
    },
    {
      id: "3",
      name: "Layla Hassan",
      email: "layla@university.edu",
      university: "Alexandria",
      status: "pending",
      joinedAt: "2 hours ago",
    },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "rental",
      description: "New rental: Calculator by Sara Mohamed",
      time: "2 min ago",
      icon: Package,
      color: "text-blue-500",
    },
    {
      id: "2",
      type: "user",
      description: "New user registered: Ahmed Ali",
      time: "10 min ago",
      icon: Users,
      color: "text-green-500",
    },
    {
      id: "3",
      type: "report",
      description: "Report filed for item #1234",
      time: "1 hour ago",
      icon: AlertCircle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-[#2C2C2C]/60">
          Overview of platform activity and statistics
        </p>
      </div>

      {/* Time Range Filter */}
      <div className="bg-white rounded-xl shadow-sm p-3 mb-6 flex gap-2">
        {["today", "week", "month"].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range as any)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
              timeRange === range
                ? "bg-[#1DA5A6] text-white"
                : "text-[#2C2C2C]/60 hover:bg-gray-50"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              <span>+12%</span>
            </div>
          </div>
          <p className="text-[#2C2C2C]/60 text-sm mb-1">Total Users</p>
          <p className="text-3xl font-bold text-[#2C2C2C] mb-1">
            {stats.totalUsers}
          </p>
          <p className="text-xs text-green-600">+{stats.newUsers} new this week</p>
        </div>

        {/* Total Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              <span>+8%</span>
            </div>
          </div>
          <p className="text-[#2C2C2C]/60 text-sm mb-1">Total Items</p>
          <p className="text-3xl font-bold text-[#2C2C2C] mb-1">
            {stats.totalItems}
          </p>
          <p className="text-xs text-[#2C2C2C]/60">
            {stats.activeRentals} active rentals
          </p>
        </div>

        {/* Revenue */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <ArrowUp className="w-4 h-4" />
              <span>+15%</span>
            </div>
          </div>
          <p className="text-[#2C2C2C]/60 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-[#2C2C2C] mb-1">
            EGP {stats.revenue}
          </p>
          <p className="text-xs text-green-600">+2.5K this week</p>
        </div>

        {/* Active Rentals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-[#2C2C2C]/60 text-sm mb-1">Active Rentals</p>
          <p className="text-3xl font-bold text-[#2C2C2C]">
            {stats.activeRentals}
          </p>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-[#2C2C2C]/60 text-sm mb-1">Pending Approvals</p>
          <p className="text-3xl font-bold text-[#2C2C2C]">
            {stats.pendingApprovals}
          </p>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-teal-600" />
            </div>
          </div>
          <p className="text-[#2C2C2C]/60 text-sm mb-1">Success Rate</p>
          <p className="text-3xl font-bold text-[#2C2C2C]">96%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-[#2C2C2C] mb-4">Recent Users</h3>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2C2C2C] text-sm">
                    {user.name}
                  </p>
                  <p className="text-xs text-[#2C2C2C]/60">{user.university}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.status === "verified"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-bold text-[#2C2C2C] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-[#2C2C2C]">
                      {activity.description}
                    </p>
                    <p className="text-xs text-[#2C2C2C]/60">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}