import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useSession } from "./stores/useSession";

import AdminViews from "./views/adminViews";
import DetailViews from "./views/DetailViews";
import ErrorViews from "./views/ErrorViews";
import HomeView from "./views/HomeView";
import LoginViews from "./views/LoginViews";
import RegisterView from "./views/RegisterView";

import Footer from "./components/Common/Footer";
import Navbar from "./components/Common/Navbar";


const Router = () => {
  const { user, isLoggedIn } = useSession();

  return (
    <BrowserRouter>
      {/* <BrowserRouter/> → Conecta nuestra aplicación a la URL del navegador, */}
      <Navbar />
      <main className="container py-5">
        <Routes>
          {/* Routes funciona como un swich va a decidir en que ruta estamos parados */}
          <Route path="/" element={<HomeView />} />
          {/* Route: hace alucion a una ruta en particular.
     path: el destino de la ruta en este caso / que es el home.
     element: poner el componente que realmente va hacer eso.
     */}
          <Route path="/detail/:id" element={<DetailViews />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginViews />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/" /> : <RegisterView />}
          />
          <Route
            path="/admin"
            element={user?.isAdmin ? <AdminViews /> : <Navigate to="/" />}
          />
          <Route path="*" element={<ErrorViews />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
