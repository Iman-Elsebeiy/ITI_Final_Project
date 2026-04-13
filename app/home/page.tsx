"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  DollarSign,
  Clock,
  Star,
  Heart,
  MessageCircle,
  Search,
  ChevronRight,
  MapPin,
  ArrowUpRight,
  Award,
  Activity,
} from "lucide-react";
import { getCurrentProfile } from "@/lib/data/profile";
import { getItems } from "@/lib/data/items";
import { getRentalStats } from "@/lib/data/rentals";
import { getNotifications } from "@/lib/data/notifications";
import type { Profile, Item, Notification } from "@/lib/types";
import { PERIOD_LABELS } from "@/lib/types";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trendingItems, setTrendingItems] = useState<Item[]>([]);
  const [recentActivity, setRecentActivity] = useState<Notification[]>([]);
  const [stats, setStats] = useState({ activeRentals: 0, totalEarnings: 0, totalSpent: 0, itemsListed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [profileData, items, rentalStats, notifications] = await Promise.all([
        getCurrentProfile(),
        getItems({ limit: 4 }),
        getRentalStats(),
        getNotifications(),
      ]);
      setProfile(profileData);
      setTrendingItems(items);
      setStats(rentalStats);
      setRecentActivity(notifications.slice(0, 4));
      setLoading(false);
    }
    loadData();
  }, []);

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  const statCards = [
    {
      label: "Active Rentals",
      value: String(stats.activeRentals),
      change: "Current",
      icon: Package,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "Total Earnings",
      value: `EGP ${stats.totalEarnings.toLocaleString()}`,
      change: "All time",
      icon: DollarSign,
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      label: "Total Spent",
      value: `EGP ${stats.totalSpent.toLocaleString()}`,
      change: "All time",
      icon: TrendingUp,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      label: "Items Listed",
      value: String(stats.itemsListed),
      change: "Your items",
      icon: TrendingUp,
      bgColor: "bg-[#1DA5A6]/10",
      textColor: "text-[#1DA5A6]",
    },
  ];

  const quickActions = [
    { title: "List New Item", description: "Share your tools and earn", icon: Package, href: "/list-item", color: "from-[#1DA5A6] to-[#194774]" },
    { title: "Browse Items", description: "Find what you need", icon: Search, href: "/browse", color: "from-blue-500 to-cyan-500" },
    { title: "My Rentals", description: "Track active rentals", icon: Clock, href: "/rentals", color: "from-green-500 to-emerald-500" },
    { title: "Messages", description: "Chat with students", icon: MessageCircle, href: "/messages", color: "from-purple-500 to-pink-500" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C2C2C]">
            Welcome back, <span className="text-gradient">{firstName}!</span>
          </h1>
          <p className="text-[#2C2C2C]/60 mt-1">
            Here&apos;s what&apos;s happening with your rentals today
          </p>
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-[#2C2C2C]/40 group-hover:text-[#1DA5A6] transition-colors" />
              </div>
              <div>
                <p className="text-sm text-[#2C2C2C]/60 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-[#2C2C2C] mb-1">{stat.value}</p>
                <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link key={index} href={action.href} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group">
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-[#2C2C2C] mb-1 group-hover:text-[#1DA5A6] transition-colors">{action.title}</h3>
              <p className="text-sm text-[#2C2C2C]/60">{action.description}</p>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1DA5A6]" />
              Recent Items
            </h2>
            <Link href="/browse" className="text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {trendingItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
              <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">No items yet</h3>
              <p className="text-sm text-[#2C2C2C]/60 mb-4">Be the first to list an item!</p>
              <Link href="/list-item" className="inline-flex px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                List Item
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingItems.map((item) => {
                const ownerName = (item.owner as unknown as Profile)?.full_name || "Unknown";
                const ownerUni = (item.owner as unknown as Profile)?.university || "";
                const ownerInitials = ownerName.split(" ").map((n) => n[0]).join("").toUpperCase();
                const imageUrl = item.image_paths?.[0] || "https://via.placeholder.com/400x300?text=No+Image";

                return (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group">
                    <div className="relative h-48 overflow-hidden">
                      <img src={imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-[#2C2C2C]">{item.category}</span>
                      </div>
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors group/heart">
                        <Heart className={`w-5 h-5 ${item.is_favorite ? "fill-red-500 text-red-500" : "text-[#2C2C2C]/60"} group-hover/heart:text-red-500 transition-colors`} />
                      </button>
                      {!item.available && (
                        <div className="absolute bottom-3 left-3 right-3">
                          <div className="bg-red-500/90 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-lg text-center">Currently Unavailable</div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#2C2C2C] mb-2 group-hover:text-[#1DA5A6] transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-xs font-bold">{ownerInitials}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#2C2C2C] truncate">{ownerName}</p>
                          {ownerUni && (
                            <p className="text-xs text-[#2C2C2C]/60 truncate flex items-center gap-1">
                              <MapPin className="w-3 h-3" />{ownerUni}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-[#2C2C2C]/10">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold text-[#2C2C2C]">{item.avg_rating?.toFixed(1) || "New"}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#1DA5A6]">EGP {item.price}</p>
                          <p className="text-xs text-[#2C2C2C]/60">{PERIOD_LABELS[item.rental_period] || item.rental_period}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#2C2C2C] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#1DA5A6]" />
              Recent Activity
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-4 space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-[#2C2C2C]/60 text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map((notification) => {
                const actorName = (notification.actor as unknown as Profile)?.full_name || "Someone";
                const actorInitials = actorName.split(" ").map((n) => n[0]).join("").toUpperCase();
                const timeAgo = getTimeAgo(notification.created_at);

                return (
                  <div key={notification.id} className="flex gap-3 pb-4 border-b border-[#2C2C2C]/10 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {actorInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#2C2C2C] leading-relaxed">{notification.content}</p>
                      <p className="text-xs text-[#2C2C2C]/60 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{timeAgo}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            <Link href="/history" className="block text-center text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors pt-2">
              View All Activity
            </Link>
          </div>

          <div className="bg-gradient-to-br from-[#FFC83D] to-[#FF9500] rounded-2xl p-6 mt-4 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold opacity-90">Welcome</p>
                <p className="text-lg font-bold">Start Sharing!</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              List your first item and start earning from tools you&apos;re not using!
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#2C2C2C] mb-2">Pro Tip: Boost Your Earnings</h3>
            <p className="text-sm text-[#2C2C2C]/70 leading-relaxed mb-3">
              Items with detailed descriptions and clear photos get rented 3x faster! Make sure to upload high-quality images and describe the condition accurately.
            </p>
            <Link href="/list-item" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              List an item now
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
