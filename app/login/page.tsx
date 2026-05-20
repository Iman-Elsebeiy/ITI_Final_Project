"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { login } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/client";

type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
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

    router.push(redirectTo || result.redirect || "/home");
  };

  const getCallbackOrigin = () => {
    const origin = window.location.origin;
    if (origin.includes("0.0.0.0") || origin.includes("localhost")) {
      return "https://ef56ebb3-2ce1-4dec-8167-5daa1513dfea-00-1oty1kskkkchh.spock.replit.dev";
    }
    return origin;
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setAuthError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getCallbackOrigin()}/auth/callback?next=${encodeURIComponent(redirectTo || "/home")}`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });

    if (error) {
      setAuthError(error.message);
      setIsGoogleLoading(false);
    }
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
          <p className="text-[#2C2C2C]/60 text-sm">Share • Rent • Save</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Welcome Back</h2>
          <p className="text-[#2C2C2C]/60 text-sm mb-6">Sign in to access your marketplace</p>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 mb-5">
              {authError}
            </div>
          )}

          {/* Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full h-14 bg-white border-2 border-[#2C2C2C]/10 rounded-xl flex items-center justify-center gap-3 font-semibold text-[#2C2C2C] hover:border-[#1DA5A6]/40 hover:bg-[#F1F3F5] transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-5"
          >
            {isGoogleLoading ? (
              <svg className="animate-spin h-5 w-5 text-[#2C2C2C]/60" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#2C2C2C]/10" />
            <span className="text-xs text-[#2C2C2C]/40 font-medium">or sign in with email</span>
            <div className="flex-1 h-px bg-[#2C2C2C]/10" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                University Email
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
                  placeholder="student@university.edu"
                  className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? "ring-2 ring-red-500" : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  placeholder="Enter your password"
                  className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? "ring-2 ring-red-500" : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.password.message}</p>
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
              <Link href="/forgot-password" className="text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="w-full h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#2C2C2C]/60 mt-6">
              Don&apos;t have an account?{" "}
              <Link href={redirectTo ? `/signup?redirect=${encodeURIComponent(redirectTo)}` : "/signup"} className="font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#2C2C2C]/40 mt-8">
          By continuing, you agree to UniTool&apos;s{" "}
          <Link href="/terms" className="underline hover:text-[#2C2C2C]/60">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}
