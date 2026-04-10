import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...props }: InputProps) => {
  return (
    <div className="w-full space-y-2">
      {label && <label className="text-sm font-bold text-gray-700 ml-1">{label}</label>}
      <input 
        className={`w-full p-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all shadow-sm ${className}`}
        {...props}
      />
    </div>
  );
};