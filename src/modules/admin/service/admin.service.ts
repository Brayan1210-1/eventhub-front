import apiClient from '@/core/api/api-client';
import type { GeneralReportResponse, GeneralReportParams } from '../types/generalReports.types';

import type { AdminUserRegisterType } from '../schema/adminUser.schema';
import type { MessageResponse } from '@/utils/message.type';

export const getGeneralReport = async (params: GeneralReportParams): Promise<GeneralReportResponse> => {
    const { data } = await apiClient.get<GeneralReportResponse>('/admin/reporte-general', {
        params
    });
    return data;
};


export const createUserByAdmin = async (userData: AdminUserRegisterType): Promise<MessageResponse> => {
    // 👈 Aplicamos el MessageDTO en el genérico de Axios
    const { data } = await apiClient.post<MessageResponse>('/admin/crear/usuarios', userData);
    return data;
};