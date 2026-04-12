"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  MessageCircle,
  ShieldCheck,
  Clock,
  Package,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Mock Data
const itemData = {
  id: "1",
  title: "Scientific Calculator TI-84 Plus",
  category: "📚 Books & Textbooks",
  price: 50,
  period: "Per Week",
  deposit: 100,
  condition: "Excellent",
  available: true,
  images: [
    "https://via.placeholder.com/600x400/1DA5A6/FFFFFF?text=Image+1",
    "https://via.placeholder.com/600x400/194774/FFFFFF?text=Image+2",
    "https://via.placeholder.com/600x400/FFC83D/FFFFFF?text=Image+3",
  ],
  description:
    "TI-84 Plus graphing calculator in excellent condition. Perfect for math, engineering, and science courses. Includes all original accessories and manual. Well-maintained and regularly cleaned.",
  features: [
    "Color display",
    "Pre-loaded apps",
    "USB connectivity",
    "Rechargeable battery",
    "Includes protective case",
  ],
  location: "Main Campus, Building 5",
  availableFrom: "2025-02-01",
  owner: {
    name: "Ahmed Hassan",
    avatar: "AH",
    rating: 4.8,
    totalReviews: 24,
    itemsListed: 12,
    responseTime: "within 2 hours",
    verified: true,
  },
  reviews: [
    {
      id: 1,
      user: "Sara Mohamed",
      avatar: "SM",
      rating: 5,
      date: "2 weeks ago",
      comment: "Great calculator! Ahmed was very helpful and responsive.",
    },
    {
      id: 2,
      user: "Omar Khaled",
      avatar: "OK",
      rating: 5,
      date: "1 month ago",
      comment: "Exactly as described. Quick pickup and return process.",
    },
    {
      id: 3,
      user: "Layla Ibrahim",
      avatar: "LI",
      rating: 4,
      date: "2 months ago",
      comment: "Good condition, helped me ace my exams!",
    },
  ],
};

export default function ItemDetailsPage() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === itemData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? itemData.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#2C2C2C] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Browse
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images & Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <img
                src={itemData.images[currentImageIndex]}
                alt={itemData.title}
                className="w-full h-full object-cover"
              />

              {/* Navigation Arrows */}
              {itemData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 text-white rounded-lg text-sm">
                {currentImageIndex + 1} / {itemData.images.length}
              </div>

              {/* Condition Badge */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-[#1DA5A6] text-white rounded-lg text-sm font-semibold">
                {itemData.condition}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="p-4 flex gap-2 overflow-x-auto">
              {itemData.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-[#1DA5A6]"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <p className="text-sm text-[#2C2C2C]/60 mb-2">
                  {itemData.category}
                </p>
                <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
                  {itemData.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-red-500 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <button className="w-10 h-10 border-2 border-gray-200 rounded-lg flex items-center justify-center hover:border-[#1DA5A6] transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-[#2C2C2C] mb-3">Description</h3>
              <p className="text-[#2C2C2C]/70 leading-relaxed">
                {itemData.description}
              </p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-bold text-[#2C2C2C] mb-3">Features</h3>
              <ul className="space-y-2">
                {itemData.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-[#2C2C2C]/70"
                  >
                    <div className="w-1.5 h-1.5 bg-[#1DA5A6] rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#1DA5A6]" />
                <div>
                  <p className="text-xs text-[#2C2C2C]/60">Pickup Location</p>
                  <p className="text-sm font-semibold text-[#2C2C2C]">
                    {itemData.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#1DA5A6]" />
                <div>
                  <p className="text-xs text-[#2C2C2C]/60">Available From</p>
                  <p className="text-sm font-semibold text-[#2C2C2C]">
                    {itemData.availableFrom}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#2C2C2C]">
                Reviews ({itemData.reviews.length})
              </h3>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-[#FFC83D] text-[#FFC83D]" />
                <span className="font-bold text-[#2C2C2C]">
                  {itemData.owner.rating}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {itemData.reviews
                .slice(0, showAllReviews ? undefined : 2)
                .map((review) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white font-semibold">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-[#2C2C2C]">
                              {review.user}
                            </p>
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
                        <p className="text-sm text-[#2C2C2C]/70">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {itemData.reviews.length > 2 && (
              <button
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="mt-4 text-sm font-semibold text-[#1DA5A6] hover:underline"
              >
                {showAllReviews ? "Show Less" : "Show All Reviews"}
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Owner & Booking */}
        <div className="lg:col-span-1 space-y-6">
          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <div className="mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-[#1DA5A6]">
                  EGP {itemData.price}
                </span>
                <span className="text-[#2C2C2C]/60">/ {itemData.period}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#2C2C2C]/60">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Security Deposit: EGP {itemData.deposit}</span>
              </div>
            </div>

            {/* Availability Status */}
            <div
              className={`p-4 rounded-xl mb-6 ${
                itemData.available
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {itemData.available ? (
                  <>
                    <Package className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">
                      Available Now
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-red-900">
                      Currently Unavailable
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => router.push("/checkout")}
                disabled={!itemData.available}
                className="w-full h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rent Now
              </button>
              <button
                onClick={() => router.push("/messages")}
                className="w-full h-12 bg-white border-2 border-[#1DA5A6] text-[#1DA5A6] font-bold rounded-xl hover:bg-[#1DA5A6]/5 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Message Owner
              </button>
            </div>
          </div>

          {/* Owner Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Lender</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white font-bold text-xl">
                {itemData.owner.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-[#2C2C2C]">
                    {itemData.owner.name}
                  </h4>
                  {itemData.owner.verified && (
                    <ShieldCheck className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-[#FFC83D] text-[#FFC83D]" />
                  <span className="text-sm font-semibold text-[#2C2C2C]">
                    {itemData.owner.rating}
                  </span>
                  <span className="text-sm text-[#2C2C2C]/60">
                    ({itemData.owner.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#2C2C2C]/60">Items Listed</span>
                <span className="font-semibold text-[#2C2C2C]">
                  {itemData.owner.itemsListed}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#2C2C2C]/60">Response Time</span>
                <span className="font-semibold text-[#2C2C2C]">
                  {itemData.owner.responseTime}
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/users/${itemData.owner.name}`)}
              className="w-full mt-4 h-10 bg-gray-100 text-[#2C2C2C] font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Profile
            </button>
          </div>

          {/* Safety Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h4 className="font-bold text-blue-900">Safety Tips</h4>
            </div>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex gap-2">
                <span>•</span>
                <span>Meet in a safe public location</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Check item condition before payment</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Keep all communication on platform</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Report suspicious activity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}