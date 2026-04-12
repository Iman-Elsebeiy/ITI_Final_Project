"use client";

import { useRouter } from "next/navigation";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F3F5] to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8 animate-scale-in">
          <div className="relative">
            <h1 className="text-[150px] md:text-[200px] font-extrabold text-[#1DA5A6]/10 leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center shadow-2xl">
                <Search className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-8 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-[#2C2C2C]/60 mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-[#2C2C2C]/60">
            It might have been moved or deleted.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] rounded-xl font-semibold hover:border-[#1DA5A6]/30 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          <button
            onClick={() => router.push("/home")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-md">
          <h3 className="font-bold text-[#2C2C2C] mb-4">
            You might be looking for:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Browse Items", path: "/browse" },
              { label: "My Rentals", path: "/rentals" },
              { label: "Messages", path: "/messages" },
              { label: "Settings", path: "/settings" },
            ].map((link) => (
              <button
                key={link.path}
                onClick={() => router.push(link.path)}
                className="px-4 py-2 bg-gray-50 hover:bg-[#1DA5A6]/10 text-[#2C2C2C] rounded-lg text-sm font-medium transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}