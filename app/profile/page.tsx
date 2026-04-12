"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/Toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Camera,
  Edit2,
  Save,
  X,
  Star,
  Package,
  TrendingUp,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    university: user?.university || "",
    major: user?.major || "",
    location: user?.location || "",
    bio: user?.bio || "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    updateUser(formData);
    setIsSaving(false);
    setIsEditing(false);
    toast.success("Profile Updated", "Your changes have been saved successfully");
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      university: user?.university || "",
      major: user?.major || "",
      location: user?.location || "",
      bio: user?.bio || "",
    });
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const stats = [
    {
      label: "Items Listed",
      value: user?.itemsListed || 0,
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Completed Rentals",
      value: user?.completedRentals || 0,
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Rating",
      value: user?.rating || 0,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Reviews",
      value: user?.totalReviews || 0,
      icon: Award,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">My Profile</h1>
        <p className="text-[#2C2C2C]/60">
          Manage your personal information and settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="text-center">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(user?.name || "U")
                  )}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1DA5A6] rounded-full flex items-center justify-center text-white shadow-lg hover:bg-[#194774] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Name & Verification */}
              <div className="mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#2C2C2C]">
                    {user?.name}
                  </h2>
                  {user?.verified && (
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-[#2C2C2C]/60">{user?.email}</p>
              </div>

              {/* Quick Info */}
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center gap-2 text-[#2C2C2C]/70">
                  <Building2 className="w-4 h-4 text-[#1DA5A6]" />
                  <span>{user?.university}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2C2C2C]/70">
                  <GraduationCap className="w-4 h-4 text-[#1DA5A6]" />
                  <span>{user?.major}</span>
                </div>
                {user?.location && (
                  <div className="flex items-center gap-2 text-[#2C2C2C]/70">
                    <MapPin className="w-4 h-4 text-[#1DA5A6]" />
                    <span>{user?.location}</span>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 h-10 bg-[#1DA5A6] text-white rounded-lg font-semibold hover:bg-[#194774] transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Statistics</h3>
            <div className="space-y-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}
                      >
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="text-sm font-medium text-[#2C2C2C]">
                        {stat.label}
                      </span>
                    </div>
                    <span className="font-bold text-[#2C2C2C]">
                      {stat.label === "Rating" ? `${stat.value}⭐` : stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#2C2C2C]">
                Personal Information
              </h3>
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-100 text-[#2C2C2C] rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-4 py-2 bg-[#1DA5A6] text-white rounded-lg font-semibold hover:bg-[#194774] transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={!isEditing}
                    className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="+20 123 456 7890"
                    className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 transition-all"
                  />
                </div>
              </div>

              {/* University & Major */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    University
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) =>
                        setFormData({ ...formData, university: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Major
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) =>
                        setFormData({ ...formData, major: e.target.value })
                      }
                      disabled={!isEditing}
                      className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    disabled={!isEditing}
                    placeholder="Cairo, Egypt"
                    className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 transition-all"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Tell others about yourself..."
                  className="w-full px-4 py-3 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 disabled:opacity-60 resize-none transition-all"
                />
              </div>

              {/* Join Date */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-[#2C2C2C]/60">
                  Member since:{" "}
                  <span className="font-semibold text-[#2C2C2C]">
                    {user?.joinDate || "January 2024"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}