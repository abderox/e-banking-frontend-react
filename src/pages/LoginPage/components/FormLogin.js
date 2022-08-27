import React from 'react'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import  { useState, useRef } from "react";
import { useNavigate } from 'react-router';
import { connect } from "react-redux";
import { email, required } from '../../../utils/constraints';
import InputText from '../components/inputText';
import ButtonLogin from '../components/buttonLogin';
import { login } from "../../../store/actions/auth";
import * as ct from '../../../utils/constants';
const URL = ct.default;


function FormLogin(props) {

    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    
    const userNameInput = {
        placeholder : "Email",
        type : "text",
        img: "https://img.icons8.com/external-flat-andi-nur-abdillah/32/000000/external-Fingerprint-security-and-protection-(flat)-flat-andi-nur-abdillah.png",
        alt : "email",
        position : "mt-5",
        constraints : [email, required]
    }

    const passwordInput = {
        placeholder : "Password",
        type : "password",
        img: "https://img.icons8.com/color/32/000000/password.png",
        alt : "password",
        position : "mt-2",
        constraints : [required]
    }


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
    
  return (
    <div className="card card-container ">
                <img
                    src="https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/128/FD7E14/external-login-online-learning-fauzidea-detailed-outline-fauzidea.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleLogin} ref={form}>

                    <InputText props={userNameInput} handleChange={onChangeUsername} value={username} />
                    <InputText props={passwordInput} handleChange={onChangePassword} value={password} />
                    <ButtonLogin loading={loading}/>

                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
  )
}

const mapToDispatch = (dispatch) => {
    return {
        signing: (username, password) => dispatch(login(username, password, URL.SIGN_IN_URL_ADMIN))
    }
}

export default connect(null, mapToDispatch)(FormLogin);