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
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
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
                    valid: false,
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
                        <div className="w-full flex flex-col items-center animate-in zoom-in duration-300">

                            {scanResult.valid ? (
                                /* 
                                     (ACCESO PERMITIDO)
                                    */
                                <>
                                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-green-50">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-green-600 mb-1 tracking-tight">ACCESO PERMITIDO</h3>
                                    <p className="text-gray-500 font-bold mb-6 text-center">{scanResult.message}</p>

                                    {/* Tarjeta con los datos del asistente */}
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 w-full mb-6">
                                        {scanResult.attendeeName && (
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-500 text-sm">Asistente:</span>
                                                <span className="font-black text-gray-900">{scanResult.attendeeName}</span>
                                            </div>
                                        )}
                                        {scanResult.attendeeDocument && (
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-gray-500 text-sm">Documento:</span>
                                                <span className="font-black text-gray-900">{scanResult.attendeeDocument}</span>
                                            </div>
                                        )}
                                        {scanResult.zoneName && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 text-sm">Zona / Localidad:</span>
                                                <span className="font-black text-blue-700">{scanResult.zoneName}</span>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                /* 
                                   (ACCESO DENEGADO)
                                    */
                                <>
                                    <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm border-4 border-red-50">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-black text-red-600 mb-1 tracking-tight">ACCESO DENEGADO</h3>
                                    <p className="text-gray-600 font-medium mb-6 text-center text-lg">{scanResult.message}</p>
                                </>
                            )}

                            <Button
                                onClick={handleScanNext}
                                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all"
                            >
                                Escanear siguiente boleta
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}