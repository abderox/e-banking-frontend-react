import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import FormInput from "../components/inputVirement";
import TableC from "../components/tableVirements";
import { connect } from "react-redux";
import ToastError from '../../../common/components/toastError';
import Toasts from '../../../common/components/toast';
import { apiMessage } from "../../../store/actions";
import { addBenificiareToClient, makeTransferTo,cleartransferCreated } from "../../../store/actions/frontoffice"
import { clearCreatedRes } from "../../../store/actions/backoffice"
import authApi from '../../../api/auth/auth.api';
import { logout } from "../../../store/actions/auth";
import * as type from '../../../utils/constants';
const URL = type.default;


const MakeTransfer = (props) => {


    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([])


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

        }
    );

    const toast = {
        title: "success",
        body: "The transaction was successfully completed , check your transactions !",
        position: "top-center",
        place: "toast-position"
    }


    useEffect(() => {
        props.cleartransferCreated();
        props.clearMessage();
    },[])


    const handleChange = (e) => {

        let val = e.target.value;
        const newInput = (data) => ({ ...data, [e.target.name]: val })
        setformInputData(newInput)
    }

    const resetForm = () => {
        const emptyInput = {
            ribEmetteur: '',
            ribBenificiaire: '',
            montant: '0',
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
        formInputData.montant = parseFloat(formInputData.montant);
        const checkEmptyInput = !Object.values(formInputData).some(el => el === '')
        console.log(formInputData)

        if (checkEmptyInput && !props.jwtExpired) {

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
                }).catch(err => {
                    console.log(err)
                    setLoading(false);
                }
                )
        }

    }
    return (
        <React.Fragment>
            <div className="container mt-5 ">
                {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={true} />}
                {props.transferCreated && <Toasts props={toast} isdarkMode={props.isdarkMode} />}

                <div className="row">
                    <div className="col-sm-12">

                        <FormInput handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit} resetForm={resetForm} loading={loading} />
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
        transferCreated: state.frontoffice.transferCreated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addBenificiareToClient: (data) => dispatch(addBenificiareToClient(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearCreatedRes: () => dispatch(clearCreatedRes()),
        logout: (url) => dispatch(logout(url)),
        makeTransferTo: (data) => dispatch(makeTransferTo(data)),
        cleartransferCreated: () => dispatch(cleartransferCreated())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeTransfer);