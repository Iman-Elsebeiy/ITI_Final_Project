"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Lock,
  Bell,
  Eye,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  LogOut,
  Trash2,
  Save,
  Camera,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "profile" | "account" | "notifications" | "privacy" | "preferences"
  >("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Profile State
  const [profileData, setProfileData] = useState({
    fullName: "Ahmed Hassan",
    email: "ahmed.hassan@university.edu",
    phone: "+20 123 456 7890",
    university: "Cairo University",
    major: "Computer Science",
    bio: "Engineering student passionate about technology and innovation.",
    location: "Cairo, Egypt",
  });

  // Notification State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    rentalUpdates: true,
    messageAlerts: true,
    promotions: false,
    weeklyDigest: true,
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: true,
  });

  // Preferences State
  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "EGP",
    theme: "light",
    emailFrequency: "instant",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Settings</h1>
        <p className="text-[#2C2C2C]/60">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-sm font-semibold text-green-900">
            Settings saved successfully!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md"
                      : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md p-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                    Profile Information
                  </h2>
                  <p className="text-[#2C2C2C]/60 text-sm">
                    Update your personal information and profile details
                  </p>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center gap-6 p-6 bg-[#F1F3F5] rounded-xl">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      AH
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4 text-[#1DA5A6]" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C2C2C] mb-1">
                      Profile Photo
                    </h3>
                    <p className="text-sm text-[#2C2C2C]/60 mb-3">
                      JPG, PNG or GIF, max size 5MB
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#1DA5A6] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                        Upload Photo
                      </button>
                      <button className="px-4 py-2 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] rounded-lg text-sm font-semibold hover:border-[#1DA5A6]/30 transition-all">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, fullName: e.target.value })
                        }
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) =>
                          setProfileData({ ...profileData, location: e.target.value })
                        }
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      University
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input
                        type="text"
                        value={profileData.university}
                        onChange={(e) =>
                          setProfileData({ ...profileData, university: e.target.value })
                        }
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
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
                        value={profileData.major}
                        onChange={(e) =>
                          setProfileData({ ...profileData, major: e.target.value })
                        }
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData({ ...profileData, bio: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 resize-none"
                    placeholder="Tell others about yourself..."
                  />
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                    Account Security
                  </h2>
                  <p className="text-[#2C2C2C]/60 text-sm">
                    Manage your password and security settings
                  </p>
                </div>

                {/* Change Password */}
                <div className="p-6 bg-[#F1F3F5] rounded-xl">
                  <h3 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#1DA5A6]" />
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter current password"
                        className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30"
                      />
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="p-6 border-2 border-[#2C2C2C]/10 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2C2C2C] mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-[#2C2C2C]/60 mb-4">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-green-500/10 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-500/20 transition-all">
                      Enable
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="p-6 border-2 border-[#2C2C2C]/10 rounded-xl">
                  <h3 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#1DA5A6]" />
                    Payment Methods
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-[#F1F3F5] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#2C2C2C]">
                            •••• •••• •••• 4242
                          </p>
                          <p className="text-xs text-[#2C2C2C]/60">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-sm text-red-500 font-semibold hover:underline">
                        Remove
                      </button>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-[#1DA5A6]/10 text-[#1DA5A6] rounded-lg text-sm font-semibold hover:bg-[#1DA5A6]/20 transition-all">
                    + Add Payment Method
                  </button>
                </div>

                {/* Delete Account */}
                <div className="p-6 border-2 border-red-200 bg-red-50 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                  </h3>
                  <p className="text-sm text-red-700 mb-4">
                    Permanently delete your account and all associated data. This
                    action cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                    Notification Preferences
                  </h2>
                  <p className="text-[#2C2C2C]/60 text-sm">
                    Choose how you want to be notified
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-[#F1F3F5] rounded-xl"
                    >
                      <div>
                        <h3 className="font-semibold text-[#2C2C2C] mb-1">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-[#2C2C2C]/60">
                          {key === "emailNotifications" &&
                            "Receive updates via email"}
                          {key === "pushNotifications" &&
                            "Get push notifications on your device"}
                          {key === "smsNotifications" && "SMS alerts for important updates"}
                          {key === "rentalUpdates" && "Updates about your rentals"}
                          {key === "messageAlerts" && "New message notifications"}
                          {key === "promotions" && "Special offers and promotions"}
                          {key === "weeklyDigest" && "Weekly summary of activities"}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setNotifications({
                              ...notifications,
                              [key]: e.target.checked,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-[#2C2C2C]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DA5A6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DA5A6]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                    Privacy Settings
                  </h2>
                  <p className="text-[#2C2C2C]/60 text-sm">
                    Control your privacy and data sharing
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-[#F1F3F5] rounded-xl">
                    <h3 className="font-bold text-[#2C2C2C] mb-4">
                      Profile Visibility
                    </h3>
                    <div className="space-y-3">
                      {["public", "students", "private"].map((option) => (
                        <label
                          key={option}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all"
                        >
                          <input
                            type="radio"
                            name="visibility"
                            checked={privacy.profileVisibility === option}
                            onChange={() =>
                              setPrivacy({ ...privacy, profileVisibility: option })
                            }
                            className="w-4 h-4 text-[#1DA5A6] focus:ring-[#1DA5A6]"
                          />
                          <div>
                            <p className="font-semibold text-[#2C2C2C] capitalize">
                              {option}
                            </p>
                            <p className="text-sm text-[#2C2C2C]/60">
                              {option === "public" && "Everyone can see your profile"}
                              {option === "students" &&
                                "Only verified students can see your profile"}
                              {option === "private" && "Only you can see your profile"}
                            </p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { key: "showEmail", label: "Show Email" },
                      { key: "showPhone", label: "Show Phone Number" },
                      { key: "showLocation", label: "Show Location" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between p-4 bg-[#F1F3F5] rounded-xl"
                      >
                        <h3 className="font-semibold text-[#2C2C2C]">
                          {item.label}
                        </h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={privacy[item.key as keyof typeof privacy] as boolean}
                            onChange={(e) =>
                              setPrivacy({
                                ...privacy,
                                [item.key]: e.target.checked,
                              })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-[#2C2C2C]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DA5A6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DA5A6]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                    App Preferences
                  </h2>
                  <p className="text-[#2C2C2C]/60 text-sm">
                    Customize your app experience
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#F1F3F5] rounded-xl">
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Language
                    </label>
                    <select
                      value={preferences.language}
                      onChange={(e) =>
                        setPreferences({ ...preferences, language: e.target.value })
                      }
                      className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 appearance-none cursor-pointer"
                    >
                      <option value="en">English</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>

                  <div className="p-4 bg-[#F1F3F5] rounded-xl">
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Currency
                    </label>
                    <select
                      value={preferences.currency}
                      onChange={(e) =>
                        setPreferences({ ...preferences, currency: e.target.value })
                      }
                      className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 appearance-none cursor-pointer"
                    >
                      <option value="EGP">EGP - Egyptian Pound</option>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                    </select>
                  </div>

                  <div className="p-4 bg-[#F1F3F5] rounded-xl">
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">
                      Theme
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: "light", icon: Sun, label: "Light" },
                        { value: "dark", icon: Moon, label: "Dark" },
                        { value: "auto", icon: Globe, label: "Auto" },
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() =>
                              setPreferences({ ...preferences, theme: theme.value })
                            }
                            className={`p-4 rounded-xl border-2 transition-all ${
                              preferences.theme === theme.value
                                ? "border-[#1DA5A6] bg-[#1DA5A6]/5"
                                : "border-[#2C2C2C]/10 hover:border-[#1DA5A6]/30"
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2 text-[#2C2C2C]" />
                            <p className="text-sm font-semibold text-[#2C2C2C]">
                              {theme.label}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex gap-4 pt-6 border-t border-[#2C2C2C]/10">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="px-6 h-12 bg-red-500/10 text-red-600 font-bold rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}