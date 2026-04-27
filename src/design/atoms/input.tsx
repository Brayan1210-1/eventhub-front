import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className = "", ...props }, ref) {

    const inputId = React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full mb-4 typography">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-secondary ml-1"
        >
          {label}
        </label>

        <input
          id={inputId}
          ref={ref}
          className={`
        
            w-full px-4 py-2.5 rounded-xl border transition-all duration-200
            bg-brand-card text-text-main
            placeholder:text-gray-400 focus:outline-none
            
            ${error
              ? "border-red-500 ring-1 ring-red-500 shadow-sm"
              : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
            }
            
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-600 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";