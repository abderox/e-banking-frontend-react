import React from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom'
import FormInput from "../../../common/components/forminput";
import TableC from "../../../common/components/table";
import { connect } from "react-redux";
import Form from "react-validation/build/form";
import ToastError from '../../../common/components/toastError';
import Toasts from '../../../common/components/toast';
import { apiMessage } from "../../../store/actions";
import { registerClient, clearCreatedClient } from "../../../store/actions/backoffice"
import authApi from '../../../api/auth/auth.api';
import { logout } from "../../../store/actions/auth";
import * as type from '../../../utils/constants';
const URL = type.default;


const ClientRegistration = (props) => {


    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState([])
    const navigate = useNavigate();
    const codeAgence = props.user.codeAgence;

    const headNames = [
        "N°",
        "email",
        "telephone",
        "typepiece",
        "N° piece",
        "province",
        "street",
        "statusProfile",
        "action"
    ]

    const [formInputData, setformInputData] = useState(
        {
            codeAgence: props.user.codeAgence,
            email: '',
            lastName: '',
            firstName: '',
            telephone: '',
            rue: '',
            numPieceIdentiteClient: '',
            typepiece: '',
            metierClient: '',
            date_birth: '2000-01-01',
            provincAddress: '',
            villeAddress: '',
            regionAddress: '',
            statusProfile: '',
            familystatus: '',
        }
    );

    const toast = {
        title: "success",
        body: "Client registered successfully !",
        position: "top-center",
        place: "toast-position"
    }




    const handleChange = (evnt) => {
        const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
        setformInputData(newInput)
    }

    const resetForm = () => {
        const emptyInput = {
            codeAgence: props.user.codeAgence,
            email: '',
            lastName: '',
            firstName: '',
            telephone: '',
            rue: '',
            numPieceIdentiteClient: '',
            metierClient: '',
            date_birth: '2000-01-01',
            provincAddress: '',
            villeAddress: '',
            regionAddress: '',
        }
        setformInputData(emptyInput)
    }

    const handleSubmit = (evnt) => {
        evnt.preventDefault();

        if (authApi.NotvalidJwt()) {
            alert("Your session has expired, please login again")
            props.logout(URL.SIGN_OUT_URL_ADMIN);
            return <Navigate to={"/login-admin"} replace />
        }

        const codeAgenceAdded = (data) => ({ ...data, codeAgence: props.user.codeAgence })
        setformInputData(codeAgenceAdded)
        let arrayValidation = [];
        const checkEmptyInput = !Object.values(formInputData).some(el => el === '')
        Object.entries(formInputData).forEach(([el, val]) => {
            switch (el) {
                case "telephone":
                    arrayValidation.push(/^[0-9]{10}$/.test(val))
                    break;
                case "numPieceIdentiteClient":
                    arrayValidation.push(/^[A-Za-z0-9]*$/.test(val))
                    break;
                case "date_birth":
                    arrayValidation.push(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(val))
                    break;
                case "provincAddress":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;
                case "villeAddress":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;
                case "regionAddress":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;
                case "firstName":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;
                case "lastName":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;
                case "email":
                    arrayValidation.push(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val))
                    break;
            }
        })
    

        if (checkEmptyInput && !props.jwtExpired && arrayValidation.every(el => el === true)) {

            setLoading(true);
            props.clearCreatedClient();
            props.clearMessage();

            props.registerClient(formInputData)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    const newData = (data) => ([...data, formInputData])
                    setTableData(newData);
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
                {props.createdClient && <Toasts props={toast} isdarkMode={props.isdarkMode} />}
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
        createdClient: state.registerClient.createdClient,
        message: state.message.message,
        isdarkMode: state.darkMode.isdarkMode,
        isLoggedIn: state.auth.isLoggedIn,
        jwtExpired: state.auth.jwtExpired
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        registerClient: (data) => dispatch(registerClient(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearCreatedClient: () => dispatch(clearCreatedClient()),
        logout: (url) => dispatch(logout(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientRegistration);