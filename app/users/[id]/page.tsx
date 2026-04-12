"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Star,
  ShieldCheck,
  MessageCircle,
  Package,
  Calendar,
  Award,
  TrendingUp,
} from "lucide-react";

// Mock User Data
const userData = {
  id: "1",
  name: "Ahmed Hassan",
  avatar: "AH",
  university: "Cairo University",
  major: "Computer Science",
  joinDate: "January 2024",
  verified: true,
  location: "Cairo, Egypt",
  bio: "Engineering student passionate about technology. I rent out my tech gadgets and study materials to help fellow students save money.",
  stats: {
    rating: 4.8,
    totalReviews: 24,
    itemsListed: 12,
    completedRentals: 45,
    responseTime: "within 2 hours",
    responseRate: "98%",
  },
  items: [
    {
      id: "1",
      title: "Scientific Calculator TI-84 Plus",
      price: 50,
      period: "Per Week",
      image: "https://via.placeholder.com/200",
      rating: 4.8,
      available: true,
    },
    {
      id: "2",
      title: "Engineering Drawing Set",
      price: 30,
      period: "Per Day",
      image: "https://via.placeholder.com/200",
      rating: 4.9,
      available: true,
    },
    {
      id: "3",
      title: "Organic Chemistry Textbook",
      price: 40,
      period: "Per Month",
      image: "https://via.placeholder.com/200",
      rating: 5.0,
      available: false,
    },
    {
      id: "4",
      title: "Arduino Starter Kit",
      price: 80,
      period: "Per Week",
      image: "https://via.placeholder.com/200",
      rating: 4.7,
      available: true,
    },
  ],
  reviews: [
    {
      id: "1",
      reviewer: "Sara Mohamed",
      avatar: "SM",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Great experience! Ahmed was very helpful and the item was exactly as described.",
      itemRented: "Scientific Calculator",
    },
    {
      id: "2",
      reviewer: "Omar Khaled",
      avatar: "OK",
      rating: 5,
      date: "1 month ago",
      comment:
        "Fast response and smooth transaction. Highly recommended!",
      itemRented: "Drawing Set",
    },
    {
      id: "3",
      reviewer: "Layla Ibrahim",
      avatar: "LI",
      rating: 4,
      date: "2 months ago",
      comment: "Good condition item. Pickup was convenient.",
      itemRented: "Chemistry Book",
    },
  ],
};

export default function UserProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"items" | "reviews">("items");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#2C2C2C] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                {userData.avatar}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-[#2C2C2C]">
                  {userData.name}
                </h1>
                {userData.verified && (
                  <ShieldCheck className="w-6 h-6 text-blue-500" />
                )}
              </div>
              <p className="text-[#2C2C2C]/60 text-sm mb-1">
                {userData.university}
              </p>
              <p className="text-[#2C2C2C]/60 text-sm">{userData.major}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-6 p-4 bg-[#FFC83D]/10 rounded-xl">
              <Star className="w-6 h-6 fill-[#FFC83D] text-[#FFC83D]" />
              <span className="text-2xl font-bold text-[#2C2C2C]">
                {userData.stats.rating}
              </span>
              <span className="text-sm text-[#2C2C2C]/60">
                ({userData.stats.totalReviews} reviews)
              </span>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h3 className="font-bold text-[#2C2C2C] mb-2">About</h3>
              <p className="text-sm text-[#2C2C2C]/70 leading-relaxed">
                {userData.bio}
              </p>
            </div>

            {/* Info */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-[#1DA5A6]" />
                <span className="text-[#2C2C2C]/70">{userData.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-[#1DA5A6]" />
                <span className="text-[#2C2C2C]/70">
                  Joined {userData.joinDate}
                </span>
              </div>
            </div>

            {/* Contact Button */}
            <button
              onClick={() => router.push("/messages")}
              className="w-full h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Send Message
            </button>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">Items Listed</span>
                <span className="font-bold text-[#2C2C2C]">
                  {userData.stats.itemsListed}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">
                  Completed Rentals
                </span>
                <span className="font-bold text-[#2C2C2C]">
                  {userData.stats.completedRentals}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">Response Time</span>
                <span className="font-bold text-[#2C2C2C]">
                  {userData.stats.responseTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#2C2C2C]/60">Response Rate</span>
                <span className="font-bold text-green-600">
                  {userData.stats.responseRate}
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Achievements</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🌟", label: "Top Rated", color: "bg-yellow-50" },
                { icon: "⚡", label: "Fast Response", color: "bg-blue-50" },
                { icon: "🎯", label: "Verified", color: "bg-green-50" },
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`${badge.color} p-3 rounded-xl text-center`}
                >
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <p className="text-xs font-semibold text-[#2C2C2C]">
                    {badge.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Items & Reviews */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-md p-2 mb-6 flex gap-2">
            <button
              onClick={() => setActiveTab("items")}
              className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "items"
                  ? "bg-[#1DA5A6] text-white"
                  : "text-[#2C2C2C]/60 hover:bg-gray-50"
              }`}
            >
              Items ({userData.items.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 h-10 rounded-lg font-semibold text-sm transition-all ${
                activeTab === "reviews"
                  ? "bg-[#1DA5A6] text-white"
                  : "text-[#2C2C2C]/60 hover:bg-gray-50"
              }`}
            >
              Reviews ({userData.reviews.length})
            </button>
          </div>

          {/* Items Tab */}
          {activeTab === "items" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userData.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => router.push(`/items/${item.id}`)}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                    {!item.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="px-4 py-2 bg-white rounded-lg font-bold text-sm">
                          Not Available
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#2C2C2C] mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-[#1DA5A6]">
                          EGP {item.price}
                        </p>
                        <p className="text-xs text-[#2C2C2C]/60">
                          {item.period}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FFC83D] text-[#FFC83D]" />
                        <span className="text-sm font-semibold text-[#2C2C2C]">
                          {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {userData.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl shadow-md p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                      {review.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-bold text-[#2C2C2C]">
                            {review.reviewer}
                          </h4>
                          <p className="text-xs text-[#2C2C2C]/60">
                            {review.date}
                          </p>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-[#FFC83D] text-[#FFC83D]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-[#2C2C2C]/70 mb-2">
                        {review.comment}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
                        <Package className="w-3 h-3 text-[#2C2C2C]/60" />
                        <span className="text-xs text-[#2C2C2C]/60">
                          {review.itemRented}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}