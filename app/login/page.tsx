"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, UserCircle, Shield } from "lucide-react";
import { login } from "@/app/auth/actions";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState<"student" | "admin">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);

    const result = await login({
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      setAuthError(result.error);
      setIsLoading(false);
      return;
    }

    router.push(result.redirect || "/home");
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="text-[#1DA5A6]">Uni</span>
            <span className="text-[#2C2C2C]">Tool</span>
          </h1>
          <p className="text-[#2C2C2C]/60 text-sm">
            Share • Rent • Save
          </p>
        </div>

        {/* Role Toggle */}
        <div className="bg-white rounded-2xl p-2 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUserRole("student")}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                userRole === "student"
                  ? "bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white shadow-md"
                  : "text-[#2C2C2C]/60 hover:bg-[#F1F3F5]"
              }`}
            >
              <UserCircle className="w-4 h-4" />
              Student
            </button>
            <button
              type="button"
              onClick={() => setUserRole("admin")}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                userRole === "admin"
                  ? "bg-gradient-to-r from-[#194774] to-[#1DA5A6] text-white shadow-md"
                  : "text-[#2C2C2C]/60 hover:bg-[#F1F3F5]"
              }`}
            >
              <Shield className="w-4 h-4" />
              Admin
            </button>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Welcome Back
          </h2>
          <p className="text-[#2C2C2C]/60 text-sm mb-6">
            {userRole === "student"
              ? "Sign in to access your marketplace"
              : "Admin portal access"}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {authError}
              </div>
            )}
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                {userRole === "student" ? "University Email" : "Admin Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  placeholder={
                    userRole === "student"
                      ? "student@university.edu"
                      : "admin@unitool.com"
                  }
                  className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter your password"
                  className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer"
                />
                <span className="text-sm text-[#2C2C2C]/70 group-hover:text-[#2C2C2C] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
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
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            {userRole === "student" && (
              <p className="text-center text-sm text-[#2C2C2C]/60 mt-6">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors"
                >
                  Sign Up
                </Link>
              </p>
            )}
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#2C2C2C]/40 mt-8">
          By continuing, you agree to UniTool's{" "}
          <Link href="/terms" className="underline hover:text-[#2C2C2C]/60">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}