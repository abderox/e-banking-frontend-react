import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import FormInput from "../components/inputVirement";
import TableC from "../components/tableVirements";
import { connect } from "react-redux";
import ToastError from '../../../common/components/toastError';
import Toasts from '../../../common/components/toast';
import { apiMessage } from "../../../store/actions";
import {
    addBenificiareToClient,
    makeTransferTo,
    cleartransferCreated,
    clearAll,
    clearOtpResponse
} from "../../../store/actions/frontoffice"
import { clearCreatedRes } from "../../../store/actions/backoffice"
import authApi from '../../../api/auth/auth.api';
import { logout } from "../../../store/actions/auth";
import { montant_, rib } from "../../../utils/constraints"
import { MDBBtn, MDBSpinner } from 'mdb-react-ui-kit';
import Otpinput from '../../../common/components/otpInput';
import { sendOtpTransfer } from '../../../store/actions/frontoffice'
import * as type from '../../../utils/constants';
const URL = type.default;


const MakeTransfer = (props) => {


    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([])
    const [disable, setDisable] = useState(false);


    const headNames = [
        "N°",
        "Rib sender",
        "Rib receiver",
        "Type",
        "montant",
        "date execution",
    ]

    const [formInputData, setformInputData] = useState(
        {
            ribEmetteur: '',
            ribBenificiaire: '',
            montant: '0',
            typeVirement: 'UNITAIRE',
            dateExecution: '',
            applyPeriodicity: false,
            ribplusperiod: 'B,O',
            otp: ''

        }
    );

    const toast = {
        title: "success",
        body: "The transaction was successfully completed , check your transactions !",
        position: "top-center",
        place: "toast-position"
    }
    const toast_otp = {
        title: "success",
        body: props.otp_sent,
        position: "top-center",
        place: "toast-position"
    }


    useEffect(() => {
        props.cleartransferCreated();
        props.clearMessage();
    }, [])


    const handleChange = (e) => {

        let val = e.target.value;
        const newInput = (data) => ({ ...data, [e.target.name]: val })
        setformInputData(newInput)
    }

    let handleCheck = () => {
        setformInputData({ ...formInputData, applyPeriodicity: !formInputData.applyPeriodicity })
    }


    const resetForm = () => {
        const emptyInput = {
            ribplusperiod: 'B,O',
            typeVirement: 'UNITAIRE',
            montant: '0',
            applyPeriodicity: false,

        }
        setformInputData(emptyInput)
    }

    const handleSubmit = (evnt) => {
        evnt.preventDefault();


        if (authApi.NotvalidJwt()) {
            alert("Your session has expired, please login again")
            props.logout(URL.SIGN_OUT_URL_CLIENT);
            return <Navigate to={"/login"} replace />
        }


        formInputData.otp = props.otp_verified;
        formInputData.montant = parseFloat(formInputData.montant);
        formInputData.applyPeriodicity = !(formInputData.ribplusperiod.split(',')[1] === 'O') && formInputData.applyPeriodicity;
        formInputData.ribBenificiaire = formInputData.ribplusperiod.split(',')[0];

        const checkEmptyInput = !Object.values(formInputData).some(el => el === '')
        const inputsValidation = [];

        Object.entries(formInputData).forEach(([key, val]) => {
            switch (key) {
                case "ribEmetteur":
                    inputsValidation.push(/^[0-9]{24}$/.test(val))
                    break;
                case "ribBenificiaire":
                    inputsValidation.push(/^[0-9]{24}$/.test(val))
                    break;
                case "montant":
                    inputsValidation.push(/\d*$/.test(val))
                    break;
            }
        })

        console.log(inputsValidation)
        if (checkEmptyInput && !props.jwtExpired && inputsValidation.every(el => el === true)) {

            console.log(formInputData)

            setLoading(true);
            props.clearMessage();
            props.cleartransferCreated();
            const newData = (data) => ([...data, formInputData])

            props.makeTransferTo(formInputData)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    setTableData(newData)
                    resetForm();
                    setTimeout(() => {
                        setDisable(false);
                        props.clearOtpResponse();
                    }, 2000)

                }).catch(err => {
                    console.log(err)
                    setLoading(false);
                }
                )
        }

    }


    const handleSendOtp = () => {
        setLoading(true);
        props.sendOtpTransfer().then((res) => {
            console.log(res)
            setLoading(false);
            setDisable(true);
        }).catch((err) => {
            setLoading(false);
        })
    }

    return (
        <React.Fragment>
            <div className="container mt-5 ">
                {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={true} />}
                {props.transferCreated && <Toasts props={toast} isdarkMode={props.isdarkMode} />}
                {props.otp_sent.length > 0 && <Toasts props={toast_otp} isdarkMode={props.isdarkMode} />}

                <div className="row">
                    <div className="col-sm-12">
                        {props.otp_sent === "" ?
                            <MDBBtn size='sm' rounded color='secondary' className="text-center mb-3" onClick={handleSendOtp} disabled={disable}>
                                {loading ?
                                    <MDBSpinner size='sm' role='status' tag='span' /> :
                                    <>New transfer</>}
                            </MDBBtn> :
                            <Otpinput isTransfer={true} />}

                        {props.otp_verified &&
                            <FormInput
                                handleChange={handleChange}
                                formInputData={formInputData}
                                handleSubmit={handleSubmit}
                                resetForm={resetForm}
                                loading={loading}
                                handleCheck={handleCheck} />}

                        <TableC tableData={tableData} tableHead={headNames} />

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        created: state.backoffice.createdSuccess,
        message: state.message.message,
        isdarkMode: state.darkMode.isdarkMode,
        isLoggedIn: state.auth.isLoggedIn,
        jwtExpired: state.auth.jwtExpired,
        transferCreated: state.frontoffice.transferCreated,
        otp_verified: state.frontoffice.otp_verified_transfer,
        otp_sent: state.frontoffice.otp_succ
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addBenificiareToClient: (data) => dispatch(addBenificiareToClient(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearCreatedRes: () => dispatch(clearCreatedRes()),
        logout: (url) => dispatch(logout(url)),
        makeTransferTo: (data) => dispatch(makeTransferTo(data)),
        cleartransferCreated: () => dispatch(cleartransferCreated()),
        sendOtpTransfer: () => dispatch(sendOtpTransfer()),
        clearAll: () => dispatch(clearAll()),
        clearOtpResponse: () => dispatch(clearOtpResponse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeTransfer);