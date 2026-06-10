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
  Search,
  History,
  LifeBuoy,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { logout } from "@/app/auth/actions";
import { getCurrentProfile } from "@/lib/data/profile";
import { getUnreadMessageCount } from "@/lib/data/messages";
import type { Profile } from "@/lib/types";

export default function Sidebar() {
  const pathname = usePathname();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [authLoaded, setAuthLoaded] = useState(false);

  const open = pinned || hovered;

  useEffect(() => {
    getCurrentProfile()
      .then(setProfile)
      .finally(() => setAuthLoaded(true));
  }, []);

  // Re-fetch the unread message badge on every navigation so it stays fresh.
  useEffect(() => {
    getUnreadMessageCount().then(setUnreadMessages).catch(() => {});
  }, [pathname]);

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
    { name: "History", path: "/history", icon: History, public: false },
    { name: "Profile", path: "/profile", icon: User, public: false },
    { name: "Settings", path: "/settings", icon: Settings, public: false },
    { name: "Support", path: "/support", icon: LifeBuoy, public: true },
  ];

  const menuItems = isAuthed ? allMenuItems : allMenuItems.filter((m) => m.public);

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-0 left-0 z-40 flex h-full flex-col border-r border-[#2C2C2C]/10 bg-white shadow-lg transition-[width] duration-300 ease-in-out ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Brand + collapse toggle */}
      <div className="flex h-16 items-center justify-between border-b border-[#2C2C2C]/10 px-4">
        <Link href="/home" className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1DA5A6] to-[#194774] shadow-md">
            <Package className="h-5 w-5 text-white" />
          </div>
          <div className={`min-w-0 transition-opacity duration-200 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
            <h1 className="text-lg font-extrabold leading-tight text-[#2C2C2C]">
              Uni<span className="text-[#1DA5A6]">Tool</span>
            </h1>
            <p className="truncate text-xs text-[#2C2C2C]/60">Student Marketplace</p>
          </div>
        </Link>
        <button
          onClick={() => setPinned((p) => !p)}
          aria-label={pinned ? "Collapse sidebar" : "Expand sidebar"}
          className={`flex-shrink-0 rounded-lg p-1.5 text-[#2C2C2C]/50 transition-all hover:bg-[#F1F3F5] hover:text-[#2C2C2C] ${
            open ? "" : "hidden"
          }`}
        >
          {pinned ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  title={item.name}
                  className={`group/item relative flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md"
                      : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5] hover:text-[#2C2C2C]"
                  }`}
                >
                  <span className="relative flex-shrink-0">
                    <Icon className="h-5 w-5" />
                    {/* Collapsed badge dot */}
                    {item.badge && !open && (
                      <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap text-sm font-medium transition-opacity duration-200 ${
                      open ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                  >
                    {item.name}
                  </span>
                  {item.badge && open && (
                    <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer: user / auth */}
      <div className="border-t border-[#2C2C2C]/10 p-3">
        {!authLoaded ? null : isAuthed ? (
          <>
            <div className={`mb-2 flex items-center gap-3 rounded-xl bg-[#F1F3F5] p-2 ${open ? "" : "justify-center"}`}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt={profile?.full_name || ""} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1DA5A6] to-[#194774] font-bold text-white">
                    {initials}
                  </div>
                )}
              </div>
              <div className={`min-w-0 flex-1 ${open ? "block" : "hidden"}`}>
                <p className="truncate text-sm font-semibold text-[#2C2C2C]">{profile?.full_name || ""}</p>
                <p className="truncate text-xs text-[#2C2C2C]/60">{profile?.university || ""}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-red-500 transition-all hover:bg-red-50 ${
                open ? "" : "justify-center"
              }`}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className={`whitespace-nowrap text-sm font-medium ${open ? "block" : "hidden"}`}>Logout</span>
            </button>
          </>
        ) : (
          (() => {
            const isAuthPage = ["/login", "/signup", "/forgot-password", "/setup"].includes(pathname);
            const redirectParam =
              !isAuthPage && pathname && pathname !== "/"
                ? `?redirect=${encodeURIComponent(pathname)}`
                : "";
            return (
              <div className="space-y-2">
                <Link
                  href={`/login${redirectParam}`}
                  title="Sign In"
                  className={`flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#1DA5A6] to-[#194774] px-3 py-3 font-semibold text-white transition-all hover:shadow-md`}
                >
                  <User className="h-5 w-5 flex-shrink-0" />
                  <span className={`${open ? "block" : "hidden"}`}>Sign In</span>
                </Link>
                {open && (
                  <Link
                    href={`/signup${redirectParam}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#1DA5A6] bg-white px-3 py-3 font-semibold text-[#1DA5A6] transition-all hover:bg-[#1DA5A6]/5"
                  >
                    Sign Up
                  </Link>
                )}
              </div>
            );
          })()
        )}
      </div>
    </aside>
  );
}
