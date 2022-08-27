/** 
 * @author  https://github.com/abderox
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { login } from "../../../store/actions/auth";
import { apiMessage } from "../../../store/actions";
import * as ct from '../../../utils/constants';
import Toasts from '../../../common/components/toast';
import ToastError from '../../../common/components/toastError';
import moment from 'moment';
import { connect } from "react-redux";
import FormLogin from "../components/FormLogin";

const URL = ct.default;


const LoginClient = (props) => {
    let navigate = useNavigate();
    
    const [dateToFormat, setTime] = useState(moment().format('LTS'));

    const toastInfo = {
        title: "Disclaimer",
        body: "Please make sure to log out whenever you get done .",
        position: "top-center",
        place: "toast-position-2"
    }

    const toast = {
        title: "Howdy admin !",
        body: "Friendly reminder : The session lasts for 1 hour each time you log in.",
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

    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/admin-board");
            props.clearMessage();
        }
    } , [props.isLoggedIn]);

   
    return (

        <div className="col-md-12 border-up ">

            <Toasts props={toast} date={dateToFormat} />
            <Toasts props={toastInfo} date={dateToFormat} />

            {props.message && (
                <ToastError props={JSON.parse(props.message)} date={dateToFormat} />
            )}
            <FormLogin to={"/admin-board"} />
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
        signing: (username, password) => dispatch(login(username, password, URL.SIGN_IN_URL_CLIENT)),
        clearMessage : ()=> dispatch(apiMessage.clearMessage())
    }
}

export default connect(mapToProps, mapToDispatch)(LoginClient);




