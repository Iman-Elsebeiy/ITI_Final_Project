"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Package,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Star,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");

  const stats = {
    totalEarnings: 1250,
    totalSpent: 450,
    activeRentals: 5,
    itemsListed: 12,
    completedRentals: 45,
    averageRating: 4.8,
  };

  const earningsData = [
    { month: "Jan", earnings: 200, spent: 80 },
    { month: "Feb", earnings: 300, spent: 120 },
    { month: "Mar", earnings: 250, spent: 90 },
    { month: "Apr", earnings: 400, spent: 150 },
    { month: "May", earnings: 100, spent: 10 },
  ];

  const topItems = [
    {
      id: "1",
      name: "Scientific Calculator",
      rentals: 12,
      earnings: 600,
      rating: 4.9,
    },
    {
      id: "2",
      name: "Engineering Tools",
      rentals: 8,
      earnings: 240,
      rating: 4.8,
    },
    {
      id: "3",
      name: "Chemistry Book",
      rentals: 6,
      earnings: 240,
      rating: 5.0,
    },
    {
      id: "4",
      name: "Arduino Kit",
      rentals: 5,
      earnings: 400,
      rating: 4.7,
    },
  ];

  const recentActivity = [
    {
      id: "1",
      type: "rental",
      description: "Calculator rented by Sara Mohamed",
      amount: "+50 EGP",
      date: "2 hours ago",
      positive: true,
    },
    {
      id: "2",
      type: "payment",
      description: "Rented Engineering Tools",
      amount: "-30 EGP",
      date: "Yesterday",
      positive: false,
    },
    {
      id: "3",
      type: "rental",
      description: "Arduino Kit returned",
      amount: "+80 EGP",
      date: "2 days ago",
      positive: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Analytics</h1>
        <p className="text-[#2C2C2C]/60">
          Track your rental performance and earnings
        </p>
      </div>

      {/* Time Range Filter */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-8">
        <div className="flex gap-2">
          {["week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all capitalize ${
                timeRange === range
                  ? "bg-[#1DA5A6] text-white"
                  : "bg-gray-100 text-[#2C2C2C]/60"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Earnings */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-lg">
              <ArrowUp className="w-4 h-4" />
              <span>12%</span>
            </div>
          </div>
          <p className="text-white/80 text-sm mb-1">Total Earnings</p>
          <p className="text-3xl font-bold">EGP {stats.totalEarnings}</p>
        </div>

        {/* Total Spent */}
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-lg">
              <ArrowDown className="w-4 h-4" />
              <span>5%</span>
            </div>
          </div>
          <p className="text-white/80 text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-bold">EGP {stats.totalSpent}</p>
        </div>

        {/* Active Rentals */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-white/80 text-sm mb-1">Active Rentals</p>
          <p className="text-3xl font-bold">{stats.activeRentals}</p>
        </div>

        {/* Completed Rentals */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-white/80 text-sm mb-1">Completed</p>
          <p className="text-3xl font-bold">{stats.completedRentals}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Earnings Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-6">
              Earnings Overview
            </h3>
            <div className="space-y-4">
              {earningsData.map((data, index) => {
                const maxEarnings = Math.max(...earningsData.map((d) => d.earnings));
                const earningsWidth = (data.earnings / maxEarnings) * 100;
                const spentWidth = (data.spent / maxEarnings) * 100;

                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-[#2C2C2C]">
                        {data.month}
                      </span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600 font-semibold">
                          +{data.earnings} EGP
                        </span>
                        <span className="text-red-600 font-semibold">
                          -{data.spent} EGP
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                          style={{ width: `${earningsWidth}%` }}
                        />
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all"
                          style={{ width: `${spentWidth}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Performing Items */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl font-bold text-[#2C2C2C] mb-6">
              Top Performing Items
            </h3>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2C2C2C] mb-1">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-[#2C2C2C]/60">
                      <span>{item.rentals} rentals</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFC83D] text-[#FFC83D]" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      +{item.earnings} EGP
                    </p>
                    <p className="text-xs text-[#2C2C2C]/60">Total</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Net Balance */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Net Balance</h3>
            <div className="text-center p-6 bg-gradient-to-br from-[#1DA5A6]/10 to-[#194774]/10 rounded-xl">
              <p className="text-sm text-[#2C2C2C]/60 mb-2">Total Profit</p>
              <p
                className={`text-4xl font-bold ${
                  stats.totalEarnings - stats.totalSpent >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                EGP {stats.totalEarnings - stats.totalSpent}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-semibold">
                  +15% from last month
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activity.positive
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {activity.positive ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#2C2C2C]">
                      {activity.description}
                    </p>
                    <p className="text-xs text-[#2C2C2C]/60">{activity.date}</p>
                  </div>
                  <p
                    className={`text-sm font-bold ${
                      activity.positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {activity.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[#FFC83D] text-[#FFC83D]" />
                  <span className="font-bold text-[#2C2C2C]">
                    {stats.averageRating}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">Items Listed</span>
                <span className="font-bold text-[#2C2C2C]">
                  {stats.itemsListed}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">Success Rate</span>
                <span className="font-bold text-green-600">96%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}