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
  AlertCircle,
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
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<SignUpFormData>();

  const password = watch("password");

  const validateFile = (file: File): string | null => {
    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, or PDF files are allowed";
    }

    // Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError("");
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file
      const validationError = validateFile(file);
      if (validationError) {
        setFileError(validationError);
        setUploadedFile(null);
        setValue("studentId", null as any);
        return;
      }
      
      setUploadedFile(file);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileError("");
    setValue("studentId", null as any);
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if email already exists
      const emailExists = users.some((u: any) => u.email === data.email);
      if (emailExists) {
        throw new Error("This email is already registered");
      }

      // Check if Student ID was uploaded
      if (!uploadedFile) {
        throw new Error("Please upload your Student ID");
      }

      // Create new user object
      const newUser = {
        id: Date.now().toString(),
        fullName: data.fullName,
        email: data.email,
        university: data.university,
        faculty: data.faculty,
        password: data.password, // ⚠️ في الـ production هيتشفر!
        studentIdFile: uploadedFile.name, // في الـ production هيترفع للـ server
        isVerified: false, // needs admin approval
        role: "user",
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Save current user session
      localStorage.setItem("pendingUser", JSON.stringify(newUser));

      // Redirect to setup/verification page
      router.push("/setup");
      
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/login" className="inline-block mb-4">
            <h1 className="text-4xl font-extrabold">
              <span className="text-[#1DA5A6]">Share</span>
              <span className="text-[#2C2C2C]">Hub</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            Create Your Account
          </h2>
          <p className="text-[#2C2C2C]/60 text-sm">
            Join the community and start sharing
          </p>
        </div>

        {/* Sign Up Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-red-900 mb-1">
                  Registration Failed
                </h4>
                <p className="text-sm text-red-800">{error}</p>
              </div>
              <button
                onClick={() => setError("")}
                className="text-red-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

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
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Name can only contain letters",
                    },
                  })}
                  placeholder="Ahmed Mohamed"
                  disabled={isLoading}
                  className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
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

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                Email Address <span className="text-red-500">*</span>
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

            {/* University & Faculty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* University */}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                  University <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40 pointer-events-none" />
                  <select
                    {...register("university", {
                      required: "University is required",
                    })}
                    disabled={isLoading}
                    className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer disabled:opacity-50 ${
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
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40 pointer-events-none" />
                  <select
                    {...register("faculty", {
                      required: "Faculty is required",
                    })}
                    disabled={isLoading}
                    className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer disabled:opacity-50 ${
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
                Student ID <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                  uploadedFile
                    ? "border-[#1DA5A6] bg-[#1DA5A6]/5"
                    : "border-[#2C2C2C]/20 hover:border-[#1DA5A6]/50"
                } ${
                  errors.studentId || fileError
                    ? "border-red-500 bg-red-50"
                    : ""
                }`}
              >
                <input
                  type="file"
                  {...register("studentId", {
                    required: "Student ID is required",
                  })}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  disabled={isLoading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                {uploadedFile ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#1DA5A6]/10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-[#1DA5A6]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#2C2C2C] line-clamp-1">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-[#2C2C2C]/60">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      disabled={isLoading}
                      className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors disabled:opacity-50"
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
                      JPG, PNG or PDF (max. 5MB)
                    </p>
                  </div>
                )}
              </div>
              {(errors.studentId || fileError) && (
                <p className="text-red-500 text-xs mt-1.5 ml-1">
                  {errors.studentId?.message || fileError}
                </p>
              )}
            </div>

            {/* Password Fields */}
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
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Password must contain uppercase, lowercase, and number",
                      },
                    })}
                    placeholder="Create password"
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
                    disabled={isLoading}
                    className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                      errors.confirmPassword
                        ? "ring-2 ring-red-500"
                        : "focus:ring-[#1DA5A6]/30"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors disabled:opacity-50"
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
                disabled={isLoading}
                className="w-5 h-5 mt-0.5 rounded border-2 border-[#2C2C2C]/20 text-[#1DA5A6] focus:ring-2 focus:ring-[#1DA5A6]/30 cursor-pointer disabled:opacity-50"
              />
              <label className="text-sm text-[#2C2C2C]/70 leading-relaxed">
                I agree to ShareHub's{" "}
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