export const API_BASE_URL = "http://localhost:8081/api/v1";
export const API_TIMEOUT = 10_000;
export const DEFAULT_PAGE_LIMIT = 20;

/**
 * Endpoints del Módulo de Autenticación
 */
export const AUTH_ENDPOINTS = {
  REGISTRO: "/autenticacion/registro",
  LOGIN: "/autenticacion/login",
  REFRESH: "/autenticacion/refresh",
};