"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  DollarSign,
  MessageCircle,
  Star,
  Filter,
  Search,
} from "lucide-react";

type Rental = {
  id: string;
  itemName: string;
  itemImage: string;
  owner: string;
  renter: string;
  price: number;
  period: string;
  startDate: string;
  endDate: string;
  status: "active" | "pending" | "completed" | "cancelled";
  location: string;
  type: "borrowed" | "lended";
};

const mockRentals: Rental[] = [
  {
    id: "1",
    itemName: "Scientific Calculator TI-84 Plus",
    itemImage: "https://via.placeholder.com/150",
    owner: "Ahmed Hassan",
    renter: "Sara Mohamed",
    price: 50,
    period: "Per Week",
    startDate: "2025-01-15",
    endDate: "2025-01-22",
    status: "active",
    location: "Main Campus, Building 5",
    type: "lended",
  },
  {
    id: "2",
    itemName: "Engineering Drawing Set",
    itemImage: "https://via.placeholder.com/150",
    owner: "Omar Khaled",
    renter: "Ahmed Hassan",
    price: 30,
    period: "Per Day",
    startDate: "2025-01-10",
    endDate: "2025-01-17",
    status: "active",
    location: "Engineering Building",
    type: "borrowed",
  },
  {
    id: "3",
    itemName: "Digital Camera Canon EOS",
    itemImage: "https://via.placeholder.com/150",
    owner: "Mona Ali",
    renter: "Ahmed Hassan",
    price: 200,
    period: "Per Week",
    startDate: "2025-01-05",
    endDate: "2025-01-12",
    status: "completed",
    location: "Arts Building",
    type: "borrowed",
  },
  {
    id: "4",
    itemName: "Organic Chemistry Textbook",
    itemImage: "https://via.placeholder.com/150",
    owner: "Ahmed Hassan",
    renter: "Layla Ibrahim",
    price: 40,
    period: "Per Month",
    startDate: "2025-01-20",
    endDate: "2025-02-20",
    status: "pending",
    location: "Library Entrance",
    type: "lended",
  },
];

export default function RentalsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "borrowed" | "lended">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRentals = mockRentals.filter((rental) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "borrowed" && rental.type === "borrowed") ||
      (activeTab === "lended" && rental.type === "lended");

    const matchesStatus = statusFilter === "all" || rental.status === statusFilter;

    const matchesSearch =
      searchQuery === "" ||
      rental.itemName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesStatus && matchesSearch;
  });

  const getStatusConfig = (status: Rental["status"]) => {
    switch (status) {
      case "active":
        return {
          label: "Active",
          icon: Clock,
          color: "text-blue-600",
          bg: "bg-blue-50",
          border: "border-blue-200",
        };
      case "pending":
        return {
          label: "Pending",
          icon: AlertCircle,
          color: "text-yellow-600",
          bg: "bg-yellow-50",
          border: "border-yellow-200",
        };
      case "completed":
        return {
          label: "Completed",
          icon: CheckCircle2,
          color: "text-green-600",
          bg: "bg-green-50",
          border: "border-green-200",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          icon: XCircle,
          color: "text-red-600",
          bg: "bg-red-50",
          border: "border-red-200",
        };
    }
  };

  const stats = [
    { label: "Active Rentals", value: mockRentals.filter((r) => r.status === "active").length, color: "text-blue-600" },
    { label: "Total Borrowed", value: mockRentals.filter((r) => r.type === "borrowed").length, color: "text-purple-600" },
    { label: "Total Lended", value: mockRentals.filter((r) => r.type === "lended").length, color: "text-green-600" },
    { label: "Completed", value: mockRentals.filter((r) => r.status === "completed").length, color: "text-gray-600" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">My Rentals</h1>
        <p className="text-[#2C2C2C]/60">
          Track and manage all your rental activities
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-md">
            <p className="text-sm text-[#2C2C2C]/60 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs & Filters */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#F1F3F5] p-1 rounded-xl">
          {[
            { id: "all", label: "All Rentals", icon: Package },
            { id: "borrowed", label: "Borrowed", icon: User },
            { id: "lended", label: "Lended", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md"
                    : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rentals..."
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rentals List */}
      {filteredRentals.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Rentals Found</h3>
          <p className="text-[#2C2C2C]/60 mb-6">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Start browsing items to rent or list your own!"}
          </p>
          <button
            onClick={() => router.push("/browse")}
            className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Browse Items
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRentals.map((rental) => {
            const statusConfig = getStatusConfig(rental.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={rental.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Item Image */}
                    <img
                      src={rental.itemImage}
                      alt={rental.itemName}
                      className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">
                            {rental.itemName}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-[#2C2C2C]/60">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {rental.type === "borrowed"
                                ? `From: ${rental.owner}`
                                : `To: ${rental.renter}`}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusConfig.bg} ${statusConfig.border}`}
                        >
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-sm font-semibold ${statusConfig.color}`}>
                            {statusConfig.label}
                          </span>
                        </div>
                      </div>

                      {/* Rental Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-[#1DA5A6]" />
                          <span className="text-[#2C2C2C]/70">
                            <strong className="text-[#2C2C2C]">
                              EGP {rental.price}
                            </strong>{" "}
                            {rental.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-[#2C2C2C]/70">
                            {rental.startDate} - {rental.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-[#2C2C2C]/70">{rental.location}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => router.push(`/messages`)}
                          className="flex items-center gap-2 px-4 py-2 bg-[#F1F3F5] text-[#2C2C2C] rounded-lg text-sm font-semibold hover:bg-[#1DA5A6]/10 transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#1DA5A6]/10 text-[#1DA5A6] rounded-lg text-sm font-semibold hover:bg-[#1DA5A6]/20 transition-all">
                          View Details
                        </button>
                        {rental.status === "completed" && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-[#FFC83D]/10 text-[#FFC83D] rounded-lg text-sm font-semibold hover:bg-[#FFC83D]/20 transition-all">
                            <Star className="w-4 h-4" />
                            Rate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}