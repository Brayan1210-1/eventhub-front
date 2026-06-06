

export interface TicketValidationRequest {
    ticketCode: string;
}

export interface TicketValidationResponse {
    isValid: boolean;
    message: string;
    attendeeName?: string;
    attendeeDocument?: string;
    zoneName?: string;
}