import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {verifyOtp} from '../../store/actions/auth';
import { apiMessage } from "../../store/actions";

import {connect} from 'react-redux';


function Otpinput(props) {


    const [state, setState] = useState({
        otp1: "",
        otp2: "",
        otp3: "",
        otp4: "",
        otp5: "",
        otp6: "",
        disable: true
    }
    )



    const handleChange = (value1, event) => {

        setState({ ...state, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setState({ ...state, disable: true })

        const checkVals = Object.values(state).every((val) => val !== "");
        if (checkVals) {
            props.clearMessage();
            const value = Object.values(state).join("").substring(0, 6);
            console.log(value);
            props.verifyOtp({otp: value}).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })

           
        }

    }

    const inputfocus = (elmnt) => {
        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {

                elmnt.target.form.elements[next].focus()
            }
        }
        else {
            console.log("next");

            const next = elmnt.target.tabIndex;
            if (next < 6) {
                elmnt.target.form.elements[next].focus()
            }
            if (next === 5) {
                setState({ ...state, disable: false })
            }

        }

    }


    return (
        <form onSubmit={handleSubmit} className="d-block justify-content-between">

            <div className="d-flex justify-content-center align-content-center mb-2">
                <img src="https://img.icons8.com/external-parzival-1997-detailed-outline-parzival-1997/128/40C057/external-otp-online-lifestyle-parzival-1997-detailed-outline-parzival-1997.png" />
            </div>
            <div className="d-flex justify-content-between">
                <div className="otpContainer">

                    <input
                        name="otp1"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={state.otp1}
                        onChange={e => handleChange("otp1", e)}
                        tabIndex="1" maxLength="1" onKeyUp={e => inputfocus(e)}

                    />
                    <input
                        name="otp2"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={state.otp2}
                        onChange={e => handleChange("otp2", e)}
                        tabIndex="2" maxLength="1" onKeyUp={e => inputfocus(e)}

                    />
                    <input
                        name="otp3"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={state.otp3}
                        onChange={e => handleChange("otp3", e)}
                        tabIndex="3" maxLength="1" onKeyUp={e => inputfocus(e)}

                    />
                    <input
                        name="otp4"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={state.otp4}
                        onChange={e => handleChange("otp4", e)}
                        tabIndex="4" maxLength="1" onKeyUp={e => inputfocus(e)}
                    />

                    <input
                        name="otp5"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={state.otp5}
                        onChange={e => handleChange("otp5", e)}
                        tabIndex="5" maxLength="1" onKeyUp={e => inputfocus(e)}
                    />
                    <input
                        name="otp6"
                        type="text"
                        autoComplete="off"
                        className="otpInput"
                        value={state.otp6}
                        onChange={e => handleChange("otp6", e)}
                        tabIndex="6" maxLength="1" onKeyUp={e => inputfocus(e)}
                    />
                </div>
                <button className="Verify" type="submit" disabled={state.disable}>
                    <img src="https://img.icons8.com/external-tanah-basah-detailed-outline-tanah-basah/48/FFFFFF/external-check-user-interface-tanah-basah-detailed-outline-tanah-basah.png" />
                </button>
            </div>
        </form>
    );

}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyOtp: (data) => dispatch(verifyOtp(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Otpinput);