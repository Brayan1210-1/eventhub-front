import { Route, Routes } from "react-router-dom";
import { LoginForm } from "@/modules/auth/login/pages/login";
import { RegisterForm } from "@/modules/auth/register/pages/register";
import { Navbar } from "@/design/molecules/navbar";
import { PageTest } from "@/design/page/PageTest";
import { ProtectedRoute } from "./protectedRoutes";
import PlacesPage from '@/modules/places/pages/PlacesPage'

export const AppRouter = () => {
    return (


        <Routes>



            <Route element={<Navbar />}>


                <Route path="/eventos" element={<div>Página de todos los eventos (Pública)</div>} />

                <Route path="/auth" >
                    <Route index element={<LoginForm />} />
                    <Route path="/auth/registro" element={<RegisterForm />} />

                </Route>

                <Route element={<ProtectedRoute allowedRoles={['CLIENTE']} />}>
                    <Route path="/mis-entradas" element={<div>Mis Entradas</div>} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'ORGANIZADOR']} />}>
                    <Route path="/organizador/dashboard" element={<div>Panel Organizador</div>} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                    <Route path="/admin/lugares" element={<PlacesPage />} />
                </Route>

                <Route path="/probando" element={<PageTest />} />
                <Route path="*" element={<h1>páginas en proceso...</h1>} />

            </Route>



        </Routes>

    );
}