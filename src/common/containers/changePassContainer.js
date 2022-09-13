import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBIcon,
    MDBTypography,
    MDBSpinner
}
    from 'mdb-react-ui-kit';
import PasswordChecklist from "react-password-checklist";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import InputText from '../components/inputText'
import { required } from '../../utils/constraints';
import Otpinput from '../components/otpInput';
import ToastError from '../../common/components/toastError';
import { updatePass } from '../../store/actions/auth'
import Toasts from '../../common/components/toast';


function UpdatePass(props) {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        password: '',
        confirm: '',
    })

    const passwordInput = {
        placeholder: "password",
        type: "password",
        img: "https://img.icons8.com/color/32/000000/password.png",
        alt: "password",
        position: "mt-2",
        constraints: [required]
    }

    const passwordConfirm = {
        placeholder: "confirm",
        type: "password",
        img: "https://img.icons8.com/color/32/000000/password.png",
        alt: "password",
        position: "mt-2",
        constraints: [required]
    }

    const toast = {
        title: "success",
        body: "Password updated successfully",
        position: "top-center",
        place: "toast-position"
    }



    useEffect(() => {

        if (!props.currentUser || props.otp_res.length < 1 || props.update_pass.length > 1) {
            navigate(-1);
        }

    }, []);



    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const checkVals = Object.values(data).every((val) => val !== "");
        const checkPass = data.password === data.confirm;

        if (checkVals && checkPass) {
            setLoading(true);
            props.updatePass({ otp: props.otp_verified, password: data.password }).then((res) => {
                console.log(res)
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err)
            })
        }
    }

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column col-3 mt-5 " >

            {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={props.isdarkMode} />}
            {props.update_pass && <Toasts props={toast} isdarkMode={props.isdarkMode} />}

            <MDBTypography tag='div' className='display-6 mt-5 text-center mb-2 text-md'>
                {props.otp_verified.length < 1 ? "OTP verification" : "Change password"}
            </MDBTypography>

            <MDBTypography note noteColor='warning'>
                <strong>Note warning:</strong> Please try not to refresh the page , you will proceed from Zero .
            </MDBTypography>

            {props.otp_verified === "" ? <Otpinput /> :

                <><InputText data={passwordInput} handleChange={handleChange} value={data.password} />
                    <InputText data={passwordConfirm} handleChange={handleChange} value={data.confirm} />

                    <small className={` text-muted  text-center `}>Password check </small>
                    <div className="d-block mt-3 justify-content-center text-center">
                        <PasswordChecklist
                            className={` mt-1 text-opacity-50   text password-check d-flex justify-content-center"`}
                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                            minLength={8}
                            value={data.password}
                            valueAgain={data.confirm}
                            messages={{
                                minLength: "having 8 caracteres.",
                                specialChar: "having special caracteres",
                                number: "having a number",
                                capital: "having a capital letter",
                                match: "Passwords match .",
                            }}
                        />
                    </div>


                    <div className="text-center mt-3">
                        <MDBBtn className="mb-4 px-5 py-2" color="secondary" onClick={handleSubmit} size="sm" disabled={loading || props.update_pass.length > 1} >

                            {loading ? <> <MDBSpinner size='sm' role='status' tag='span' /> <span className='visually-hidden'>Loading...</span></> : <>Update password</>}


                        </MDBBtn>
                    </div>
                </>
            }

            <div className="text-center mt-2">
                <MDBBtn className="mb-4" color='light' onClick={() => navigate(-2)}>
                    <MDBIcon className='me-2' fas icon='arrow-left' />
                    Return
                </MDBBtn>
            </div>

        </MDBContainer >
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user,
        message: state.message.message,
        otp_res: state.auth.otp_success,
        otp_verified: state.auth.otp_verified,
        update_pass: state.auth.update_pass

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePass: (data) => dispatch(updatePass(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePass);