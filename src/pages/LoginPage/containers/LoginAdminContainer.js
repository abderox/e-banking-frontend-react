import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import React, { useState, useRef ,useEffect} from "react";
import { useNavigate } from 'react-router';
import { login } from "../../../store/actions/auth";
import AlertDismissibleExample from "../../../common/components/error-alert"
import * as ct from '../../../utils/constants';
import Toasts from '../../../common/components/toast';
import ToastError from '../../../common/components/toastError';
import moment from 'moment';
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
    const toast = {
        title : "Disclaimer",
        body : "Please make sure to log out after you get done",
        position : "top-center"
    }
    let navigate = useNavigate();
    const [dateToFormat, setdateToFormat] = useState(moment().format('LTS'));

    const updateTime = () => {
      let clock = moment().format('LTS')
    }
    setInterval(updateTime, 1000)
  
    useEffect(() => {
      let time = updateTime;
      setdateToFormat(
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




