import { useQuery } from '@tanstack/react-query';
import { getGeneralReport } from '../service/admin.service';
import type { GeneralReportParams } from '../types/generalReports.types';

export const useGeneralReport = (params: GeneralReportParams) => {
    return useQuery({
        queryKey: ['general-report', params],
        queryFn: () => getGeneralReport(params),
        enabled: !!params.fechaInicio && !!params.fechaFin,
    });
};