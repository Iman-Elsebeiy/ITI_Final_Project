"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Send,
} from "lucide-react";
import { forgotPassword, resetPassword } from "@/app/auth/actions";

type ForgotPasswordFormData = {
  email: string;
};

type VerificationFormData = {
  code: string;
};

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm<ForgotPasswordFormData>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    formState: { errors: errorsPassword },
  } = useForm<ResetPasswordFormData>();

  const password = watch("password");

  const onSubmitEmail = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setAuthError(null);

    const result = await forgotPassword(data.email);

    if (result.error) {
      setAuthError(result.error);
      setIsLoading(false);
      return;
    }

    setEmail(data.email);
    setIsLoading(false);
    setStep(2);
    startResendTimer();
  };

  // Step 2: Verify OTP code
  const onSubmitVerification = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Verification code:", code);
    setIsLoading(false);
    setStep(3);
  };

  const onSubmitPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setAuthError(null);

    const result = await resetPassword(data.password);

    if (result.error) {
      setAuthError(result.error);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    router.push("/login");
  };

  // Handle OTP input
  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only digits

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Handle backspace in OTP
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Resend timer
  const startResendTimer = () => {
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Resend code
  const handleResendCode = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setVerificationCode(["", "", "", "", "", ""]);
    startResendTimer();
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back to Login */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#2C2C2C] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774]"
                  : s < step
                  ? "w-8 bg-[#1DA5A6]"
                  : "w-8 bg-[#2C2C2C]/10"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          {/* Step 1: Enter Email */}
          {step === 1 && (
            <div className="animate-slide-up">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                  Forgot Password?
                </h2>
                <p className="text-[#2C2C2C]/60 text-sm">
                  No worries! Enter your email and we'll send you a verification
                  code
                </p>
              </div>

              <form
                onSubmit={handleSubmitEmail(onSubmitEmail)}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                    <input
                      type="email"
                      {...registerEmail("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="your@email.com"
                      className={`w-full h-14 pl-12 pr-4 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                        errorsEmail.email
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#1DA5A6]/30"
                      }`}
                    />
                  </div>
                  {errorsEmail.email && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1">
                      {errorsEmail.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Verification Code
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Enter Verification Code */}
          {step === 2 && (
            <div className="animate-slide-up">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                  Check Your Email
                </h2>
                <p className="text-[#2C2C2C]/60 text-sm">
                  We sent a 6-digit code to
                  <br />
                  <span className="font-semibold text-[#1DA5A6]">{email}</span>
                </p>
              </div>

              {/* OTP Input */}
              <div className="flex gap-2 justify-center mb-6">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-[#F1F3F5] rounded-xl border-2 border-transparent focus:border-[#1DA5A6] focus:bg-white focus:outline-none transition-all"
                  />
                ))}
              </div>

              {/* Resend Code */}
              <div className="text-center mb-6">
                {resendTimer > 0 ? (
                  <p className="text-sm text-[#2C2C2C]/60">
                    Resend code in{" "}
                    <span className="font-semibold text-[#1DA5A6]">
                      {resendTimer}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-sm font-semibold text-[#1DA5A6] hover:text-[#194774] transition-colors disabled:opacity-50"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              <button
                onClick={onSubmitVerification}
                disabled={verificationCode.join("").length !== 6 || isLoading}
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
                    Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full mt-4 text-sm text-[#2C2C2C]/60 hover:text-[#2C2C2C] transition-colors"
              >
                Change email address
              </button>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === 3 && (
            <div className="animate-slide-up">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1DA5A6] to-[#194774] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
                  Set New Password
                </h2>
                <p className="text-[#2C2C2C]/60 text-sm">
                  Create a strong password for your account
                </p>
              </div>

              <form
                onSubmit={handleSubmitPassword(onSubmitPassword)}
                className="space-y-5"
              >
                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...registerPassword("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                          message:
                            "Password must contain uppercase, lowercase, and number",
                        },
                      })}
                      placeholder="Create new password"
                      className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                        errorsPassword.password
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
                  {errorsPassword.password && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1">
                      {errorsPassword.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/40" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...registerPassword("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      placeholder="Confirm new password"
                      className={`w-full h-14 pl-12 pr-12 bg-[#F1F3F5] rounded-xl text-sm text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-2 transition-all ${
                        errorsPassword.confirmPassword
                          ? "ring-2 ring-red-500"
                          : "focus:ring-[#1DA5A6]/30"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 hover:text-[#2C2C2C]/60 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errorsPassword.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1.5 ml-1">
                      {errorsPassword.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-xs font-semibold text-blue-900 mb-2">
                    Password must contain:
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      One uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      One lowercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3" />
                      One number
                    </li>
                  </ul>
                </div>

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
                      Resetting...
                    </span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Help Text */}
        <p className="text-center text-xs text-[#2C2C2C]/40 mt-6">
          Need help?{" "}
          <Link
            href="/support"
            className="text-[#1DA5A6] font-semibold hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}