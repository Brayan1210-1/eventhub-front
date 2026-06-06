import { useNavigate } from "react-router-dom";
import { Button } from "@/design/atoms/button";

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6 py-12 animate-in fade-in duration-500">
            <div className="text-center max-w-lg">

                <h1 className="text-9xl font-black text-blue-100 select-none">
                    404
                </h1>

                {/* Mensaje de error */}
                <div className="relative -mt-12 md:-mt-16 mb-8">
                    <span className="bg-blue-600 text-white px-3 py-1 text-sm font-bold uppercase tracking-wider rounded-full shadow-sm">
                        Error de Ruta
                    </span>
                </div>

                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
                    ¡Ups! Te saliste del mapa
                </h2>

                <p className="text-gray-500 mb-10 text-lg">
                    La página que estás intentando buscar no existe, fue movida o nunca existió en nuestro sistema.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                        onClick={() => navigate(-1)}
                        className="bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 px-8 py-3 rounded-xl font-bold transition-all"
                    >
                        ← Volver Atrás
                    </Button>

                    <Button
                        onClick={() => navigate('/')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
                    >
                        Ir al Inicio 🏠
                    </Button>
                </div>
            </div>
        </div>
    );
}