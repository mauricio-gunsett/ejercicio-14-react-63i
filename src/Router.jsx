import { BrowserRouter, Routes, Route} from 'react-router-dom';

import HomeView from './views/HomeView';
import DetailViews from './views/DetailViews';
import LoginViews from './views/LoginViews';
import AdminViews from './views/adminViews';
import ErrorViews from './views/ErrorViews';

import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

import './App.css'




const Router = () => {
  return <BrowserRouter>
  {/* <BrowserRouter/> → Conecta nuestra aplicación a la URL del navegador, */}
  <Navbar />
  <main>
  <Routes>
    {/* Routes funciona como un swich va a decidir en que ruta estamos parados */}
    <Route path='/' element ={<HomeView/>} />
    {/* Route: hace alucion a una ruta en particular.
     path: el destino de la ruta en este caso / que es el home.
     element: poner el componente que realmente va hacer eso.
     */}
     <Route path='/detalle' element ={<DetailViews/>} />
     <Route path='/login' element ={<LoginViews/>} />
     <Route path='/admin' element ={<AdminViews/>} />
     <Route path='*' element ={<ErrorViews/>} />
  </Routes>
  </main>
  <Footer />
  </BrowserRouter>;
};

export default Router;
