"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    // Navigate to login after fade out completes
    const navigateTimer = setTimeout(() => {
      router.push("/login");
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [router]);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#1DA5A6] to-[#194774] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="animate-scale-in mb-8">
        <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
          <div className="text-6xl font-extrabold">
            <span className="text-white">U</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center tracking-tight">
          Uni<span className="text-[#FFC83D]">Tool</span>
        </h1>
        <p className="text-white/80 text-center mt-3 text-lg font-medium">
          Share • Rent • Save
        </p>
      </div>

      {/* Loading Animation */}
      <div className="flex gap-2 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-white/60 animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>

      {/* Tagline */}
      <p className="absolute bottom-12 text-white/60 text-sm">
        The Student Marketplace
      </p>
    </div>
  );
}