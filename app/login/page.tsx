"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

  
    const demoAccounts = {
      user: { email: "user@test.com", password: "123456" },
      admin: { email: "admin@test.com", password: "admin123" },
    };

    // Check credentials
    if (
      data.email === demoAccounts.admin.email &&
      data.password === demoAccounts.admin.password
    ) {
      // Admin login
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", data.email);
    router.push("/admin/dashboard"); 
    } else if (
      data.email === demoAccounts.user.email &&
      data.password === demoAccounts.user.password
    ) {
      // User login
      localStorage.setItem("userRole", "user");
      localStorage.setItem("userEmail", data.email);
      router.push("/home");
    } else {
      setError("Invalid email or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="text-[#1DA5A6]">Share</span>
            <span className="text-[#2C2C2C]">Hub</span>
          </h1>
          <p className="text-[#2C2C2C]/60 text-sm">Share • Rent • Save</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Welcome Back
          </h2>
          <p className="text-[#2C2C2C]/60 text-sm mb-6">
            Sign in to access your account
          </p>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 mb-5 flex items-center gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-5">
            <p className="text-xs font-semibold text-blue-900 mb-2">
              🔑 Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-blue-800">
              <p>
                <strong>User:</strong> user@test.com / 123456
              </p>
              <p>
                <strong>Admin:</strong> admin@test.com / admin123
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Email Address
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
                  placeholder="you@example.com"
                  disabled={isLoading}
                  className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
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
                  disabled={isLoading}
                  className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                    errors.password
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors disabled:opacity-50"
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
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer disabled:opacity-50"
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
            <p className="text-center text-sm text-[#2C2C2C]/60 mt-6">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#2C2C2C]/40 mt-8">
          By continuing, you agree to ShareHub's{" "}
          <Link href="/terms" className="underline hover:text-[#2C2C2C]/60">
            Terms of Service
          </Link>
        </p>
      </div>
    </div>
  );
}