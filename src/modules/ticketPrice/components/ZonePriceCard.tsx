import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketPriceSchema, type CreateTicketPriceFormData } from "../schema/ticketPriceSchema";
import { useCreateTicketPrice } from "../hooks/useTicketPrice";
import type { Zone } from "@/modules/zones/types/zone.types";
import { getApiErrorMessage } from "@/utils/errorController";
import { Input } from "@/design/atoms/input";
import { Button } from "@/design/atoms/button";
import FormError from "@/design/molecules/FormError";
import type { TicketPrice } from "../types/ticketPrice";

interface ZonePriceCardProps {
    zone: Zone;
    eventId: number;
    existingPrice?: TicketPrice;
}

export function ZonePriceCard({ zone, eventId, existingPrice }: ZonePriceCardProps) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<CreateTicketPriceFormData>({
        resolver: zodResolver(createTicketPriceSchema),

        values: {
            price: existingPrice?.price ?? "" as unknown as number,
            availableQuantity: existingPrice?.availableQuantity ?? "" as unknown as number,
        }
    });

    const createPriceMutation = useCreateTicketPrice();

    const isConfigured = !!existingPrice || createPriceMutation.isSuccess;

    const onSubmit = (data: CreateTicketPriceFormData) => {
        // 🌟 REGLA DE NEGOCIO: Validamos contra el aforo de la zona antes de enviar al backend
        if (data.availableQuantity > zone.capacity) {
            setError("availableQuantity", {
                type: "manual",
                message: `No puedes superar el aforo máximo de la zona (${zone.capacity})`
            });
            return;
        }

        // Le pasamos el objeto empaquetado a nuestro hook
        createPriceMutation.mutate(
            { eventId, zoneId: zone.id, data },
            {
                onError: (error: unknown) => {
                    const backendMessage = getApiErrorMessage(error);
                    setError("root", { type: "manual", message: backendMessage });
                }
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-full">

            {/* Encabezado de la Tarjeta */}
            <div className="mb-5 pb-4 border-b border-gray-100 flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-xl text-gray-900">{zone.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">👥 Aforo: {zone.capacity} personas</p>
                </div>
                {/* Indicador de éxito */}
                {isConfigured && (
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                        ¡Configurado!
                    </span>
                )}
            </div>

            {/* Inputs de configuración */}
            <div className="grid grid-cols-2 gap-4 mb-4 grow">
                <Input
                    label="Precio ($)"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    error={errors.price?.message}
                    disabled={isConfigured}

                />
                <Input
                    label="Boletas a vender"
                    type="number"
                    {...register("availableQuantity", { valueAsNumber: true })}
                    error={errors.availableQuantity?.message}
                    disabled={isConfigured}
                />
            </div>

            {/* Manejo de errores globales */}
            <div className="mt-auto pt-4 flex flex-col gap-3">
                <FormError message={errors.root?.message} type="global" />

                <Button
                    type="submit"
                    className="w-full"
                    // Deshabilitamos el botón si está cargando o si ya se guardó con éxito
                    disabled={isConfigured}
                >
                    {createPriceMutation.isPending
                        ? "Guardando..."
                        : createPriceMutation.isSuccess
                            ? "Precio Configurado"
                            : "Guardar Precio"}
                </Button>
            </div>

        </form>
    );
}