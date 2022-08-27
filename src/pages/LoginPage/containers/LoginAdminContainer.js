import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router';
import { login } from "../../../store/actions/auth";
import AlertDismissibleExample from "../../../common/components/error-alert"
import * as ct from '../../../utils/constants';
import { connect } from "react-redux";
const URL = ct.default;

const required = (value) => {
    if (!value) {
        return (

            <small class="text-danger ">This field is required !</small>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <small class="text-danger ">This is not an email format !</small>
        );
    }
};
const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();


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

        <div className="col-md-12">
            {props.message && (
                <AlertDismissibleExample props={JSON.parse(props.message)} />
            )}
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input
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




