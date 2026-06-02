"use client";

import { useState, useEffect } from "react";
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
  CheckCircle,
  X,
} from "lucide-react";
import { getUserRentals, updateRentalStatus } from "@/lib/data/rentals";
import { createReview, getReviewedRentalIds } from "@/lib/data/reviews";
import type { Rental, Item, Profile } from "@/lib/types";

type RentalWithType = Rental & { _type?: "borrowed" | "lended" };

export default function RentalsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"all" | "borrowed" | "lended">("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [rentals, setRentals] = useState<RentalWithType[]>([]);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reviewTarget, setReviewTarget] = useState<RentalWithType | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  async function load() {
    try {
      const [data, reviewed] = await Promise.all([
        getUserRentals(),
        getReviewedRentalIds(),
      ]);
      setRentals(data as RentalWithType[]);
      setReviewedIds(reviewed);
    } catch {
      // show empty state on error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    setActionLoading(id);
    const result = await updateRentalStatus(id, status);
    if (result.success) {
      setRentals((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: status as Rental["status"] } : r))
      );
    } else if (result.error) {
      alert(result.error);
    }
    setActionLoading(null);
  };

  const handleSubmitReview = async () => {
    if (!reviewTarget) return;
    setSubmittingReview(true);
    const otherUser =
      reviewTarget._type === "borrowed"
        ? (reviewTarget.lender as unknown as Profile)
        : (reviewTarget.borrower as unknown as Profile);
    const result = await createReview({
      rental_id: reviewTarget.id,
      reviewed_id: otherUser?.id || "",
      rating: reviewRating,
      comment: reviewComment.trim() || undefined,
    });
    setSubmittingReview(false);
    if (result.success) {
      setReviewedIds((prev) => [...prev, reviewTarget.id]);
      setReviewTarget(null);
      setReviewRating(5);
      setReviewComment("");
    } else if (result.error) {
      alert(result.error);
    }
  };

  const filteredRentals = rentals.filter((rental) => {
    const matchesTab = activeTab === "all" || rental._type === activeTab;
    const matchesStatus = statusFilter === "all" || rental.status === statusFilter;
    const itemTitle = (rental.item as unknown as Item)?.title || "";
    const matchesSearch = searchQuery === "" || itemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesStatus && matchesSearch;
  });

  const getStatusConfig = (status: Rental["status"]) => {
    switch (status) {
      case "active": return { label: "Active", icon: Clock, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200" };
      case "pending": return { label: "Pending", icon: AlertCircle, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" };
      case "completed": return { label: "Completed", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
      case "cancelled": return { label: "Cancelled", icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
    }
  };

  const stats = [
    { label: "Active Rentals", value: rentals.filter((r) => r.status === "active").length, color: "text-blue-600" },
    { label: "Total Borrowed", value: rentals.filter((r) => r._type === "borrowed").length, color: "text-purple-600" },
    { label: "Total Lended", value: rentals.filter((r) => r._type === "lended").length, color: "text-green-600" },
    { label: "Completed", value: rentals.filter((r) => r.status === "completed").length, color: "text-gray-600" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">My Orders & Rentals</h1>
        <p className="text-[#2C2C2C]/60">Track and manage all your purchases, sales, and rental activities</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 shadow-md">
            <p className="text-sm text-[#2C2C2C]/60 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
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
                onClick={() => setActiveTab(tab.id as "all" | "borrowed" | "lended")}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all ${
                  activeTab === tab.id ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md" : "text-[#2C2C2C]/60 hover:text-[#2C2C2C]"
                }`}
              >
                <Icon className="w-4 h-4" />{tab.label}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search rentals..."
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all" />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all appearance-none cursor-pointer">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {filteredRentals.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Rentals Found</h3>
          <p className="text-[#2C2C2C]/60 mb-6">{searchQuery ? "Try adjusting your search or filters" : "Start browsing items to rent or list your own!"}</p>
          <button onClick={() => router.push("/browse")} className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Browse Items
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRentals.map((rental) => {
            const statusConfig = getStatusConfig(rental.status);
            const StatusIcon = statusConfig.icon;
            const item = rental.item as unknown as Item;
            const otherUser = rental._type === "borrowed"
              ? (rental.lender as unknown as Profile)
              : (rental.borrower as unknown as Profile);
            const imageUrl = item?.image_paths?.[0] || "https://via.placeholder.com/150?text=Item";

            return (
              <div key={rental.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img src={imageUrl} alt={item?.title || "Item"} className="w-24 h-24 object-cover rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-[#2C2C2C]">{item?.title || "Item"}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${rental.transaction_type === "sale" ? "bg-purple-100 text-purple-700" : "bg-[#1DA5A6]/10 text-[#1DA5A6]"}`}>
                              {rental.transaction_type === "sale" ? (rental._type === "borrowed" ? "Bought" : "Sold") : "Rental"}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#2C2C2C]/60">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {rental._type === "borrowed" ? `From: ${otherUser?.full_name || "Unknown"}` : `To: ${otherUser?.full_name || "Unknown"}`}
                            </span>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${statusConfig.bg} ${statusConfig.border}`}>
                          <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                          <span className={`text-sm font-semibold ${statusConfig.color}`}>{statusConfig.label}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-[#1DA5A6]" />
                          <span className="text-[#2C2C2C]/70"><strong className="text-[#2C2C2C]">EGP {rental.total_price}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-500" />
                          <span className="text-[#2C2C2C]/70">{rental.transaction_type === "sale" ? "Purchased" : `${rental.start_date} - ${rental.end_date}`}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-[#2C2C2C]/70">{rental.pickup_location || "TBD"}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button onClick={() => router.push(`/messages`)} className="flex items-center gap-2 px-4 py-2 bg-[#F1F3F5] text-[#2C2C2C] rounded-lg text-sm font-semibold hover:bg-[#1DA5A6]/10 transition-all">
                          <MessageCircle className="w-4 h-4" />Message
                        </button>

                        {rental.status === "active" && rental._type === "lended" && (
                          <button
                            onClick={() => handleStatusChange(rental.id, "completed")}
                            disabled={actionLoading === rental.id}
                            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-100 transition-all disabled:opacity-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {rental.transaction_type === "sale" ? "Mark Delivered" : "Mark Returned"}
                          </button>
                        )}

                        {rental.status === "active" && (
                          <button
                            onClick={() => handleStatusChange(rental.id, "cancelled")}
                            disabled={actionLoading === rental.id}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition-all disabled:opacity-50"
                          >
                            <XCircle className="w-4 h-4" />Cancel
                          </button>
                        )}

                        {rental.status === "completed" && (
                          reviewedIds.includes(rental.id) ? (
                            <span className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-lg text-sm font-semibold">
                              <CheckCircle className="w-4 h-4" />Reviewed
                            </span>
                          ) : (
                            <button
                              onClick={() => setReviewTarget(rental)}
                              className="flex items-center gap-2 px-4 py-2 bg-[#FFC83D]/10 text-[#FFC83D] rounded-lg text-sm font-semibold hover:bg-[#FFC83D]/20 transition-all"
                            >
                              <Star className="w-4 h-4" />Rate
                            </button>
                          )
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

      {reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#2C2C2C]">Leave a Review</h3>
              <button
                onClick={() => setReviewTarget(null)}
                aria-label="Close"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#2C2C2C]/50 hover:bg-[#F1F3F5] transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#2C2C2C]/60 mb-4">
              How was your experience with{" "}
              <span className="font-semibold text-[#2C2C2C]">
                {(reviewTarget._type === "borrowed"
                  ? (reviewTarget.lender as unknown as Profile)
                  : (reviewTarget.borrower as unknown as Profile))?.full_name || "the other user"}
              </span>
              ?
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setReviewRating(star)}
                  aria-label={`${star} stars`}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-9 h-9 ${
                      star <= reviewRating ? "fill-[#FFC83D] text-[#FFC83D]" : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience (optional)"
              rows={4}
              className="w-full p-3 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all resize-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setReviewTarget(null)}
                className="flex-1 py-3 bg-[#F1F3F5] text-[#2C2C2C] rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={submittingReview}
                className="flex-1 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                {submittingReview ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
