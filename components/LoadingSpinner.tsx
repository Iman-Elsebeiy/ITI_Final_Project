import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "white" | "gray";
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = "md",
  color = "primary",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-[#1DA5A6]",
    white: "text-white",
    gray: "text-gray-400",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2
        className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin`}
      />
      {text && (
        <p
          className={`text-sm font-medium ${
            color === "white" ? "text-white" : "text-[#2C2C2C]/60"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// Skeleton Loader Component
export function SkeletonLoader({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

// Card Skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      <SkeletonLoader className="h-48 w-full rounded-xl" />
      <SkeletonLoader className="h-6 w-3/4" />
      <SkeletonLoader className="h-4 w-1/2" />
      <div className="flex gap-2">
        <SkeletonLoader className="h-4 w-20" />
        <SkeletonLoader className="h-4 w-20" />
      </div>
    </div>
  );
}

// List Skeleton
export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-4 flex gap-4">
          <SkeletonLoader className="w-16 h-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader className="h-4 w-3/4" />
            <SkeletonLoader className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}