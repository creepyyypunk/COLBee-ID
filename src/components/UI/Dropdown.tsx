import React from 'react';

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
}

export default function Dropdown({ label, options, className = '', ...props }: DropdownProps) {
  return (
    <div className="space-y-2.5">
      {label && (
        <label className="block text-sm font-medium text-bee-black tracking-tight">
          {label}
        </label>
      )}
      <select
        className={`input-field cursor-pointer ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
