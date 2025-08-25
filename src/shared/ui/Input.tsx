// src/shared/ui/Input.tsx
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className={`
          px-3 py-2 border rounded-md shadow-sm 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}