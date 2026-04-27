import { CardHeader } from "@/design/atoms/card";
import { NavLink, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <>
      <CardHeader className="w-full rounded-t-none  flex items-center justify-between shadow-sm">

        <div className="flex items-center gap-2 cursor-pointer">
          <h2 className="mb-0 text-2xl font-bold text--color-primary">
            EventHub
          </h2>
        </div>


        <div className="flex items-center gap-8">

          <ul className="hidden md:flex gap-6 items-center list-none p-0 m-0 font-medium">
            <li>
              <NavLink to="/eventos" className="hover:text-(--color-primary) transition-colors">Eventos</NavLink>
            </li>
            <li>
              <NavLink to="/nosotros" className="hover:text--color-primary transition-colors">Nosotros</NavLink>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <NavLink to="/auth" className="text-sm font-semibold cursor-pointer">
              Iniciar Sesión
            </NavLink>

            <NavLink to="/auth/registro" className="px-6 py-2 text-sm">
              Registrarse
            </NavLink>
          </div>
        </div>
      </CardHeader>

      <main>
        <Outlet />
      </main>
    </>
  );
}