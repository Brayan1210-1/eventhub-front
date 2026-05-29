import { NavLink, Outlet } from "react-router-dom";
import { CardHeader } from "@/design/atoms/card";
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
];

export function Navbar() {

  const { isAuthenticated, roles } = useAuthStore();

  const { mutate: handleLogout, isPending: isLoggingOut } = useLogout();

  const hasAccess = (allowedRoles: string[]) => {
    if (allowedRoles.length === 0) return true;
    // .some() verifica si el usuario tiene al menos UNO de los roles requeridos
    return roles.some((userRole) => allowedRoles.includes(userRole));
  };

  return (
    <>
      <CardHeader className="w-full rounded-t-none flex flex-row items-center justify-between shadow-sm p-4 bg-white">

        <div className="flex items-center gap-8">
          <span className="font-bold text-xl text-blue-600">EventHub</span>

          {/* Pintamos las rutas dinámicamente filtrando por permisos */}
          <nav className="flex gap-4">
            {navigationRoutes
              .filter((route) => hasAccess(route.allowedRoles))
              .map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-600 hover:text-blue-500"
                    }`
                  }
                >
                  {route.name}
                </NavLink>
              ))}
          </nav>
        </div>

        <div>

          {!isAuthenticated ? (
            <div className="flex gap-4 items-center">
              <NavLink to="/auth" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Iniciar Sesión
              </NavLink>
              <NavLink to="/auth/registro" className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Registrarse
              </NavLink>
            </div>
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
      </CardHeader>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}