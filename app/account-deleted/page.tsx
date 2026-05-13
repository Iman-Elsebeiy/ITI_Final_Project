"use client";

import Link from "next/link";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export default function AccountDeletedPage() {
  return (
    <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-[#2C2C2C] mb-3">
          Account Deletion Requested
        </h1>
        <p className="text-[#2C2C2C]/60 mb-8">
          Your account has been scheduled for deletion. You have been signed out of all devices.
        </p>

        <div className="space-y-4 text-left mb-8">
          <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <Clock className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-900">30-Day Grace Period</p>
              <p className="text-sm text-amber-700 mt-1">
                For legal and operational reasons, some of your data (such as active rental records) may be retained for up to 30 days before permanent deletion.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <ShieldCheck className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Your Privacy</p>
              <p className="text-sm text-blue-700 mt-1">
                Your account is no longer accessible. Any retained data is kept solely to fulfill legal obligations and will not be used for any other purpose.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="block w-full py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold text-center hover:shadow-lg transition-all"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
