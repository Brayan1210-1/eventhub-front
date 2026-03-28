import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string; 
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={` bg-(--color-brand-card) 
        
        typography

        rounded-3xl shadow-xl 
        
        p-8 md:p-10
        
        border border-gray-100/50
        
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return (
    <div
      className={` bg-(--color-brand-card) 
        
        typography

        shadow-xl 
        
        p-4 md:p-4
        
        border border-gray-100/50
        
        ${className}
      `}
    >
      {children}
    </div>
  );
}