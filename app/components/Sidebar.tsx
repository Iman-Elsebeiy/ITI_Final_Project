"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Search, Plus, MessageCircle, User,
} from "lucide-react";

const navItems = [
  { icon: Home,          label: "Home",     href: "/home" },
  { icon: Search,        label: "Search",   href: "/search" },
  { icon: Plus,          label: "Add Tool", href: "/add-tool" },
  { icon: MessageCircle, label: "Messages", href: "/messages" },
  { icon: User,          label: "Profile",  href: "/profile" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-100 shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
        <div className="w-7 h-7 bg-teal-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">U</span>
        </div>
        <span className="text-lg font-bold text-gray-800">UniTool</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${isActive
                  ? "bg-teal-600 text-white"
                  : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
                }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}