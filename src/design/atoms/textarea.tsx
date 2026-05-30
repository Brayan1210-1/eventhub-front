import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <textarea
                    ref={ref}
                    className={`px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-100px resize-y ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                        } ${className}`}
                    {...props}
                />
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        );
    }
);

TextArea.displayName = "TextArea";