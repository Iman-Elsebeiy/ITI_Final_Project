"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  DollarSign,
  CreditCard,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Dates, 2: Payment, 3: Confirmation
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock item data
  const item = {
    title: "Scientific Calculator TI-84 Plus",
    image: "https://via.placeholder.com/100",
    price: 50,
    period: "Per Week",
    deposit: 100,
    location: "Main Campus, Building 5",
  };

  const calculateTotal = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const weeks = Math.ceil(days / 7);
    return item.price * weeks;
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-4">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-[#2C2C2C]/60 mb-8">
            Your rental has been confirmed. You'll receive a confirmation email
            shortly.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => router.push("/rentals")}
              className="px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              View My Rentals
            </button>
            <button
              onClick={() => router.push("/browse")}
              className="px-6 py-3 bg-white border-2 border-gray-200 text-[#2C2C2C] rounded-xl font-semibold hover:border-[#1DA5A6]/30 transition-all"
            >
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-[#2C2C2C]/60 hover:text-[#2C2C2C] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>

      <h1 className="text-3xl font-bold text-[#2C2C2C] mb-8">
        Complete Your Booking
      </h1>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s
                  ? "bg-[#1DA5A6] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s}
            </div>
            {s < 2 && (
              <div
                className={`w-24 h-1 ${
                  step > s ? "bg-[#1DA5A6]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Form */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-6">
                Select Rental Period
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1DA5A6]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split("T")[0]}
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1DA5A6]"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">Pickup & Return</p>
                  <p>
                    Coordinate with the owner for pickup time and location.
                    Item must be returned by end date.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!startDate || !endDate}
                className="w-full mt-6 h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold text-[#2C2C2C] mb-6">
                Payment Method
              </h2>

              <div className="space-y-3 mb-6">
                {[
                  { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                  { id: "wallet", label: "Mobile Wallet", icon: DollarSign },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        paymentMethod === method.id
                          ? "border-[#1DA5A6] bg-[#1DA5A6]/5"
                          : "border-gray-200 hover:border-[#1DA5A6]/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="w-5 h-5 text-[#1DA5A6]"
                      />
                      <Icon className="w-6 h-6 text-[#1DA5A6]" />
                      <span className="font-semibold text-[#2C2C2C]">
                        {method.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1DA5A6]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1DA5A6]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1DA5A6]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 bg-gray-100 text-[#2C2C2C] font-semibold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Back
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing}
                  className="flex-1 h-12 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isProcessing ? "Processing..." : "Confirm Booking"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right - Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
            <h3 className="font-bold text-[#2C2C2C] mb-4">Booking Summary</h3>

            <div className="flex gap-3 mb-6 pb-6 border-b border-gray-200">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-[#2C2C2C] text-sm">
                  {item.title}
                </p>
                <p className="text-xs text-[#2C2C2C]/60 mt-1">
                  {item.price} EGP {item.period}
                </p>
              </div>
            </div>

            {startDate && endDate && (
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-[#1DA5A6]" />
                  <div>
                    <p className="text-[#2C2C2C]/60">Rental Period</p>
                    <p className="font-semibold text-[#2C2C2C]">
                      {startDate} to {endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#1DA5A6]" />
                  <div>
                    <p className="text-[#2C2C2C]/60">Pickup Location</p>
                    <p className="font-semibold text-[#2C2C2C]">
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-[#2C2C2C]/60">Rental Fee</span>
                <span className="font-semibold text-[#2C2C2C]">
                  EGP {calculateTotal()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#2C2C2C]/60">Security Deposit</span>
                <span className="font-semibold text-[#2C2C2C]">
                  EGP {item.deposit}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#2C2C2C]/60">Service Fee</span>
                <span className="font-semibold text-[#2C2C2C]">
                  EGP {Math.round(calculateTotal() * 0.1)}
                </span>
              </div>
              <div className="flex justify-between pt-3 mt-3 border-t border-gray-200">
                <span className="font-bold text-[#2C2C2C]">Total</span>
                <span className="font-bold text-[#1DA5A6] text-xl">
                  EGP{" "}
                  {calculateTotal() +
                    item.deposit +
                    Math.round(calculateTotal() * 0.1)}
                </span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600 flex-shrink-0" />
              <p className="text-xs text-green-900">
                Deposit will be refunded after item return inspection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}