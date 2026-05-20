"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ShoppingCart, Home } from "lucide-react";
import { createAdminRental } from "@/lib/data/rentals";
import { Suspense } from "react";

function RentalSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    // Confirm rental via server action
    fetch(`/api/stripe/confirm?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setStatus("error");
        } else {
          setStatus("success");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  useEffect(() => {
    if (status === "success") {
      const t = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(t);
            router.push("/rentals");
          }
          return c - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [status, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-bold text-[#2C2C2C]">Processing your payment...</h2>
            <p className="text-[#2C2C2C]/60 mt-2">Please wait a moment</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Payment Successful!</h2>
            <p className="text-[#2C2C2C]/60 mb-8">
              Your rental has been confirmed. You can now coordinate pickup with the owner.
            </p>
            <div className="p-4 bg-[#1DA5A6]/5 border border-[#1DA5A6]/20 rounded-xl mb-6">
              <p className="text-sm text-[#2C2C2C]/60">
                Redirecting to your rentals in <span className="font-bold text-[#1DA5A6]">{countdown}s</span>
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => router.push("/rentals")}
                className="flex-1 h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
                <ShoppingCart className="w-5 h-5" /> My Rentals
              </button>
              <button onClick={() => router.push("/home")}
                className="flex-1 h-12 bg-[#F1F3F5] text-[#2C2C2C] font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-[#e5e7eb] transition-all">
                <Home className="w-5 h-5" /> Home
              </button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Something went wrong</h2>
            <p className="text-[#2C2C2C]/60 mb-8">
              Your payment may have been processed but we couldn't confirm the rental. Please check your rentals or contact support.
            </p>
            <div className="flex gap-3">
              <button onClick={() => router.push("/rentals")}
                className="flex-1 h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Check Rentals
              </button>
              <button onClick={() => router.push("/home")}
                className="flex-1 h-12 bg-[#F1F3F5] text-[#2C2C2C] font-semibold rounded-xl flex items-center justify-center gap-2">
                <Home className="w-5 h-5" /> Home
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function RentalSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#1DA5A6] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RentalSuccessContent />
    </Suspense>
  );
}
