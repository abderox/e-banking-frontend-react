import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom'
import FormInput from "../components/forminput";
import TableC from "../components/table";
import { connect } from "react-redux";
import ToastError from '../../../common/components/toastError';
import Toasts from '../../../common/components/toast';
import SpinnerGrow from '../../../common/components/spinner'
import { apiMessage } from "../../../store/actions";
import { addBenificiareToClient, getBenificiaresClient } from "../../../store/actions/frontoffice"
import { clearCreatedRes } from "../../../store/actions/backoffice"
import authApi from '../../../api/auth/auth.api';
import { logout } from "../../../store/actions/auth";
import * as type from '../../../utils/constants';
const URL = type.default;


const AddBenificiare = (props) => {


    const [loading, setLoading] = useState(false);
    const [loading_, setLoading_] = useState(false);
    const [tableData, setTableData] = useState([])


    const headNames = [
        "N°",
        "Intitule virement",
        "Nature",
        "Nom beneficiaire",
        "RIB",
        "Periodicity",
        "Action"
    ]

    const [formInputData, setformInputData] = useState(
        {
            intituleVirement: '',
            nom: '',
            rib: '',
            nature: 'DOMESTIQUE',
            periodicity: 'O'

        }
    );

    const toast = {
        title: "success",
        body: "Benificaire registered successfully !",
        position: "top-center",
        place: "toast-position"
    }

    useEffect(() => {
        props.clearCreatedRes();
        props.clearMessage();
        if (props.benificiaresClient.length === 0) {
            handleRefresh();
        }
        else {
            setTableData(props.benificiaresClient);
        }
    }, [])




    let handleRefresh = () => {
        console.log("refreshing");
        setLoading_(true);

        props.getBenificiaresClient().then((res) => {
            setTableData(res.data);
            setLoading_(false);
        }).catch((err) => {
            console.log(err);
            setLoading_(false);
        })

    }

    // let handleRefreshButton = () => {

    //     if (props.benificiaresClient.length === 0) {
    //         handleRefresh();
    //     }
    //     else {
    //         setTableData(props.benificiaresClient);
    //         setLoading(false);
    //     }
    // }




    const handleChange = (evnt) => {
        const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
        setformInputData(newInput)
    }

    const resetForm = () => {
        const emptyInput = {
            intituleVirement: '',
            nom: '',
            rib: '',
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


        let arrayValidation = [];
        const checkEmptyInput = !Object.values(formInputData).some(el => el === '')
        Object.entries(formInputData).forEach(([el, val]) => {
            switch (el) {
                case "ribBenificiaire":
                    arrayValidation.push(/^[0-9]{24}$/.test(val))
                    break;
                case "intituleVirementBenificiaire":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;
                case "nomBenificiaire":
                    arrayValidation.push(/^[a-zA-Z\s]*$/.test(val))
                    break;

            }
        })


        if (checkEmptyInput && !props.jwtExpired && arrayValidation.every(el => el === true)) {

            setLoading(true);
            props.clearCreatedRes();
            props.clearMessage();

            console.log(formInputData);

            props.addBenificiareToClient(formInputData)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    handleRefresh();
                    resetForm();
                }).catch(err => {
                    console.log(err)
                    setLoading(false);
                }
                )
        }




    }
    return (
        <>
            <div className="container mt-5 ">
                {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={true} />}
                {props.created && <Toasts props={toast} isdarkMode={props.isdarkMode} />}

                <div className="row">
                    <div className="col-sm-12">

                        <FormInput handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit} resetForm={resetForm} loading={loading} />
                        <div className="row ">
                            <div className="col-md-2">
                                <button type="button" className="refresh-button" onClick={handleRefresh}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="refresh" /></button>
                            </div>
                        </div>
                        <div className="row  justify-content-between d-flex overflow-auto max-height-bn-table ">

                            {loading_ ?
                                <div className="d-block justify-content-center align-content-center mt-5">
                                    <SpinnerGrow />
                                </div>
                                :
                                <TableC tableData={tableData} tableHead={headNames} handleRefresh={handleRefresh} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state, ownedProps) => {
    return {
        user: state.auth.user,
        created: state.backoffice.createdSuccess,
        message: state.message.message,
        isdarkMode: state.darkMode.isdarkMode,
        isLoggedIn: state.auth.isLoggedIn,
        jwtExpired: state.auth.jwtExpired,
        benificiaresClient: state.frontoffice.benificiaresClient,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addBenificiareToClient: (data) => dispatch(addBenificiareToClient(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearCreatedRes: () => dispatch(clearCreatedRes()),
        logout: (url) => dispatch(logout(url)),
        getBenificiaresClient: () => dispatch(getBenificiaresClient()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBenificiare);