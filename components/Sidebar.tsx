"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  PlusCircle,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Heart,
  History,
} from "lucide-react";
import { logout } from "@/app/auth/actions";
import { getCurrentProfile } from "@/lib/data/profile";
import { getUnreadMessageCount } from "@/lib/data/messages";
import type { Profile } from "@/lib/types";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    getCurrentProfile()
      .then(setProfile)
      .finally(() => setAuthLoaded(true));
    getUnreadMessageCount().then(setUnreadMessages).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const isAuthed = !!profile;

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "?";

  const allMenuItems = [
    { name: "Home", path: "/home", icon: Home, public: true },
    { name: "Browse Items", path: "/browse", icon: Search, public: true },
    { name: "My Rentals", path: "/rentals", icon: Package, public: false },
    { name: "List Item", path: "/list-item", icon: PlusCircle, public: false },
    { name: "Messages", path: "/messages", icon: MessageCircle, badge: unreadMessages || undefined, public: false },
    { name: "Favorites", path: "/favorites", icon: Heart, public: false },
    { name: "History", path: "/history", icon: History, public: false },
    { name: "Profile", path: "/profile", icon: User, public: false },
    { name: "Settings", path: "/settings", icon: Settings, public: false },
  ];

  const menuItems = isAuthed ? allMenuItems : allMenuItems.filter((m) => m.public);

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center hover:shadow-xl transition-all"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-[#2C2C2C]" />
        ) : (
          <Menu className="w-6 h-6 text-[#2C2C2C]" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-[#2C2C2C]/10">
          <Link href="/home" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-xl flex items-center justify-center shadow-md">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-[#2C2C2C] leading-tight">
                Uni<span className="text-[#1DA5A6]">Tool</span>
              </h1>
              <p className="text-xs text-[#2C2C2C]/60">Student Marketplace</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md"
                        : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5] hover:text-[#2C2C2C]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.name}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#2C2C2C]/10">
          {!authLoaded ? null : isAuthed ? (
            <>
              <div className="flex items-center gap-3 px-4 py-3 bg-[#F1F3F5] rounded-xl mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt={profile?.full_name || ""} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1DA5A6] to-[#194774] flex items-center justify-center text-white font-bold">
                      {initials}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#2C2C2C] truncate">
                    {profile?.full_name || ""}
                  </p>
                  <p className="text-xs text-[#2C2C2C]/60 truncate">
                    {profile?.university || ""}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </>
          ) : (
            (() => {
              const isAuthPage = ["/login", "/signup", "/forgot-password", "/setup"].includes(pathname);
              const redirectParam = !isAuthPage && pathname && pathname !== "/"
                ? `?redirect=${encodeURIComponent(pathname)}`
                : "";
              return (
                <div className="space-y-2">
                  <Link
                    href={`/login${redirectParam}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-semibold rounded-xl hover:shadow-md transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={`/signup${redirectParam}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-[#1DA5A6] text-[#1DA5A6] font-semibold rounded-xl hover:bg-[#1DA5A6]/5 transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              );
            })()
          )}
        </div>
      </aside>
    </>
  );
}
