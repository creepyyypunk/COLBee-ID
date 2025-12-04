import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        className={`w-5 h-5 text-honey-500 border-honey-300 rounded focus:ring-honey-200 focus:ring-2 ${className}`}
        {...props}
      />
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
}
