export const ROUTES = {
    HOME: "/",
    LOGIN: "/autenticacion/login",
    REGISTRO: "/autenticacion/registro",
    PERFIL: "/autenticacion/perfil",
  } as const;
  

  export function registroPath() {
    return ROUTES.REGISTRO;
  }

  export function loginPath() {
    return ROUTES.LOGIN;
  }
  
  /**
   * Retorna la ruta para obtener o editar el perfil del usuario actual
   */
  export function perfilPath() {
    return ROUTES.PERFIL;
  }