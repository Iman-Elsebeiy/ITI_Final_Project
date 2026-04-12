"use client";

import { useEffect, useState } from "react";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      window.location.reload();
    }
  }, [isOnline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Offline Icon */}
        <div className="mb-8 animate-pulse">
          <div className="w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <WifiOff className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4">
            No Internet Connection
          </h1>
          <p className="text-lg text-[#2C2C2C]/60 mb-2">
            Looks like you're offline. Please check your internet connection.
          </p>
          <p className="text-[#2C2C2C]/60">
            We'll automatically reconnect you when you're back online.
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1DA5A6] to-[#194774] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          <RefreshCw className="w-5 h-5" />
          Retry Connection
        </button>

        {/* Tips */}
        <div className="mt-12 p-6 bg-white rounded-2xl shadow-md text-left">
          <h3 className="font-bold text-[#2C2C2C] mb-4">
            Troubleshooting Tips:
          </h3>
          <ul className="space-y-2 text-sm text-[#2C2C2C]/70">
            <li className="flex items-start gap-2">
              <span className="text-[#1DA5A6] font-bold">•</span>
              <span>Check if your WiFi or mobile data is turned on</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1DA5A6] font-bold">•</span>
              <span>Try turning Airplane mode on and off</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1DA5A6] font-bold">•</span>
              <span>Restart your router or modem</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#1DA5A6] font-bold">•</span>
              <span>Check if other apps can connect to the internet</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}