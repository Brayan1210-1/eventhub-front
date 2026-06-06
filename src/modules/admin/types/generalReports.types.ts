import type { EventCategory } from "../../events/types/event.types";

export interface CategoryReport {
    category: EventCategory | string;
    ticketsSold: number;
    revenue: number;
}

export interface TopEvent {
    eventName: string;
    ticketsSold: number;
    revenue: number;
}

export interface GeneralReportResponse {
    totalOrders: number;
    totalTicketsSold: number;
    totalRevenue: number;
    categoryBreakdown: CategoryReport[];
    topEvents: TopEvent[];
}

export interface GeneralReportParams {
    fechaInicio: string;
    fechaFin: string;
}