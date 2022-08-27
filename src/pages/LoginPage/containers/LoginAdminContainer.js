/** 
 * @author  https://github.com/abderox
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { login } from "../../../store/actions/auth";
import * as ct from '../../../utils/constants';
import Toasts from '../../../common/components/toast';
import ToastError from '../../../common/components/toastError';
import moment from 'moment';
import { connect } from "react-redux";
import FormLogin from "../components/FormLogin";

const URL = ct.default;


const Login = (props) => {
    let navigate = useNavigate();
    
    const [dateToFormat, setTime] = useState(moment().format('LTS'));

    const toast = {
        title: "Disclaimer",
        body: "Please make sure to log out whenever you get done .",
        position: "top-center",
        place: "toast-position-2"
    }

    const toastInfo = {
        title: "Info",
        body: "The session lasts for 1 hour each time you log in.",
        position: "top-center",
        place: "toast-position"
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
    }, []);



    if (props.isLoggedIn) {
        return navigate("/admin-board");
    }

    return (

        <div className="col-md-12 border-up">

            <Toasts props={toast} date={dateToFormat} />
            <Toasts props={toastInfo} date={dateToFormat} />

            {props.message && (
                <ToastError props={JSON.parse(props.message)} date={dateToFormat} />
            )}
            <FormLogin />
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




