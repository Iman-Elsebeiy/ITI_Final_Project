"use client"
import {HomeIcon, MagnifyingGlassIcon, PlusIcon, ChatBubbleLeftRightIcon, UserIcon} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const menuItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Search", path: "/search", icon: MagnifyingGlassIcon },
    { name: "Add Tool", path: "/add-tool", icon: PlusIcon },
    { name: "Messages", path: "/messages", icon: ChatBubbleLeftRightIcon },
    { name: "Profile", path: "/profile", icon: UserIcon },
  ];
  return (
    <div className="w-64 h-screen bg-white p-4 shadow">
      <h1 className="text-xl font-bold mb-6">UniTool</h1>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center gap-2 p-2 rounded cursor-pointer transition duration-200 ${
              pathname === item.path
                ? "bg-teal-500 text-white"
                : "hover:bg-gray-100"
            }`}>
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
