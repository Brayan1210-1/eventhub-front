import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "@/modules/auth/login/pages/login";
import { RegisterForm } from "@/modules/auth/register/pages/register";
import { Navbar } from "@/design/molecules/navbar";
import { PageTest } from "@/design/page/PageTest";

export const AppRouter = () => {
    return (

        <HashRouter>
            <Routes>

                <Route element={<Navbar />}>

                    <Route path="/auth" >
                        <Route index element={<LoginForm />} />
                        <Route path="/auth/registro" element={<RegisterForm />} />

                    </Route>



                    <Route path="/probando" element={<PageTest />} />
                    <Route path="*" element={<h1>páginas en proceso...</h1>} />
                </Route>


            </Routes>
        </HashRouter>
    );
}