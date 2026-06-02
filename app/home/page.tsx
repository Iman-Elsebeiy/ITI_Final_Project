"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  ShieldCheck,
  Users,
  Sparkles,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { getCurrentProfile } from "@/lib/data/profile";
import { getItems } from "@/lib/data/items";
import { getRentalStats } from "@/lib/data/rentals";
import { getNotifications } from "@/lib/data/notifications";
import { createSupportTicket } from "@/lib/data/support";
import type { Profile, Item, Notification } from "@/lib/types";
import { PERIOD_LABELS, CATEGORIES } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trendingItems, setTrendingItems] = useState<Item[]>([]);
  const [recentActivity, setRecentActivity] = useState<Notification[]>([]);
  const [stats, setStats] = useState({ activeRentals: 0, totalEarnings: 0, totalSpent: 0, itemsListed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, itemsData, rentalStats, notifications] = await Promise.allSettled([
          getCurrentProfile(),
          getItems({ limit: 8 }),
          getRentalStats(),
          getNotifications(),
        ]);

        if (profileData.status === "fulfilled") setProfile(profileData.value);
        if (itemsData.status === "fulfilled") setTrendingItems(itemsData.value);
        if (rentalStats.status === "fulfilled") setStats(rentalStats.value);
        if (notifications.status === "fulfilled") setRecentActivity(notifications.value.slice(0, 4));
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ================== PUBLIC LANDING (anonymous visitors) ==================
  if (!profile) {
    return <PublicLanding items={trendingItems} initialSearch={searchQuery} onSearchChange={setSearchQuery} />;
  }

  // ================== DASHBOARD (logged-in users) ==================
  const firstName = profile?.full_name?.split(" ")[0] || "there";

  const statCards = [
    { label: "Active Rentals", value: String(stats.activeRentals), change: "Current", icon: Package, bgColor: "bg-blue-50", textColor: "text-blue-600" },
    { label: "Total Earnings", value: `EGP ${stats.totalEarnings.toLocaleString()}`, change: "All time", icon: DollarSign, bgColor: "bg-green-50", textColor: "text-green-600" },
    { label: "Total Spent", value: `EGP ${stats.totalSpent.toLocaleString()}`, change: "All time", icon: TrendingUp, bgColor: "bg-yellow-50", textColor: "text-yellow-600" },
    { label: "Items Listed", value: String(stats.itemsListed), change: "Your items", icon: TrendingUp, bgColor: "bg-[#1DA5A6]/10", textColor: "text-[#1DA5A6]" },
  ];

  const quickActions = [
    { title: "List New Item", description: "Share your tools and earn", icon: Package, href: "/list-item", color: "from-[#1DA5A6] to-[#194774]" },
    { title: "Browse Items", description: "Find what you need", icon: Search, href: "/browse", color: "from-blue-500 to-cyan-500" },
    { title: "My Rentals", description: "Track active rentals", icon: Clock, href: "/rentals", color: "from-green-500 to-emerald-500" },
    { title: "Messages", description: "Chat with students", icon: MessageCircle, href: "/messages", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2C2C2C]">
            Welcome back, <span className="text-gradient">{firstName}!</span>
          </h1>
          <p className="text-[#2C2C2C]/60 mt-1">Here&apos;s what&apos;s happening with your rentals today</p>
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
              {trendingItems.slice(0, 4).map((item) => {
                const ownerName = (item.owner as unknown as Profile)?.full_name || "Unknown";
                const ownerUni = (item.owner as unknown as Profile)?.university || "";
                const ownerInitials = ownerName.split(" ").map((n) => n[0]).join("").toUpperCase();
                const imageUrl = item.image_paths?.[0] || "https://via.placeholder.com/400x300?text=No+Image";

                return (
                  <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer" onClick={() => router.push(`/item/${item.id}`)}>
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
    </div>
  );
}

// ============================================================
// PUBLIC LANDING COMPONENT (Anonymous visitors)
// ============================================================
function PublicLanding({
  items,
  initialSearch,
  onSearchChange,
}: {
  items: Item[];
  initialSearch: string;
  onSearchChange: (v: string) => void;
}) {
  const router = useRouter();
  const [search, setSearch] = useState(initialSearch);

  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [contactSending, setContactSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError("");
    setContactSending(true);
    const result = await createSupportTicket({
      name: contact.name,
      email: contact.email,
      message: contact.message,
      subject: "Contact form message",
      source: "contact",
    });
    setContactSending(false);
    if (result?.error) {
      setContactError(result.error);
      return;
    }
    setContact({ name: "", email: "", message: "" });
    setContactSuccess(true);
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/browse?q=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/browse");
    }
  };

  return (
    <div className="-m-6 md:-m-8">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1DA5A6] via-[#178A8B] to-[#194774] text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FFC83D] rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-[#FFC83D]" />
            The #1 Student Marketplace in Egypt
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Rent What You Need.<br />
            <span className="text-[#FFC83D]">Earn From What You Own.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            UniTool connects students across universities to rent and lend tools, books, electronics, and more — safely and affordably.
          </p>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden p-2">
              <Search className="w-5 h-5 text-[#2C2C2C]/40 ml-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); onSearchChange(e.target.value); }}
                placeholder="Search for cameras, books, calculators..."
                className="flex-1 px-3 py-3 text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none"
              />
              <button type="submit" className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/browse" className="px-8 py-4 bg-white text-[#194774] rounded-xl font-bold hover:bg-[#FFC83D] hover:text-[#2C2C2C] transition-all shadow-lg">
              Browse Items
            </Link>
            <Link href="/signup" className="px-8 py-4 bg-white/10 backdrop-blur border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-[#194774] transition-all">
              Join Free
            </Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className="bg-white border-b border-[#2C2C2C]/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex gap-3 overflow-x-auto">
          {CATEGORIES.slice(0, 8).map((cat) => (
            <Link
              key={cat}
              href={`/browse?category=${encodeURIComponent(cat)}`}
              className="flex-shrink-0 px-5 py-2.5 bg-[#1DA5A6]/5 hover:bg-[#1DA5A6] hover:text-white text-[#194774] rounded-full text-sm font-semibold transition-all"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-[#F9FAFB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1DA5A6] font-semibold mb-2 uppercase tracking-wider text-sm">About UniTool</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2C2C] mb-4">
              Built by Students, For Students
            </h2>
            <p className="text-[#2C2C2C]/70 max-w-2xl mx-auto text-lg">
              We help students save money and earn extra income by sharing the tools, books, and equipment they already own.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, title: "Safe & Trusted", desc: "Verified student accounts and secure payments via Stripe.", color: "from-[#1DA5A6] to-[#194774]" },
              { icon: DollarSign, title: "Affordable Prices", desc: "Rent for a fraction of the cost of buying new.", color: "from-green-500 to-emerald-600" },
              { icon: Users, title: "Student Community", desc: "Connect with students from your university and across Egypt.", color: "from-[#FFC83D] to-[#FF9500]" },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all">
                  <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-5 shadow-md`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">{f.title}</h3>
                  <p className="text-[#2C2C2C]/70 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-[#1DA5A6] font-semibold mb-2 uppercase tracking-wider text-sm">Featured</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2C2C]">Popular This Week</h2>
            </div>
            <Link href="/browse" className="flex items-center gap-2 text-[#1DA5A6] font-semibold hover:text-[#194774] transition-colors">
              View All Items
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="bg-[#F9FAFB] rounded-2xl p-16 text-center">
              <Package className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
              <p className="text-[#2C2C2C]/60">No items available yet. Be the first to list!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {items.slice(0, 8).map((item) => {
                const imageUrl = item.image_paths?.[0] || "https://via.placeholder.com/400x300?text=No+Image";
                return (
                  <Link key={item.id} href={`/item/${item.id}`} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group border border-[#2C2C2C]/5">
                    <div className="relative h-44 overflow-hidden bg-[#F9FAFB]">
                      <img src={imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur rounded-full text-xs font-semibold text-[#194774]">{item.category}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-[#2C2C2C] mb-2 line-clamp-1 group-hover:text-[#1DA5A6] transition-colors">{item.title}</h3>
                      <div className="flex items-center justify-between pt-2 border-t border-[#2C2C2C]/10">
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
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#F9FAFB] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#1DA5A6] font-semibold mb-2 uppercase tracking-wider text-sm">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2C2C2C]">Start in 3 Easy Steps</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Browse & Discover", desc: "Search thousands of items shared by fellow students." },
              { n: "02", title: "Rent Securely", desc: "Pay safely online and chat with the owner directly." },
              { n: "03", title: "Use & Return", desc: "Enjoy the item, then return it when you're done." },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="absolute -top-4 -right-4 text-8xl font-extrabold text-[#1DA5A6]/5">{s.n}</div>
                <div className="relative">
                  <div className="text-[#1DA5A6] font-bold text-sm mb-3">STEP {s.n}</div>
                  <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">{s.title}</h3>
                  <p className="text-[#2C2C2C]/70">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-gradient-to-br from-[#194774] to-[#1DA5A6] text-white py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#FFC83D] font-semibold mb-2 uppercase tracking-wider text-sm">Contact Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Get In Touch</h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Have questions, feedback, or partnership ideas? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Mail className="w-8 h-8 text-[#FFC83D] mx-auto mb-3" />
              <p className="font-semibold mb-1">Email</p>
              <p className="text-sm text-white/80">support@unitool.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <Phone className="w-8 h-8 text-[#FFC83D] mx-auto mb-3" />
              <p className="font-semibold mb-1">Phone</p>
              <p className="text-sm text-white/80">+20 100 000 0000</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
              <MessageCircle className="w-8 h-8 text-[#FFC83D] mx-auto mb-3" />
              <p className="font-semibold mb-1">Support</p>
              <Link href="/support" className="text-sm text-white/80 hover:text-[#FFC83D]">Visit Help Center</Link>
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 md:p-8 space-y-4"
          >
            {contactSuccess && (
              <div className="px-4 py-3 bg-[#FFC83D]/20 border border-[#FFC83D]/40 rounded-xl text-sm font-semibold text-white">
                Thanks for reaching out! We&apos;ll get back to you soon.
              </div>
            )}
            {contactError && (
              <div className="px-4 py-3 bg-red-500/20 border border-red-400/40 rounded-xl text-sm font-semibold text-white">
                {contactError}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Your Name"
                value={contact.name}
                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
              />
              <input
                required
                type="email"
                placeholder="Your Email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
              />
            </div>
            <textarea
              required
              rows={4}
              placeholder="Your Message"
              value={contact.message}
              onChange={(e) => setContact({ ...contact, message: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#FFC83D] resize-none"
            />
            <button
              type="submit"
              disabled={contactSending}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#FFC83D] text-[#194774] rounded-xl font-bold hover:bg-white transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {contactSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F2E4C] text-white/70 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-white font-bold text-lg">UniTool</p>
            <p className="text-sm">© {new Date().getFullYear()} UniTool. The Student Marketplace.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/support" className="hover:text-white">Support</Link>
          </div>
        </div>
      </footer>
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
