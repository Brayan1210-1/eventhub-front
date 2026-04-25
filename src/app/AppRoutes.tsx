import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "@/design/molecules/login";
import { RegisterPage } from "@/design/page/RegisterPage";
import { Navbar } from "@/design/molecules/navbar";

export const AppRouter = () => {
    return (

        <HashRouter>
            <Routes>

                <Route element={<Navbar />}>
                    <Route index element={<LoginForm />} />
                    <Route path="/registro" element={<RegisterPage />} />
                    <Route path="*" element={<h1>páginas en proceso...</h1>} />
                </Route>
            </Routes>
        </HashRouter>
    );
}