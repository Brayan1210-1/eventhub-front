import { useState, useEffect } from "react";
import { Button } from "@/design/atoms/button";
import { TextArea } from "@/design/atoms/textarea";

interface PromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (text: string) => void;
    title: string;
    message: React.ReactNode;
    textareaLabel?: string;
    placeholder?: string;
    confirmText?: string;
    cancelText?: string;
    isPending?: boolean;
    minLength?: number;
}

export function PromptModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    textareaLabel = "Motivo",
    placeholder = "Escribe aquí...",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    isPending = false,
    minLength = 0
}: PromptModalProps) {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    // Limpiar el estado cada vez que se abre/cierra el modal
    useEffect(() => {
        if (!isOpen) {
            setText("");
            setError("");
        }
    }, [isOpen]);

    const handleConfirm = () => {
        if (text.trim().length < minLength) {
            setError(`Debe tener al menos ${minLength} caracteres.`);
            return;
        }
        onConfirm(text);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <div className="text-sm text-gray-600 mb-4">{message}</div>

                <div className="mb-4">
                    <TextArea
                        label={textareaLabel}
                        placeholder={placeholder}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                            if (error) setError("");
                        }}
                        rows={3}
                        disabled={isPending}
                    />
                    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none"
                        onClick={onClose}
                        disabled={isPending}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white border-none"
                        onClick={handleConfirm}
                        disabled={isPending}
                    >
                        {isPending ? "Procesando..." : confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}