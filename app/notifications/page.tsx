"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Package, Star, MessageCircle, RotateCcw, Info } from "lucide-react";
import { getNotifications, markNotificationRead } from "@/lib/data/notifications";

type NotificationData = {
  id: string;
  type: "rental" | "review" | "message" | "return" | "system";
  content: string;
  is_read: boolean;
  created_at: string;
  actor?: { full_name: string | null } | null;
  item?: { title: string | null } | null;
};

const TYPE_CONFIG: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  rental: { icon: Package, color: "text-[#1DA5A6]", bg: "bg-[#1DA5A6]/10" },
  review: { icon: Star, color: "text-[#FFC83D]", bg: "bg-[#FFC83D]/10" },
  message: { icon: MessageCircle, color: "text-blue-600", bg: "bg-blue-50" },
  return: { icon: RotateCcw, color: "text-purple-600", bg: "bg-purple-50" },
  system: { icon: Info, color: "text-gray-600", bg: "bg-gray-100" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNotifications()
      .then((data) => setNotifications(data as NotificationData[]))
      .finally(() => setLoading(false));
  }, []);

  const handleMarkRead = async (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    await markNotificationRead(id);
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.is_read);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await Promise.all(unread.map((n) => markNotificationRead(n.id)));
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const diffMins = Math.floor((Date.now() - date.getTime()) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Notifications</h1>
          <p className="text-[#2C2C2C]/60">{unreadCount} unread</p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-[#F1F3F5] text-[#2C2C2C] rounded-lg text-sm font-semibold hover:bg-[#1DA5A6]/10 transition-all"
          >
            <Check className="w-4 h-4" />Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Bell className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">No Notifications Yet</h3>
          <p className="text-[#2C2C2C]/60">You&apos;ll see updates about your orders, reviews, and messages here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const config = TYPE_CONFIG[n.type] || TYPE_CONFIG.system;
            const Icon = config.icon;
            return (
              <div
                key={n.id}
                className={`bg-white rounded-2xl shadow-md p-4 flex items-start gap-4 transition-all ${
                  n.is_read ? "opacity-70" : ""
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                  <Icon className={`w-5 h-5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#2C2C2C]">
                    {n.content}
                    {n.item?.title ? <span className="font-semibold"> &middot; {n.item.title}</span> : null}
                  </p>
                  <p className="text-xs text-[#2C2C2C]/50 mt-1">{formatTime(n.created_at)}</p>
                </div>
                {!n.is_read && (
                  <button
                    onClick={() => handleMarkRead(n.id)}
                    aria-label="Mark as read"
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#F1F3F5] flex items-center justify-center text-[#2C2C2C]/60 hover:bg-[#1DA5A6]/10 hover:text-[#1DA5A6] transition-all"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
