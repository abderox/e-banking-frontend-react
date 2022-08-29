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
import  Login  from './pages/LoginPage/containers/LoginAdminContainer';
import  LoginClient  from './pages/LoginPage/containers/LoginClientContainer';
import ClientBoardContainer from './pages/ClientBoard/containers/ClientBoardContainer';
import ClientBoardContainer2 from './pages/ClientBoard/containers/ClientBoardContainer2';
import AdminBoardContainer from './pages/AdminBoard/containers/AdminBoardContainer';
import ClientInfo from './pages/AdminBoard/containers/ClientInfo';
import Error404 from './common/containers/404';
import AdminProfile from './pages/ProfilePage/Containers/ProfileAdmin';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Provider store={store}>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="login-admin" element={<Login />}/>
      <Route path="admin-board" element={<AdminBoardContainer />}>
        <Route path="clients-operations" element={<ClientInfo />}/>
        <Route path="profile" element={<AdminProfile />}/>
      </Route>
      <Route path="login" element={<LoginClient />}/>
      <Route path="client-board" element={<ClientBoardContainer />}/>
      <Route path="profile" element={<ClientBoardContainer2 />}/>
    </Route>
    <Route path="*" element={<Error404 />} />
  </Routes>
    </Provider>
</BrowserRouter>
);


