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
import * as type from '../../utils/constants';
const URL = type.default;


export function Navbar(props) {
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const board = props.isAdmin ? "/admin-board/profile" : "/client-board/profile";
    const services = "/client-board/services";

    const logOut = () => {
        props.logout(props.isAdmin ? URL.SIGN_OUT_URL_ADMIN : URL.SIGN_OUT_URL_CLIENT);
        navigate(props.isAdmin ? "/login-admin" : "/login");

    };

    return (
        <nav className={`navigation  ${props.isdarkMode ? "" : "dark-nav"} `}>
            <Link to={"/"} className={`brand-name ${props.isdarkMode ? "" : "dark-brand"}`}>
                <img src="https://img.icons8.com/color/48/000000/bank.png" alt="brand" />
                β-{props.currentUser ? props.currentUser.bankName : "Bank"}
            </Link>
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
                            {props.isClient &&

                                <li >
                                    <Link to={services} className="nav-item mt-1 pt-2 link-nav">
                                        services
                                    </Link>
                                </li>
                            }

                            <li >
                                <Link to={board} className="nav-item mt-1 pt-2 link-nav">
                                    {props.currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item " ref={target} onClick={() => setShow(!show)}>
                                <button className="logout-button " >
                                    <img src="https://img.icons8.com/color-glass/48/000000/verified-account.png" alt="connected" className="img-logout" />
                                </button>
                            </li>
                            <Overlay target={target.current} show={show} placement="bottom">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props} onClick={logOut}>
                                        Click the literally me to log out !
                                    </Tooltip>
                                )}
                            </Overlay>
                            <li className="mt-3 mr-2" >
                                <Switchtoggle />
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link link-nav mt-1">
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
        isdarkMode: state.darkMode.isdarkMode,
        isAdmin: state.auth.isAdmin,
        isClient: state.auth.isClient,
    };
}

const mapToDispatchProps = (dispatch) => {
    return {
        logout: (url) => dispatch(logout(url)),
    };
}

export default connect(mapToStateProps, mapToDispatchProps)(Navbar);