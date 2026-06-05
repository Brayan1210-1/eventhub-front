export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}
export interface PaginatedResponseDTO<T> {
    content: T[];
    meta: PaginationMeta;

}