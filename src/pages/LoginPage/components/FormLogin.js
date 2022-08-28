import React from 'react'
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router';
import { connect } from "react-redux";
import PasswordChecklist from "react-password-checklist";
import { email, required } from '../../../utils/constraints';
import InputText from '../components/inputText';
import ButtonLogin from '../components/buttonLogin';
import { login } from "../../../store/actions/auth";
import * as ct from '../../../utils/constants';
import PopoverPositioned from '../../../common/components/popover';
const URL = ct.default;


function FormLogin(props) {

    let navigate = useNavigate();
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("")
    const [hidden, setHidden] = useState(true);
    const [mQuery, setMQuery] = useState({
        matches: window.innerWidth > 768 ? true : false,
    });

    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 768px)");
        mediaQuery.addListener(setMQuery);
        return () => mediaQuery.removeListener(setMQuery);
    }, []);

    useEffect(() => {
        if (window.location.pathname.includes('admin')) {
            setHidden(false);
        }
    }, [window.location.pathname]);

    const userNameInput = {
        placeholder: "Email",
        type: "text",
        img: "https://img.icons8.com/external-flat-andi-nur-abdillah/32/000000/external-Fingerprint-security-and-protection-(flat)-flat-andi-nur-abdillah.png",
        alt: "email",
        position: "mt-5",
        constraints: [email, required]
    }

    const passwordInput = {
        placeholder: "Password",
        type: "password",
        img: "https://img.icons8.com/color/32/000000/password.png",
        alt: "password",
        position: "mt-2",
        constraints: [required]
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
                    navigate(props.url);
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
        <div className={`card card-container ${mQuery && mQuery.matches ? "" : "more-high"}`}>
            <img
                src={mQuery && mQuery.matches ? "https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/128/FD7E14/external-login-online-learning-fauzidea-detailed-outline-fauzidea.png" : "https://img.icons8.com/external-fauzidea-detailed-outline-fauzidea/128/40C057/external-login-online-learning-fauzidea-detailed-outline-fauzidea.png"}
                alt="profile-img"
                className="profile-img-card"
            />
            <Form onSubmit={handleLogin} ref={form}>

                <InputText props={userNameInput} handleChange={onChangeUsername} value={username} />
                <InputText props={passwordInput} handleChange={onChangePassword} value={password} />
                <div className="d-block mt-3 justify-content-center text-center">
                <small className="text-muted  text-center" >Password health check </small>
                <PasswordChecklist
                    className="mt-1 text-opacity-50 text-muted text password-check d-flex justify-content-center"
                    rules={["minLength", "specialChar", "number", "capital"]}
                    minLength={8}
                    value={password}
                    messages={{
                        minLength: "having 8 caracteres.",
                        specialChar: "having special caracteres",
                        number: "having a number",
                        capital: "having a capital letter",
                    }}
                />
                </div>
                <ButtonLogin loading={loading} />
                {hidden &&
                    <PopoverPositioned name={"If you are a banker or an admin go here !"} url={"/login-admin"} />
                }
                <CheckButton style={{ display: "none" }} ref={checkBtn} />

            </Form>
        </div>
    )
}



const mapToProps = (state, ownedProps) => {
    return {
        url: ownedProps.to
    }
}
const mapToDispatch = (dispatch) => {
    return {
        signing: (username, password) => dispatch(login(username, password, URL.SIGN_IN_URL_ADMIN))
    }
}

export default connect(mapToProps, mapToDispatch)(FormLogin);