// src/modules/events/hooks/useValidateTicket.ts
import { useMutation } from '@tanstack/react-query';
import { validateTicket } from '../service/eventService';
import type { TicketValidationRequest, TicketValidationResponse } from '../types/scanner.types';
import type { ApiErrorResponse } from '@/core/api/apiErrorResponse';

interface ValidateTicketParams {
    eventId: number;
    data: TicketValidationRequest;
}

export const useValidateTicket = () => {
    return useMutation<
        TicketValidationResponse,
        ApiErrorResponse, // Tu interfaz de errores globales
        ValidateTicketParams
    >({
        mutationFn: ({ eventId, data }) => validateTicket(eventId, data),
    });
};