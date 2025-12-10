import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <input
        type="checkbox"
        className={`w-5 h-5 text-bee-black border-2 border-honey-600 rounded-md focus:ring-honey-200 focus:ring-2 transition-all cursor-pointer ${className}`}
        {...props}
      />
      <span className="text-sm font-medium text-bee-black group-hover:text-honey-700 transition-colors">{label}</span>
    </label>
  );
}
