"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building2,
  GraduationCap,
  Upload,
  CheckCircle2,
  X,
} from "lucide-react";

type SignUpFormData = {
  fullName: string;
  email: string;
  university: string;
  faculty: string;
  password: string;
  confirmPassword: string;
  studentId: FileList;
  agreeToTerms: boolean;
};

const universities = [
  "Cairo University",
  "Ain Shams University",
  "Alexandria University",
  "American University in Cairo",
  "German University in Cairo",
  "British University in Egypt",
  "Other",
];

const faculties = [
  "Engineering",
  "Medicine",
  "Computer Science",
  "Business",
  "Arts",
  "Science",
  "Law",
  "Pharmacy",
  "Other",
];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Sign up data:", data);
    setIsLoading(false);
    router.push("/setup");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-block mb-4">
            <h1 className="text-4xl font-extrabold">
              <span className="text-[#1DA5A6]">Uni</span>
              <span className="text-[#2C2C2C]">Tool</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Create Your Account
          </h2>
          <p className="text-[#2C2C2C]/60 text-sm">
            Join the student marketplace community
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                  placeholder="Ahmed Mohamed"
                  className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? "ring-2 ring-red-500"
                      : "focus:ring-[#1DA5A6]/30"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* University Email */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                University Email <span className="text-red-500">*</span>
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
                  placeholder="ahmed.mohamed@university.edu"
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

            {/* University & Faculty (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* University */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  University <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <select
                    {...register("university", {
                      required: "University is required",
                    })}
                    className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                      errors.university
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  >
                    <option value="">Select University</option>
                    {universities.map((uni) => (
                      <option key={uni} value={uni}>
                        {uni}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.university && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.university.message}
                  </p>
                )}
              </div>

              {/* Faculty */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Faculty <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <select
                    {...register("faculty", {
                      required: "Faculty is required",
                    })}
                    className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                      errors.faculty
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  >
                    <option value="">Select Faculty</option>
                    {faculties.map((fac) => (
                      <option key={fac} value={fac}>
                        {fac}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.faculty && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.faculty.message}
                  </p>
                )}
              </div>
            </div>

            {/* Student ID Upload */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Student ID (Karnay) <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                  uploadedFile
                    ? "border-[#1DA5A6] bg-[#1DA5A6]/5"
                    : "border-[#2C2C2C]/20 hover:border-[#1DA5A6]/50"
                } ${errors.studentId ? "border-red-500" : ""}`}
              >
                <input
                  type="file"
                  {...register("studentId", {
                    required: "Student ID is required",
                  })}
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {uploadedFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#1DA5A6]/10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#1DA5A6]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2C2C2C]">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-[#2C2C2C]/60">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedFile(null)}
                      className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-10 h-10 text-[#2C2C2C]/40 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-[#2C2C2C] mb-1">
                      Upload Student ID
                    </p>
                    <p className="text-xs text-[#2C2C2C]/60">
                      PNG, JPG or PDF (max. 5MB)
                    </p>
                  </div>
                )}
              </div>
              {errors.studentId && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.studentId.message}
                </p>
              )}
            </div>

            {/* Password Fields (2 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    placeholder="Create password"
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm password"
                    className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1.5 ml-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 p-4 bg-[#F1F3F5] rounded-xl">
              <input
                type="checkbox"
                {...register("agreeToTerms", {
                  required: "You must agree to the terms",
                })}
                className="w-5 h-5 mt-0.5 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer"
              />
              <label className="text-sm text-[#2C2C2C]/70 leading-relaxed">
                I agree to UniTool's{" "}
                <Link
                  href="/terms"
                  className="text-[#1DA5A6] font-semibold hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#1DA5A6] font-semibold hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs ml-1 -mt-3">
                {errors.agreeToTerms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-6"
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-[#2C2C2C]/60 mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}