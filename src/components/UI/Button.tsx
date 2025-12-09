import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'bg-white border-2 border-bee-black text-bee-black hover:bg-bee-black hover:text-white font-medium py-3.5 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg active:scale-[0.98]',
    outline: 'bg-transparent border border-honey-300 text-bee-black hover:bg-honey-100 font-medium py-3.5 px-8 rounded-xl transition-all duration-300 disabled:opacity-50'
  };

  return (
    <button
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
