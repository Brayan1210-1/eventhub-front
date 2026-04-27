import React, { useId } from "react";

interface InputProps {
    label: string;
    placeHolder: string;
    type: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    style?: string;
    error?: string;
}

export const Input = (props: InputProps) => {
    const id = useId();
    return (
        <div>

            <label htmlFor={id} > {props.label} </label>

            <input id={id} placeholder={props.placeHolder} type={props.type} value={props.value} onChange={props.onChange}

                className={`
                      w-full px-4 py-2.5 rounded-xl border transition-all duration-200
                     bg-brand-card text-text-main
                     placeholder:text-gray-400 focus:outline-none
                      ${props.error
                        ? "border-red-500 ring-1 ring-red-500 shadow-sm"
                        : "border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
                    }
                     ${props.style}`}
            >
            </input>
        </div>

    );
}


