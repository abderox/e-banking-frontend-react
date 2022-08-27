/** 
 * @author  https://github.com/abderox
*/

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import React, { useState, useRef ,useEffect} from "react";
import { useNavigate } from 'react-router';
import { login } from "../../../store/actions/auth";
import * as ct from '../../../utils/constants';
import Toasts from '../../../common/components/toast';
import ToastError from '../../../common/components/toastError';
import moment from 'moment';
import { connect } from "react-redux";
import {email, required} from '../../../utils/constraints';

const URL = ct.default;


const Login = (props) => {
    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [dateToFormat, setTime] = useState(moment().format('LTS'));
    
    const toast = {
        title : "Disclaimer",
        body : "Please make sure to log out whenever you get done .",
        position : "top-center",
        place : "toast-position-2"
    }
    
    const toastInfo = {
        title : "Info",
        body : "The session lasts for 1 hour each time you log in.",
        position : "top-center",
        place : "toast-position"
    }
    

    const updateTime = () => {
      return moment().format('LTS')
    }

    setInterval(updateTime, 1000)
  
    useEffect(() => {
      let time = updateTime;
      setTime(
        time
      );
    },[]);

   
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            props.signing(username, password)
                .then(() => {
                    navigate("/admin-board");
                    // window.location.reload();
                })
                .catch(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };


    if (props.isLoggedIn) {
        return navigate("/admin-board");
    }
    return (

        <div className="col-md-12 border-up">

            <Toasts props={toast} date={dateToFormat}  />
            <Toasts props={toastInfo} date={dateToFormat}  />

            {props.message && (
                <ToastError props={JSON.parse(props.message)}  date={dateToFormat} />
            )}
            <div className="card card-container ">
                <img
                    src="https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/128/FD7E14/external-login-online-learning-fauzidea-detailed-outline-fauzidea.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
                            id="username"
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            placeholder="Email"
                            onChange={onChangeUsername}
                            validations={[required, email]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group d-flex justify-content-center">
                        <button className="button-login" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

const mapToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        message: state.message.message
    };
}

const mapToDispatch = (dispatch) => {
    return {
        signing: (username, password) => dispatch(login(username, password, URL.SIGN_IN_URL_ADMIN))
    }
}

export default connect(mapToProps, mapToDispatch)(Login);




