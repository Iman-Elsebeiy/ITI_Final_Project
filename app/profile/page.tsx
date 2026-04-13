"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  MapPin,
  Building2,
  GraduationCap,
  Package,
  Star,
  Calendar,
  Settings,
  Edit3,
} from "lucide-react";
import { getCurrentProfile } from "@/lib/data/profile";
import { getRentalStats } from "@/lib/data/rentals";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({ activeRentals: 0, totalEarnings: 0, totalSpent: 0, itemsListed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [profileData, rentalStats] = await Promise.all([
        getCurrentProfile(),
        getRentalStats(),
      ]);
      setProfile(profileData);
      setStats(rentalStats);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 text-center">
        <User className="w-16 h-16 text-[#2C2C2C]/20 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#2C2C2C] mb-2">Profile Not Found</h3>
        <p className="text-[#2C2C2C]/60">Please complete your setup first.</p>
      </div>
    );
  }

  const initials = profile.full_name ? profile.full_name.split(" ").map((n) => n[0]).join("").toUpperCase() : "?";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">My Profile</h1>
          <p className="text-[#2C2C2C]/60">View and manage your profile</p>
        </div>
        <Link href="/settings" className="flex items-center gap-2 px-4 py-2 bg-[#1DA5A6]/10 text-[#1DA5A6] rounded-xl font-semibold text-sm hover:bg-[#1DA5A6]/20 transition-all">
          <Edit3 className="w-4 h-4" />Edit Profile
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-[#1DA5A6] to-[#194774] p-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
              {initials}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{profile.full_name || "No name set"}</h2>
              <p className="opacity-90">{profile.university || "No university set"}</p>
              <p className="opacity-75 text-sm mt-1">{profile.faculty || ""}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-[#2C2C2C]/10">
          <div className="text-center">
            <p className="text-2xl font-bold text-[#1DA5A6]">{stats.itemsListed}</p>
            <p className="text-xs text-[#2C2C2C]/60">Items Listed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.activeRentals}</p>
            <p className="text-xs text-[#2C2C2C]/60">Active Rentals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">EGP {stats.totalEarnings}</p>
            <p className="text-xs text-[#2C2C2C]/60">Earned</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">EGP {stats.totalSpent}</p>
            <p className="text-xs text-[#2C2C2C]/60">Spent</p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <Mail className="w-5 h-5 text-[#1DA5A6]" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Email</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{profile.email || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <Building2 className="w-5 h-5 text-[#1DA5A6]" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">University</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{profile.university || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <GraduationCap className="w-5 h-5 text-[#1DA5A6]" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Major</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{profile.faculty || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <MapPin className="w-5 h-5 text-[#1DA5A6]" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Faculty</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{profile.faculty || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <Package className="w-5 h-5 text-[#1DA5A6]" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Role</p>
                <p className="text-sm font-semibold text-[#2C2C2C] capitalize">{profile.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <Calendar className="w-5 h-5 text-[#1DA5A6]" />
              <div>
                <p className="text-xs text-[#2C2C2C]/60">Member Since</p>
                <p className="text-sm font-semibold text-[#2C2C2C]">{new Date(profile.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
