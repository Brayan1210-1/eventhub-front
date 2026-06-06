export interface ZoneReport {
    zoneName: string;
    ticketsSold: number;
    ticketsRemaining: number;
    revenue: number;
}

export interface EventReport {
    eventId: number;
    eventName: string;
    totalTicketsSold: number;
    totalTicketsRemaining: number;
    totalRevenue: number;
    totalAttendees?: number;
    zoneReports: ZoneReport[];
}