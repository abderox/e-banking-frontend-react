/**
 * @author  https://github.com/abderox
 */

import React from 'react';
import { useState, useRef } from "react"
import { useNavigate } from 'react-router';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import Switchtoggle from '../components/switch-toggle'
import "../../static/css/Navbar.css"
import { logout } from "../../store/actions/auth";




export function Navbar(props) {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const target = useRef(null);

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
                                <Link to={"/profile"} className="nav-item mt-1 pt-2">
                                    <a href="#"> {props.currentUser.emailUser} </a>
                                </Link>
                            </li>
                            <li className="nav-item" ref={target} onClick={() => setShow(!show)}>
                                <a href="#" className="logout-button" >
                                    <img src="https://img.icons8.com/color-glass/48/000000/verified-account.png" alt="connected" />
                                </a>
                            </li>
                            <Overlay target={target.current} show={show} placement="left">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props} onClick={logOut}>
                                        Click the literally me to log out !
                                    </Tooltip>
                                )}
                            </Overlay>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li>
                                <Switchtoggle />
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