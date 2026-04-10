"use client";

import React from "react";
import { 
  Settings, 
  Package, 
  Heart, 
  Star, 
  LogOut, 
  ChevronRight, 
  MapPin 
} from "lucide-react";


// ProfilePage Component

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
    {/* Header Card  */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-4xl font-bold border-2 border-white/30 shadow-inner">
              JD
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight">John Doe</h1>
              <p className="text-blue-100 mt-1 flex items-center justify-center md:justify-start gap-1">
                <MapPin size={14} /> Computer Science • 3rd Year
              </p>
              
              <div className="flex items-center gap-2 mt-3 bg-black/20 w-fit px-4 py-1.5 rounded-full mx-auto md:mx-0 border border-white/10">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">4.9</span>
                <span className="text-xs opacity-80">(24 reviews)</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => console.log("Settings clicked")}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-90"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Stats Grid - */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { label: "Listed", val: "12", color: "text-teal-600" },
            { label: "Rented", val: "28", color: "text-blue-600" },
            { label: "Earned", val: "$340", color: "text-yellow-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
              <p className={`text-2xl font-black ${s.color}`}>{s.val}</p>
              <p className="text-gray-400 text-xs font-medium uppercase mt-1 tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Menu Options -   */}
        <div className="mt-8 space-y-3">
          <h3 className="text-gray-500 font-bold text-sm ml-2 uppercase tracking-widest mb-4">Account Workspace</h3>
          
          <MenuBtn icon={<Package className="text-teal-500" />} title="My Tools" count={5} />
          <MenuBtn icon={<Heart className="text-red-500" />} title="Wishlist" count={12} />
          <MenuBtn icon={<Star className="text-yellow-500" />} title="My Ratings" />
          
          <button 
            onClick={() => confirm("Are you sure you want to sign out?")}
            className="w-full mt-6 flex items-center justify-center gap-2 p-4 text-red-500 font-bold hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100 active:scale-[0.98]"
          >
            <LogOut size={20} /> Sign Out
          </button>
          
        </div>
      </div>
    </div>
  );
}

/**
 * MenuBtn Component
 */
interface MenuBtnProps {
  icon: React.ReactNode;
  title: string;
  count?: number;
}

function MenuBtn({ icon, title, count }: MenuBtnProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-teal-200 hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-teal-50 transition-colors">
          {icon}
        </div>
        <span className="font-bold text-gray-700 group-hover:text-teal-700 transition-colors">{title}</span>
      </div>
      <div className="flex items-center gap-3">
        {count && (
          <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
            {count}
          </span>
        )}
        <ChevronRight size={18} className="text-gray-300 group-hover:text-teal-500 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}