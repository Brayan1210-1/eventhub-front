

export interface TicketValidationRequest {
    ticketCode: string;
}

export interface TicketValidationResponse {
    valid: boolean;
    message: string;
    attendeeName?: string;
    attendeeDocument?: string;
    zoneName?: string;
}