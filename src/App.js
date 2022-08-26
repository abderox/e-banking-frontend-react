import './static/css/App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/actions/auth";
import {Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";

function App() {

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
    
  };

  return (
    
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <li className="navbar-brand list-unstyled">
            BankBeta
          </li>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <button  className="nav-link" onClick={logOut}>
                  LogOut
                </button>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

            </div>
          )}
        </nav>
        <div className="container mt-3">
        <Outlet />
        </div>
      </div>
   
  );
}

export default App;
