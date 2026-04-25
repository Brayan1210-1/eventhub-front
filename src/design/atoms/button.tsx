
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className = "", ...props }: ButtonProps) {

  return (
    <button
      className={`
      
     inline-flex items-center justify-center 
     rounded-lg px-6 py-2.5 
     font-[IstokWeb] text-white
     transition-all duration-200
     active:scale-95 disabled:opacity-50
        
        bg-primary hover:brightness-110      
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}