"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Building2,
  AlertCircle,
  GraduationCap,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Globe,
  LogOut,
  Trash2,
  Save,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { logout } from "@/app/auth/actions";
import { getCurrentProfile, updateProfile, getUserSettings, updateUserSettings } from "@/lib/data/profile";
import type { Profile, UserSettings } from "@/lib/types";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "profile" | "account" | "notifications" | "privacy" | "preferences"
  >("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [loading, setLoading] = useState(true);

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    university: "",
    faculty: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    rentalUpdates: true,
    messageAlerts: true,
    promotions: false,
    weeklyDigest: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    showLocation: true,
  });

  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "EGP",
    theme: "light",
  });

  useEffect(() => {
    async function load() {
      const [profile, settings] = await Promise.all([
        getCurrentProfile(),
        getUserSettings(),
      ]);

      if (profile) {
        setProfileData({
          fullName: profile.full_name || "",
          email: profile.email || "",
          university: profile.university || "",
          faculty: profile.faculty || "",
        });
      }

      if (settings) {
        setNotifications({
          emailNotifications: settings.email_notifications,
          pushNotifications: settings.push_notifications,
          smsNotifications: settings.sms_notifications,
          rentalUpdates: settings.rental_updates,
          messageAlerts: settings.message_alerts,
          promotions: settings.promotions,
          weeklyDigest: settings.weekly_digest,
        });
        setPrivacy({
          profileVisibility: settings.profile_visibility,
          showEmail: settings.show_email,
          showPhone: settings.show_phone,
          showLocation: settings.show_location,
        });
        setPreferences({
          language: settings.language,
          currency: settings.currency,
          theme: settings.theme,
        });
      }

      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);

    let result: { error?: string; success?: boolean } | undefined;

    if (activeTab === "profile") {
      result = await updateProfile({
        full_name: profileData.fullName,
        university: profileData.university,
        faculty: profileData.faculty,
      });
    } else if (activeTab === "notifications") {
      result = await updateUserSettings({
        email_notifications: notifications.emailNotifications,
        push_notifications: notifications.pushNotifications,
        sms_notifications: notifications.smsNotifications,
        rental_updates: notifications.rentalUpdates,
        message_alerts: notifications.messageAlerts,
        promotions: notifications.promotions,
        weekly_digest: notifications.weeklyDigest,
      });
    } else if (activeTab === "privacy") {
      result = await updateUserSettings({
        profile_visibility: privacy.profileVisibility as "public" | "students" | "private",
        show_email: privacy.showEmail,
        show_phone: privacy.showPhone,
        show_location: privacy.showLocation,
      });
    } else if (activeTab === "preferences") {
      result = await updateUserSettings({
        language: preferences.language,
        currency: preferences.currency,
        theme: preferences.theme,
      });
    }

    setIsSaving(false);

    if (result?.error) {
      setSaveError(result.error);
      setTimeout(() => setSaveError(""), 5000);
      return;
    }

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = async () => {
    await logout();
  };

  const initials = profileData.fullName
    ? profileData.fullName.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "?";

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "account", label: "Account", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Settings</h1>
        <p className="text-[#2C2C2C]/60">Manage your account settings and preferences</p>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-500" />
          <p className="text-sm font-semibold text-green-900">Settings saved successfully!</p>
        </div>
      )}

      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-sm font-semibold text-red-900">{saveError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-4 space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md" : "text-[#2C2C2C]/70 hover:bg-[#F1F3F5]"
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-md p-8">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Profile Information</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Update your personal information and profile details</p>
                </div>

                <div className="flex items-center gap-6 p-6 bg-[#F1F3F5] rounded-xl">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {initials}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4 text-[#1DA5A6]" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2C2C2C] mb-1">Profile Photo</h3>
                    <p className="text-sm text-[#2C2C2C]/60 mb-3">JPG, PNG or GIF, max size 5MB</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-[#1DA5A6] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">Upload Photo</button>
                      <button className="px-4 py-2 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] rounded-lg text-sm font-semibold hover:border-[#1DA5A6]/30 transition-all">Remove</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input type="text" value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input type="email" value={profileData.email} disabled
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C]/60 focus:outline-none cursor-not-allowed" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">University</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input type="text" value={profileData.university}
                        onChange={(e) => setProfileData({ ...profileData, university: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Faculty</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                      <input type="text" value={profileData.faculty}
                        onChange={(e) => setProfileData({ ...profileData, faculty: e.target.value })}
                        className="w-full h-12 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Account Security</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Manage your password and security settings</p>
                </div>

                <div className="p-6 bg-[#F1F3F5] rounded-xl">
                  <h3 className="font-bold text-[#2C2C2C] mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#1DA5A6]" />Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Current Password</label>
                      <input type="password" placeholder="Enter current password"
                        className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">New Password</label>
                      <input type="password" placeholder="Enter new password"
                        className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Confirm New Password</label>
                      <input type="password" placeholder="Confirm new password"
                        className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30" />
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="p-6 border-2 border-[#2C2C2C]/10 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2C2C2C] mb-2 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-green-500" />Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-[#2C2C2C]/60 mb-4">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-green-500/10 text-green-600 rounded-lg text-sm font-semibold hover:bg-green-500/20 transition-all">Enable</button>
                  </div>
                </div>

                <div className="p-6 border-2 border-red-200 bg-red-50 rounded-xl">
                  <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                    <Trash2 className="w-5 h-5" />Delete Account
                  </h3>
                  <p className="text-sm text-red-700 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition-all">Delete Account</button>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Notification Preferences</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Choose how you want to be notified</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-[#F1F3F5] rounded-xl">
                      <div>
                        <h3 className="font-semibold text-[#2C2C2C] mb-1">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </h3>
                        <p className="text-sm text-[#2C2C2C]/60">
                          {key === "emailNotifications" && "Receive updates via email"}
                          {key === "pushNotifications" && "Get push notifications on your device"}
                          {key === "smsNotifications" && "SMS alerts for important updates"}
                          {key === "rentalUpdates" && "Updates about your rentals"}
                          {key === "messageAlerts" && "New message notifications"}
                          {key === "promotions" && "Special offers and promotions"}
                          {key === "weeklyDigest" && "Weekly summary of activities"}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={value}
                          onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                          className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#2C2C2C]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DA5A6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DA5A6]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Privacy Settings</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Control your privacy and data sharing</p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-[#F1F3F5] rounded-xl">
                    <h3 className="font-bold text-[#2C2C2C] mb-4">Profile Visibility</h3>
                    <div className="space-y-3">
                      {["public", "students", "private"].map((option) => (
                        <label key={option} className={`flex items-center gap-3 p-3 bg-white rounded-lg cursor-pointer hover:shadow-md transition-all`}>
                          <input type="radio" name="visibility" checked={privacy.profileVisibility === option}
                            onChange={() => setPrivacy({ ...privacy, profileVisibility: option })}
                            className="w-4 h-4 text-[#1DA5A6] focus:ring-[#1DA5A6]" />
                          <div>
                            <p className="font-semibold text-[#2C2C2C] capitalize">{option}</p>
                            <p className="text-sm text-[#2C2C2C]/60">
                              {option === "public" && "Everyone can see your profile"}
                              {option === "students" && "Only verified students can see your profile"}
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
                      <div key={item.key} className="flex items-center justify-between p-4 bg-[#F1F3F5] rounded-xl">
                        <h3 className="font-semibold text-[#2C2C2C]">{item.label}</h3>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={privacy[item.key as keyof typeof privacy] as boolean}
                            onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                            className="sr-only peer" />
                          <div className="w-11 h-6 bg-[#2C2C2C]/20 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#1DA5A6]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1DA5A6]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Preferences</h2>
                  <p className="text-[#2C2C2C]/60 text-sm">Customize your experience</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#F1F3F5] rounded-xl">
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Language</label>
                    <select value={preferences.language} onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                      className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 appearance-none cursor-pointer">
                      <option value="en">English</option>
                      <option value="ar">Arabic</option>
                    </select>
                  </div>
                  <div className="p-4 bg-[#F1F3F5] rounded-xl">
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Currency</label>
                    <select value={preferences.currency} onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                      className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 appearance-none cursor-pointer">
                      <option value="EGP">Egyptian Pound (EGP)</option>
                      <option value="USD">US Dollar (USD)</option>
                    </select>
                  </div>
                  <div className="p-4 bg-[#F1F3F5] rounded-xl">
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Theme</label>
                    <select value={preferences.theme} onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                      className="w-full h-12 px-4 bg-white rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#1DA5A6]/30 appearance-none cursor-pointer">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#2C2C2C]/10">
              {activeTab !== "account" ? (
                <button onClick={handleSave} disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50">
                  <Save className="w-5 h-5" />{isSaving ? "Saving..." : "Save Changes"}
                </button>
              ) : <div />}
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold transition-all">
                <LogOut className="w-5 h-5" />Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
