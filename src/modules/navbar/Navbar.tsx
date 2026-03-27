import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("inicio");

  const links = [
    { id: "inicio", label: "Inicio" },
    { id: "explorar", label: "Explorar" },
    { id: "mis-eventos", label: "Mis Eventos" },
    { id: "contacto", label: "Contacto" },
  ];

  return (
    <nav className="navbar">

      <a href="#" className="navbar-logo">
        <div className="logo-mark">
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
        <span className="logo-text">EventHub</span>
      </a>

      <ul className="navbar-links">
        {links.map((item) => (
          <li key={item.id}>
            <a
              href="#"
              className={"nav-link" + (activeLink === item.id ? " active" : "")}
              onClick={() => setActiveLink(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="navbar-actions">
        <a href="#" className="btn-login">Iniciar sesión</a>
        <a href="#" className="btn-register">
          Registrarse
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

    </nav>
  );
};

export default Navbar;