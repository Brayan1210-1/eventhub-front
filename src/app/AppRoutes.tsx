import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "@/modules/auth/login/pages/login";
import { RegisterForm } from "@/modules/auth/register/pages/register";
import { Navbar } from "@/design/molecules/navbar";
import { PageTest } from "@/design/page/PageTest";
import { ProtectedRoute } from "./protectedRoutes";

export const AppRouter = () => {
    return (

        <HashRouter>
            <Routes>



                <Route element={<Navbar />}>

                    {/* RUTAS 100% PÚBLICAS (Ej. Ver eventos disponibles) */}
                    {/* Cualquier persona, logueada o no, puede entrar aquí */}
                    <Route path="/eventos" element={<div>Página de todos los eventos (Pública)</div>} />

                    <Route path="/auth" >
                        <Route index element={<LoginForm />} />
                        <Route path="/auth/registro" element={<RegisterForm />} />

                    </Route>

                    {/* RUTAS PROTEGIDAS PARA CUALQUIER USUARIO LOGUEADO (Ej. Mis compras) */}
                    {/* Pasamos un array vacío, solo exige estar autenticado */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/mis-entradas" element={<div>Mis Entradas (Privado)</div>} />
                    </Route>

                    {/* RUTAS PROTEGIDAS SOLO PARA ADMINS Y ORGANIZADORES */}
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'ORGANIZADOR']} />}>
                        <Route path="/organizador/dashboard" element={<div>Panel Organizador</div>} />
                    </Route>

                    {/* RUTAS PROTEGIDAS EXCLUSIVAS PARA ADMIN */}
                    <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                        <Route path="/admin/usuarios" element={<div>Gestión de Usuarios</div>} />
                    </Route>

                    <Route path="/probando" element={<PageTest />} />
                    <Route path="*" element={<h1>páginas en proceso...</h1>} />

                </Route>









            </Routes>
        </HashRouter>
    );
}