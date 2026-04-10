"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  DollarSign,
  Users,
  Clock,
  Star,
  Heart,
  MessageCircle,
  Search,
  Filter,
  ChevronRight,
  MapPin,
  Calendar,
  ArrowUpRight,
  Award,
  Activity,
} from "lucide-react";

// Mock data
const stats = [
  {
    label: "Active Rentals",
    value: "5",
    change: "+2 this week",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    label: "Total Earnings",
    value: "EGP 1,250",
    change: "+15% this month",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    label: "Rating",
    value: "4.8",
    change: "Based on 24 reviews",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
  },
  {
    label: "Items Listed",
    value: "12",
    change: "8 available",
    icon: TrendingUp,
    color: "from-[#1DA5A6] to-[#194774]",
    bgColor: "bg-[#1DA5A6]/10",
    textColor: "text-[#1DA5A6]",
  },
];

const trendingItems = [
  {
    id: 1,
    title: "Scientific Calculator TI-84",
    category: "Electronics",
    price: "50",
    period: "week",
    image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&h=300&fit=crop",
    owner: "Sarah Ahmed",
    university: "Cairo University",
    rating: 4.9,
    reviews: 18,
    available: true,
  },
  {
    id: 2,
    title: "Engineering Drawing Set",
    category: "Tools",
    price: "30",
    period: "week",
    image: "https://images.unsplash.com/photo-1503551723145-6c040742065b?w=400&h=300&fit=crop",
    owner: "Mohamed Ali",
    university: "Ain Shams University",
    rating: 4.7,
    reviews: 12,
    available: true,
  },
  {
    id: 3,
    title: "Medical Stethoscope",
    category: "Medical",
    price: "40",
    period: "week",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=300&fit=crop",
    owner: "Fatma Hassan",
    university: "Alexandria University",
    rating: 5.0,
    reviews: 25,
    available: false,
  },
  {
    id: 4,
    title: "Laptop Stand & Cooling Pad",
    category: "Accessories",
    price: "25",
    period: "week",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    owner: "Ahmed Khaled",
    university: "GUC",
    rating: 4.6,
    reviews: 9,
    available: true,
  },
];

const recentActivity = [
  {
    id: 1,
    type: "rental",
    user: "Omar Youssef",
    action: "rented your",
    item: "Graphing Calculator",
    time: "2 hours ago",
    avatar: "OY",
  },
  {
    id: 2,
    type: "review",
    user: "Nada Ibrahim",
    action: "left a 5-star review for",
    item: "Arduino Kit",
    time: "5 hours ago",
    avatar: "NI",
  },
  {
    id: 3,
    type: "message",
    user: "Karim Mostafa",
    action: "sent you a message about",
    item: "Physics Textbook",
    time: "1 day ago",
    avatar: "KM",
  },
  {
    id: 4,
    type: "return",
    user: "Maha Salah",
    action: "returned your",
    item: "Lab Coat",
    time: "2 days ago",
    avatar: "MS",
  },
];

const quickActions = [
  {
    title: "List New Item",
    description: "Share your tools and earn",
    icon: Package,
    href: "/list-item",
    color: "from-[#1DA5A6] to-[#194774]",
  },
  {
    title: "Browse Items",
    description: "Find what you need",
    icon: Search,
    href: "/browse",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "My Rentals",
    description: "Track active rentals",
    icon: Clock,
    href: "/rentals",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Messages",
    description: "Chat with students",
    icon: MessageCircle,
    href: "/messages",
    color: "from-purple-500 to-pink-500",
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C2C2C]">
            Welcome back, <span className="text-gradient">Ahmed!</span>
          </h1>
          <p className="text-[#2C2C2C]/60 mt-1">
            Here's what's happening with your rentals today
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items..."
            className="w-full h-12 pl-10 pr-4 bg-white rounded-xl border border-[#2C2C2C]/10 text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 transition-all"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#2C2C2C]/40 group-hover:text-[#1DA5A6] transition-colors" />
              </div>
              <div>
                <p className="text-sm text-[#2C2C2C]/60 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#2C2C2C] mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-[#2C2C2C] mb-1 group-hover:text-[#1DA5A6] transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-[#2C2C2C]/60">{action.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Items */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1DA5A6]" />
              Trending Near You
            </h2>
            <Link
              href="/browse"
              className="text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trendingItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-[#2C2C2C]">
                      {item.category}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors group/heart">
                    <Heart className="w-5 h-5 text-[#2C2C2C]/60 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-colors" />
                  </button>
                  {!item.available && (
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-red-500/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-lg text-center">
                        Currently Unavailable
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-[#2C2C2C] mb-2 group-hover:text-[#1DA5A6] transition-colors">
                    {item.title}
                  </h3>

                  {/* Owner Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {item.owner.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#2C2C2C] truncate">
                        {item.owner}
                      </p>
                      <p className="text-xs text-[#2C2C2C]/60 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.university}
                      </p>
                    </div>
                  </div>

                  {/* Rating & Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#2C2C2C]/10">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-bold text-[#2C2C2C]">
                        {item.rating}
                      </span>
                      <span className="text-xs text-[#2C2C2C]/60">
                        ({item.reviews})
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#1DA5A6]">
                        EGP {item.price}
                      </p>
                      <p className="text-xs text-[#2C2C2C]/60">per {item.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#1DA5A6]" />
              Recent Activity
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 pb-4 border-b border-[#2C2C2C]/10 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#2C2C2C] leading-relaxed">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-semibold text-[#1DA5A6]">
                      {activity.item}
                    </span>
                  </p>
                  <p className="text-xs text-[#2C2C2C]/60 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/history"
              className="block text-center text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors pt-2"
            >
              View All Activity
            </Link>
          </div>

          {/* Achievement Card */}
          <div className="bg-gradient-to-br from-[#FFC83D] to-[#FF9500] rounded-2xl p-6 mt-4 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-90">Achievement</p>
                <p className="text-lg font-bold">Trusted Lender</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              You've completed 20+ successful rentals! Keep up the great work.
            </p>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">
              💡 Pro Tip: Boost Your Earnings
            </h3>
            <p className="text-sm text-[#2C2C2C]/70 leading-relaxed mb-3">
              Items with detailed descriptions and clear photos get rented 3x
              faster! Make sure to upload high-quality images and describe the
              condition accurately.
            </p>
            <Link
              href="/list-item"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              List an item now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}