/**
 * @author  https://github.com/abderox
 */

import React from 'react';
import { useState } from "react"
import { useNavigate } from 'react-router';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "../../static/css/Navbar.css"
import { logout } from "../../store/actions/auth";




export function Navbar(props) {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const navigate = useNavigate();


    const logOut = () => {
        props.logout();
        navigate("/login");

    };

    return (
        <nav className="navigation">
            <a href="/" className="brand-name">
                <img src="https://img.icons8.com/color/48/000000/bank.png" alt="brand" />
                β-Bank
            </a>
            <button
                className="hamburger"
                onClick={() => {
                    setIsNavExpanded(!isNavExpanded)
                }}
            >

            </button>
            <div
                className={
                    isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                }
            >
                <ul>
                    {props.currentUser ? (
                        <>
                   <li >
                   <Link to={"/login"} className="">
                    <a> {props.currentUser.emailUser} </a>
                   </Link>
                  </li>
                  <li className="nav-item" onClick={logOut}>
                     <a >Logout</a>
                 </li> 
                  </>
                    ):(
                        <>
                          <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                              Login
                            </Link>
                          </li>
                          
            
                        </>
                      )}
                   
                </ul>
            </div>
        </nav>
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

export default connect(mapToStateProps, mapToDispatchProps)(Navbar);