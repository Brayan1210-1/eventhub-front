import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "@/core/store/auth.store";
import { useLogout } from "@/modules/auth/logout/hooks/useLogout";

type RouteConfig = {
  name: string;
  path: string;
  allowedRoles: string[];
};

const navigationRoutes: RouteConfig[] = [
  { name: 'Explorar Eventos', path: '/eventos', allowedRoles: [] },
  { name: 'Mis Entradas', path: '/mis-entradas', allowedRoles: ['CLIENTE'] },
  { name: 'Panel Organizador', path: '/organizador/dashboard', allowedRoles: ['ADMIN', 'ORGANIZADOR'] },
  { name: 'Gestión EventHub', path: '/admin/usuarios', allowedRoles: ['ADMIN'] },
  { name: 'Lugares', path: '/admin/lugares', allowedRoles: ['ADMIN'] }
];

export function Navbar() {
  const { isAuthenticated, roles } = useAuthStore();
  const { mutate: handleLogout, isPending: isLoggingOut } = useLogout();

  // Controla si el menú de celular está abierto
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hasAccess = (allowedRoles: string[]) => {
    if (allowedRoles.length === 0) return true;
    return roles.some((userRole) => allowedRoles.includes(userRole));
  };

  // Función auxiliar para cerrar el menú al hacer clic en un enlace en móvil
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/*  LOGO */}
            <div className="shrink-0 flex items-center">
              <NavLink to="/" onClick={closeMenu} className="text-xl font-bold text-blue-600">
                EventHub
              </NavLink>
            </div>

            {/*  MENÚ ESCRITORIO  */}
            <nav className="hidden md:flex space-x-6">
              {navigationRoutes
                .filter(route => hasAccess(route.allowedRoles))
                .map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors border-b-2 py-5 ${isActive
                        ? "text-blue-600 border-blue-600"
                        : "text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300"
                      }`
                    }
                  >
                    {route.name}
                  </NavLink>
                ))}
            </nav>

            {/* BOTONES DE SESIÓN ESCRITORIO  */}
            <div className="hidden md:flex items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <NavLink to="/auth" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    Iniciar Sesión
                  </NavLink>
                  <NavLink to="/auth/registro" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                    Registrarse
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={() => handleLogout()}
                  disabled={isLoggingOut}
                  className="text-sm font-medium text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors"
                >
                  {isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
                </button>
              )}
            </div>

            {/*  BOTÓN HAMBURGUESA MÓVIL  */}
            <div className="flex md:hidden items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600 focus:outline-none p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navigationRoutes
                .filter(route => hasAccess(route.allowedRoles))
                .map((route) => (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`
                    }
                  >
                    {route.name}
                  </NavLink>
                ))}

              {/* Separador */}
              <div className="border-t border-gray-200 my-2 pt-2">
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2 px-3">
                    <NavLink to="/auth" onClick={closeMenu} className="block text-center text-base font-medium text-gray-700 hover:text-gray-900 py-2">
                      Iniciar Sesión
                    </NavLink>
                    <NavLink to="/auth/registro" onClick={closeMenu} className="block text-center text-base font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                      Registrarse
                    </NavLink>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                    disabled={isLoggingOut}
                    className="w-full text-center mt-2 text-base font-medium text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50"
                  >
                    {isLoggingOut ? 'Cerrando...' : 'Cerrar Sesión'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>


      <main className="grow bg-brand-bg">
        <Outlet />
      </main>
    </div>
  );
}