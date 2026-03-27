import { useState } from "react";
import { Button } from "../../../design/atoms/button";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("inicio");

  const links = [
    { id: "inicio", label: "Inicio" },
    { id: "explorar", label: "Explorar" },
    { id: "mis-eventos", label: "Mis Eventos" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-(--color-brand-card) shadow-sm">

      <a href="#" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-(--color-primary) flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="1" y="4" width="18" height="15" rx="3" stroke="white" strokeWidth="1.5" />
            <path d="M1 8h18" stroke="white" strokeWidth="1.5" />
            <rect x="5" y="1" width="2" height="5" rx="1" fill="white" />
            <rect x="13" y="1" width="2" height="5" rx="1" fill="white" />
            <circle cx="7" cy="12" r="1.2" fill="white" />
            <circle cx="10" cy="12" r="1.2" fill="white" />
            <circle cx="13" cy="12" r="1.2" fill="white" />
          </svg>
        </div>
        <span className="font-[IstokWeb] text-xl font-bold text-(--color-secondary)">
          EventHub
        </span>
      </a>

      <ul className="flex items-center gap-1 list-none">
        {links.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              onClick={() => setActiveLink(item.id)}
              className={
                "font-[Inter] text-sm px-4 py-2 rounded-lg transition-all duration-200 " +
                (activeLink === item.id
                  ? "text-(--color-primary) border-b-2 border-(--color-primary) font-semibold"
                  : "text-(--color-text-main) hover:text-(--color-primary)")
              }
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        <a
          href="#"
          className="font-[Inter] text-sm text-(--color-secondary) px-4 py-2 rounded-lg border border-(--color-secondary) hover:brightness-110 transition-all duration-200"
        >
          Iniciar sesión
        </a>
        <Button className="flex items-center gap-2">
          Registrarse
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Button>
      </div>

    </nav>
  );
};

export default Navbar;