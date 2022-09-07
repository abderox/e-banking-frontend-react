import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux';
import {Navigate} from 'react-router'
import TableC from "../components/accountsClient";
import { getAccountsPerClient } from '../../../store/actions/backoffice'
import SearchInput from '../components/searchInputCmoptes'
import authApi from '../../../api/auth/auth.api';
import ToastError from '../../../common/components/toastError';




const CompteService = ( props ) => {

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [formInputData, setformInputData] = useState(
        {
            mobile:'',
            identity:''
        })
   

    const headNames = [
        "N°",
        "rib",
        "intituleCompte",
        "Solde (MAD)",
        "Blocked ?",
        "Action"
    ];

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (authApi.NotvalidJwt()) {
            alert("Your session has expired, please login again")
            props.logout(URL.SIGN_OUT_URL_ADMIN);
            return <Navigate to={"/login-admin"} replace />
        }
        console.log(formInputData)

        if(formInputData.identity!=="" || formInputData.mobile!==""){
            props.getAccountsPerClient(formInputData.identity,formInputData.mobile).then((res) => {
                setTableData(res.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }


    }

    let handleChangeSearch = (e) => {
        const search = e.target.value;
        setformInputData({...formInputData, [e.target.name]:search})
    }
 
    let resetForm = () =>{
        setformInputData({
            mobile:'',
            identity:''
        })
    }

   

    return (
        <>
            <div className="container mt-5 ">
                {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={true} />}
            

                <div className="row">
                    <div className="col-sm-12">

                        <SearchInput handleChange={handleChangeSearch} formInputData={formInputData} handleSubmit={handleSubmit} resetForm={resetForm} loading={loading} />
                        
                        <div className="row  justify-content-between d-flex overflow-auto max-height-bn-table ">
                        <TableC tableData={tableData} tableHead={headNames} />
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

const mapStateToProps = (state) => {
    return {
        accountsClient : state.backoffice.accountsPerClient,
        message : state.message.message,
        isdarkMode: state.darkMode.isdarkMode,
    }}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccountsPerClient: (id,mobile) => dispatch(getAccountsPerClient(id,mobile)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompteService);