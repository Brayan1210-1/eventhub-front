import { Route, Routes } from "react-router-dom";
import { LoginForm } from "@/modules/auth/login/pages/login";
import { RegisterForm } from "@/modules/auth/register/pages/register";
import { Navbar } from "@/design/molecules/navbar";
import { PageTest } from "@/design/page/PageTest";
import { ProtectedRoute } from "./protectedRoutes";
import PlacesPage from '@/modules/places/pages/PlacesPage'
import { OrganizerDashboard } from "@/modules/events/Page/OrganizerDashboard";
import { EventForm } from "@/modules/events/components/EventForm";
import { ConfigureEventPage } from "@/modules/events/Page/ConfigureEventPage";
import { PublicEventsPage } from "@/modules/public/pages/PublicEventPage";
import { PublicEventDetailPage } from "@/modules/public/pages/PublicEventDetailPage";
import { MyOrdersDashboard } from "@/modules/orders/pages/MyOrdersDashBoard";
import { PaymentPage } from "@/modules/orders/pages/PaymentPage";
import { SellerDashboardPage } from "@/modules/seller/pages/SellerDashboardPage";
import { AdminDashboard } from "@/modules/admin/pages/AdminDashboard";
import { NotFoundPage } from "@/design/page/NotFound";
export const AppRouter = () => {
    return (


        <Routes>



            <Route element={<Navbar />}>
                <Route index element={<PublicEventsPage />} />

                <Route path="/eventos" element={<PublicEventsPage />} />
                <Route path="/evento/:id" element={<PublicEventDetailPage />} />



                <Route path="/auth" >
                    <Route index element={<LoginForm />} />
                    <Route path="/auth/registro" element={<RegisterForm />} />

                </Route>

                <Route element={<ProtectedRoute allowedRoles={['VENDEDOR']} />}>

                    <Route path="/vendedor" element={<SellerDashboardPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['CLIENTE']} />}>
                    <Route path="/mis-entradas" element={<MyOrdersDashboard />} />
                    <Route path="/pago/:orderId" element={<PaymentPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'ORGANIZADOR']} />}>
                    <Route path="/organizador/dashboard" element={<OrganizerDashboard />} />
                    <Route path="/crear" element={< EventForm />} />
                    <Route path="/evento/configurar" element={< ConfigureEventPage />} />
                </Route>



                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                    <Route path="/admin/lugares" element={<PlacesPage />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>

                <Route path="/probando" element={<PageTest />} />
                <Route path="*" element={<NotFoundPage />} />

            </Route>



        </Routes >

    );
}