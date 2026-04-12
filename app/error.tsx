"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 animate-scale-in">
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <AlertTriangle className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-lg text-[#2C2C2C]/60 mb-4">
            We encountered an unexpected error. Don't worry, our team has been
            notified.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
              <p className="text-sm font-semibold text-red-900 mb-2">
                Error Details:
              </p>
              <code className="text-xs text-red-700 break-all">
                {error.message}
              </code>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <button
            onClick={reset}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          <button
            onClick={() => router.push("/home")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#2C2C2C]/10 text-[#2C2C2C] rounded-xl font-semibold hover:border-[#1DA5A6]/30 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </button>
        </div>

        {/* Help Text */}
        <p className="mt-8 text-sm text-[#2C2C2C]/60">
          If the problem persists, please{" "}
          <button
            onClick={() => router.push("/support")}
            className="text-[#1DA5A6] font-semibold hover:underline"
          >
            contact support
          </button>
        </p>
      </div>
    </div>
  );
}