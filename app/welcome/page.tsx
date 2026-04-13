"use client";

import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function WelcomePage() {
  const router = useRouter();

  const stats = [
    {
      icon: Users,
      value: "10,000+",
      label: "Active Students",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      value: "5,000+",
      label: "Items Listed",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      icon: Shield,
      value: "100%",
      label: "Verified Users",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Browse & Discover",
      description: "Find the perfect tools for your courses",
    },
    {
      icon: "💰",
      title: "Earn Money",
      description: "List your items and start earning",
    },
    {
      icon: "🤝",
      title: "Connect",
      description: "Chat with fellow students safely",
    },
    {
      icon: "⭐",
      title: "Build Trust",
      description: "Rate and review your experiences",
    },
  ];

  const nextSteps = [
    {
      title: "Complete Your Profile",
      description: "Add a photo and bio",
      action: "Go to Profile",
      path: "/profile",
    },
    {
      title: "Browse Available Items",
      description: "See what others are offering",
      action: "Start Browsing",
      path: "/browse",
    },
    {
      title: "List Your First Item",
      description: "Share and start earning",
      action: "List Item",
      path: "/list-item",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F3F5]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full mb-6 shadow-2xl animate-scale-in">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-gradient">Welcome to UniTool! </span>
            <br />
            <span className="text-[#2C2C2C]">🎉</span>
          </h1>

          <p className="text-lg text-[#2C2C2C]/70 max-w-2xl mx-auto mb-8">
            You're all set! You're now part of Egypt's largest student
            marketplace. Let's get you started on your journey.
          </p>

          {/* User Info Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-full flex items-center justify-center text-white font-bold">
              AH
            </div>
            <div className="text-left">
              <p className="font-bold text-[#2C2C2C]">Ahmed Hassan</p>
              <p className="text-sm text-[#2C2C2C]/60">
                Cairo University • Computer Science
              </p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-xl transition-all"
              >
                <div
                  className={`w-14 h-14 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold text-[#2C2C2C] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[#2C2C2C]/60">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2C2C2C] text-center mb-6">
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2C2C2C] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-[#2C2C2C]/60">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#FFC83D]/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#FFC83D]" />
            </div>
            <h2 className="text-2xl font-bold text-[#2C2C2C]">
              Recommended Next Steps
            </h2>
          </div>

          <div className="space-y-4">
            {nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-[#F1F3F5] rounded-xl hover:bg-[#1DA5A6]/5 transition-all group"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#1DA5A6] shadow-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-[#2C2C2C] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#2C2C2C]/60">
                    {step.description}
                  </p>
                </div>
                <button
                  onClick={() => router.push(step.path)}
                  className="px-4 py-2 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold text-sm hover:shadow-lg transition-all group-hover:scale-105 flex items-center gap-2"
                >
                  {step.action}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#1DA5A6] to-[#194774] rounded-3xl p-8 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Join thousands of students already sharing, renting, and saving
            money on UniTool.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/browse")}
              className="px-8 py-3 bg-white text-[#1DA5A6] rounded-xl font-bold hover:shadow-xl transition-all active:scale-95"
            >
              Browse Items
            </button>
            <button
              onClick={() => router.push("/list-item")}
              className="px-8 py-3 bg-white/20 backdrop-blur text-white border-2 border-white/30 rounded-xl font-bold hover:bg-white/30 transition-all active:scale-95"
            >
              List Your First Item
            </button>
          </div>
        </div>

        {/* Skip Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push("/home")}
            className="text-sm text-[#2C2C2C]/60 hover:text-[#2C2C2C] font-semibold transition-colors flex items-center gap-2 mx-auto"
          >
            Skip to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}