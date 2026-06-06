import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useValidateTicket } from '../hooks/useValidateTickets';
import { Button } from '@/design/atoms/button';
import type { TicketValidationResponse } from '../types/scanner.types';

interface QRScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventId: number;
}

export function QRScannerModal({ isOpen, onClose, eventId }: QRScannerModalProps) {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const lastScannedCode = useRef<string | null>(null);

    const [scanResult, setScanResult] = useState<TicketValidationResponse | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);

    const { mutate: validateTicket, isPending } = useValidateTicket();

    useEffect(() => {
        if (!isOpen) {
            stopScanner();
            return;
        }

        // Damos un pequeño retraso para asegurar que el div "qr-reader" ya esté montado en el DOM
        const timer = setTimeout(() => {
            initializeScanner();
        }, 100);

        return () => {
            clearTimeout(timer);
            stopScanner();
        };
    }, [isOpen]);

    const initializeScanner = async () => {
        try {
            setCameraError(null);
            const html5QrCode = new Html5Qrcode("qr-reader");
            scannerRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: "environment" }, // Usa la cámara trasera por defecto
                {
                    fps: 10, // Escanea 10 veces por segundo
                    qrbox: { width: 250, height: 250 }, // Cuadro guía
                    aspectRatio: 1.0,
                },
                (decodedText) => {
                    handleScanSuccess(decodedText, html5QrCode);
                },
                (errorMessage) => {
                    // ignoramos los errores de lectura frame a frame (son normales cuando no hay QR enfocado)
                }
            );
        } catch (err) {
            console.error("Error al iniciar la cámara: ", err);
            setCameraError("No se pudo acceder a la cámara. Verifica los permisos o asegúrate de usar HTTPS/localhost.");
        }
    };

    const stopScanner = () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            scannerRef.current.stop()
                .then(() => scannerRef.current?.clear())
                .catch(err => console.error("Error al detener scanner:", err));
        }
    };

    const handleScanSuccess = (decodedText: string, scanner: Html5Qrcode) => {
        // Evitar escaneos dobles rápidos o escanear mientras ya estamos consultando la API
        if (lastScannedCode.current === decodedText || isPending) return;

        lastScannedCode.current = decodedText;

        // Pausamos la cámara mientras validamos con el backend
        scanner.pause(true);

        validateTicket({ eventId, data: { ticketCode: decodedText } }, {
            onSuccess: (data) => {
                setScanResult(data);
            },
            onError: (error: any) => {
                // Si el backend tira un error genérico (ej. 500 o CORS), armamos un mensaje rojo
                setScanResult({
                    isValid: false,
                    message: error?.response?.data?.message || "Error de conexión al validar la boleta."
                });
            }
        });
    };

    const handleScanNext = () => {
        setScanResult(null);
        lastScannedCode.current = null;
        if (scannerRef.current) {
            scannerRef.current.resume(); // Reanudamos la cámara
        }
    };

    const handleClose = () => {
        stopScanner();
        setScanResult(null);
        lastScannedCode.current = null;
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">

                {/* Cabecera del Modal */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Validar Boleta</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-gray-700 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Contenido principal */}
                <div className="p-6 flex flex-col items-center">

                    {/* Pantalla de error de cámara */}
                    {cameraError && (
                        <div className="text-center p-4 bg-red-50 text-red-600 rounded-xl mb-4 text-sm font-medium">
                            <p>📷 {cameraError}</p>
                        </div>
                    )}

                    {/* El Lector QR (Se oculta si ya tenemos un resultado para mostrar) */}
                    <div className={`w-full max-w-75 overflow-hidden rounded-xl border-4 border-gray-100 ${scanResult ? 'hidden' : 'block'}`}>
                        <div id="qr-reader" className="w-full bg-black"></div>
                        {isPending && (
                            <div className="text-center text-blue-600 font-bold py-3 animate-pulse">
                                Validando en el servidor...
                            </div>
                        )}
                    </div>

                    {/* Resultados de la validación */}
                    {scanResult && (
                        <div className="w-full flex flex-col items-center animate-in fade-in zoom-in duration-300">

                            {/* Icono de Éxito o Error */}
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${scanResult.isValid ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {scanResult.isValid ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                )}
                            </div>

                            <h3 className={`text-2xl font-black text-center mb-2 ${scanResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                                {scanResult.isValid ? '¡ACCESO PERMITIDO!' : 'ACCESO DENEGADO'}
                            </h3>

                            <p className="text-center text-gray-600 mb-6 px-4 font-medium">
                                {scanResult.message}
                            </p>

                            {/* Datos del Asistente (Si vienen en el DTO) */}
                            {scanResult.attendeeName && (
                                <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Asistente:</span>
                                        <span className="font-bold text-gray-900">{scanResult.attendeeName}</span>
                                    </div>
                                    {scanResult.attendeeDocument && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Documento:</span>
                                            <span className="font-bold text-gray-900">{scanResult.attendeeDocument}</span>
                                        </div>
                                    )}
                                    {scanResult.zoneName && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Zona / Localidad:</span>
                                            <span className="font-black text-blue-600">{scanResult.zoneName}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button onClick={handleScanNext} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200">
                                Escanear siguiente boleta
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}