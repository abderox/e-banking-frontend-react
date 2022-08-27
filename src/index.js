import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from "react-redux";
import store from "./store/store";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import Navbar from './common/containers/NavBar';
import  Login  from './pages/LoginPage/containers/LoginAdminContainer';
import  LoginClient  from './pages/LoginPage/containers/LoginClientContainer';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="login-admin" element={<Login />}/>
      <Route path="admin-board" element={<Navbar />}/>
      <Route path="login" element={<LoginClient />}/>
      <Route path="client-board" element={<Navbar />}/>
    </Route>
  </Routes>
    </Provider>
</BrowserRouter>
);


