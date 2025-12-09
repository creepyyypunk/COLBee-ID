import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2.5">
      {label && (
        <label className="block text-sm font-medium text-bee-black tracking-tight">
          {label}
        </label>
      )}
      <input
        className={`input-field ${className}`}
        {...props}
      />
    </div>
  );
}
