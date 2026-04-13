"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Bell,
  Heart,
  History,
} from "lucide-react";

const menuItems = [
  {
    name: "Home",
    path: "/home",
    icon: Home,
  },
  {
    name: "Browse Items",
    path: "/browse",
    icon: Search,
  },
  {
    name: "My Rentals",
    path: "/rentals",
    icon: Package,
  },
  {
    name: "List Item",
    path: "/list-item",
    icon: PlusCircle,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: MessageCircle,
    badge: 3,
  },
  {
    name: "Favorites",
    path: "/favorites",
    icon: Heart,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    // Add logout logic here
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#2C2C2C] hover:bg-[#F1F3F5] transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#2C2C2C]/10">
            <Link
              href="/home"
              className="flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div>
                <h1 className="text-xl font-extrabold">
                  <span className="text-[#1DA5A6]">Uni</span>
                  <span className="text-[#2C2C2C]">Tool</span>
                </h1>
                <p className="text-xs text-[#2C2C2C]/60">Student Marketplace</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md"
                          : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5] hover:text-[#2C2C2C]"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-[#2C2C2C]/60 group-hover:text-[#1DA5A6]"
                        }`}
                      />
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

          {/* User Section */}
          <div className="p-4 border-t border-[#2C2C2C]/10">
            <div className="flex items-center gap-3 px-4 py-3 bg-[#F1F3F5] rounded-xl mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white font-bold">
                AH
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#2C2C2C] truncate">
                  Ahmed Hassan
                </p>
                <p className="text-xs text-[#2C2C2C]/60 truncate">
                  Cairo University
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
          </div>
        </div>
      </aside>
    </>
  );
}