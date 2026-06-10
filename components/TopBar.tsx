"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Heart } from "lucide-react";
import { getCurrentProfile } from "@/lib/data/profile";
import { getUnreadNotificationCount } from "@/lib/data/notifications";
import type { Profile } from "@/lib/types";

export default function TopBar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    getCurrentProfile().then(setProfile).catch(() => {});
  }, []);

  // Refresh the unread badge on every navigation so it doesn't go stale.
  useEffect(() => {
    getUnreadNotificationCount().then(setUnreadNotifications).catch(() => {});
  }, [pathname]);

  if (!profile) return null;

  const isActive = (path: string) => pathname === path;

  const initials = profile.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-end gap-2 border-b border-[#2C2C2C]/10 bg-white/80 px-4 backdrop-blur-md sm:px-6">
      <Link
        href="/favorites"
        aria-label="Favorites"
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          isActive("/favorites")
            ? "bg-[#1DA5A6]/10 text-[#1DA5A6]"
            : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5] hover:text-[#2C2C2C]"
        }`}
      >
        <Heart className="h-5 w-5" />
      </Link>

      <Link
        href="/notifications"
        aria-label="Notifications"
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
          isActive("/notifications")
            ? "bg-[#1DA5A6]/10 text-[#1DA5A6]"
            : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5] hover:text-[#2C2C2C]"
        }`}
      >
        <Bell className="h-5 w-5" />
        {unreadNotifications > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-[18px] text-white">
            {unreadNotifications > 9 ? "9+" : unreadNotifications}
          </span>
        )}
      </Link>

      <Link
        href="/profile"
        aria-label="Profile"
        className="ml-1 h-10 w-10 overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-[#1DA5A6]/30"
      >
        {profile.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.avatar_url} alt={profile.full_name || ""} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#1DA5A6] to-[#194774] text-sm font-bold text-white">
            {initials}
          </div>
        )}
      </Link>
    </header>
  );
}
