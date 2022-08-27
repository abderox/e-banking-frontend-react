import './static/css/App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Outlet } from "react-router-dom";
import Navbar from "./common/containers/NavBar"


function App(props) {



  return (
    <>
    <Navbar />
    
        <div className="container mt-3">
        <Outlet />
        </div>
      </>
   
  );
}



export default App;
