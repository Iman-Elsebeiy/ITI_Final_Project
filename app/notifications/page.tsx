"use client";

import { useState } from "react";
import {
  Bell,
  Package,
  MessageCircle,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  Check,
} from "lucide-react";

type Notification = {
  id: string;
  type: "rental" | "message" | "review" | "system";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "rental",
    title: "New Rental Request",
    message: "Sara Mohamed wants to rent your Scientific Calculator",
    timestamp: "5 minutes ago",
    read: false,
    actionUrl: "/rentals",
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    message: "Omar Khaled: Is the item still available?",
    timestamp: "1 hour ago",
    read: false,
    actionUrl: "/messages",
  },
  {
    id: "3",
    type: "review",
    title: "New Review Received",
    message: "Layla Ibrahim left you a 5-star review",
    timestamp: "2 hours ago",
    read: true,
    actionUrl: "/profile",
  },
  {
    id: "4",
    type: "rental",
    title: "Rental Confirmed",
    message: "Your rental for Engineering Tools has been confirmed",
    timestamp: "Yesterday",
    read: true,
    actionUrl: "/rentals",
  },
  {
    id: "5",
    type: "system",
    title: "Payment Received",
    message: "You received EGP 50 for Calculator rental",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "6",
    type: "rental",
    title: "Rental Ending Soon",
    message: "Your Camera rental ends in 2 days",
    timestamp: "3 days ago",
    read: true,
    actionUrl: "/rentals",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) =>
    filter === "all" ? true : !n.read
  );

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "rental":
        return Package;
      case "message":
        return MessageCircle;
      case "review":
        return Star;
      case "system":
        return Bell;
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "rental":
        return "text-blue-500 bg-blue-50";
      case "message":
        return "text-green-500 bg-green-50";
      case "review":
        return "text-yellow-500 bg-yellow-50";
      case "system":
        return "text-purple-500 bg-purple-50";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">
          Notifications
        </h1>
        <p className="text-[#2C2C2C]/60">
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${
                unreadCount > 1 ? "s" : ""
              }`
            : "You're all caught up!"}
        </p>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === "all"
                  ? "bg-[#1DA5A6] text-white"
                  : "bg-gray-100 text-[#2C2C2C]/60"
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                filter === "unread"
                  ? "bg-[#1DA5A6] text-white"
                  : "bg-gray-100 text-[#2C2C2C]/60"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#2C2C2C] rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <Bell className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">
            No Notifications
          </h3>
          <p className="text-[#2C2C2C]/60">
            {filter === "unread"
              ? "You have no unread notifications"
              : "You're all caught up!"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const iconColor = getIconColor(notification.type);

            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-4 ${
                  !notification.read ? "border-l-4 border-[#1DA5A6]" : ""
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconColor}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        className={`font-semibold text-[#2C2C2C] ${
                          !notification.read ? "text-[#1DA5A6]" : ""
                        }`}
                      >
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#1DA5A6] rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                    <p className="text-sm text-[#2C2C2C]/70 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-xs text-[#2C2C2C]/60">
                        <Clock className="w-3 h-3" />
                        {notification.timestamp}
                      </span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-[#1DA5A6] font-semibold hover:underline"
                        >
                          Mark as read
                        </button>
                      )}
                      {notification.actionUrl && (
                        <a
                          href={notification.actionUrl}
                          className="text-xs text-[#1DA5A6] font-semibold hover:underline"
                        >
                          View →
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="w-8 h-8 flex items-center justify-center text-[#2C2C2C]/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}