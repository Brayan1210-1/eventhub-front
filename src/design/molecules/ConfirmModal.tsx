import { Button } from "@/design/atoms/button";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmModal({
    isOpen,
    title,
    message,
    confirmText = "Eliminar",
    cancelText = "Cancelar",
    onConfirm,
    onCancel
}: ConfirmModalProps) {

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-60 p-4">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden">
                <div className="p-6 flex flex-col gap-2">

                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{message}</p>

                    <div className="flex justify-end gap-3 mt-2">
                        <Button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-200 text-white hover:bg-gray-300 transition-colors"
                        >
                            {cancelText}
                        </Button>
                        <Button
                            type="button"
                            onClick={onConfirm}
                            className="bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors"
                        >
                            {confirmText}
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}