import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  fullWidth?: boolean;
}

export const Button = ({ children, variant = 'primary', fullWidth, className, ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50";
  
  const variants = {
    primary: "bg-teal-600 text-white hover:bg-teal-700 shadow-md shadow-teal-100",
    secondary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    outline: "border-2 border-gray-200 text-gray-600 hover:border-teal-600 hover:text-teal-600",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};