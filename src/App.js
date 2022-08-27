import './static/css/App.css';
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { connect } from "react-redux";
import { logout } from "./store/actions/auth";
import {Link } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router';


function App(props) {

  const navigate = useNavigate();


  const logOut = () => {
    props.logout();
    navigate("/login");
    
  };

  return (
    
      <div className="App">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <li className="navbar-brand list-unstyled">
            BankBeta
          </li>
          {props.currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  {props.currentUser.emailUser}
                </Link>
              </li>
              <li className="nav-item" onClick={logOut}>
                  <button className="btn btn-danger">Logout</button>
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

const mapToStateProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
}

const mapToDispatchProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
}

export default connect(mapToStateProps, mapToDispatchProps)(App);
