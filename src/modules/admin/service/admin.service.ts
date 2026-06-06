import apiClient from '@/core/api/api-client';
import type { GeneralReportResponse, GeneralReportParams } from '../types/generalReports.types';

export const getGeneralReport = async (params: GeneralReportParams): Promise<GeneralReportResponse> => {
    const { data } = await apiClient.get<GeneralReportResponse>('/admin/reporte-general', {
        params
    });
    return data;
};