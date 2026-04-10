import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all
          ${error
            ? "border-red-400 focus:ring-2 focus:ring-red-200"
            : "border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}   