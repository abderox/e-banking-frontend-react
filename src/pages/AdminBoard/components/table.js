import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';
import SpinnerGrow from '../../../common/components/spinner'
import CheckStatus from '../components/checkStatus'
import ModalBoot from './modal';
import ToastError from '../../../common/components/toastError';
import Toasts from '../../../common/components/toast';
import { apiMessage } from "../../../store/actions";
import {  clearCreatedRes } from '../../../store/actions/backoffice';


function TableC(props) {

  

    const mappingStatus = new Map();
    mappingStatus.set("ACTIVE", "success");
    mappingStatus.set("DESACTIVE", "danger");
    mappingStatus.set("SUSPENDU", "warning");
    mappingStatus.set("BLOQUE", "dark");

    const toast = {
        title: "success",
        body: "Account created successfully !",
        position: "top-center",
        place: "toast-position"
    }

    useEffect(() => {
      props.clearMessage();
      props.clearCreatedRes();
    }, []);


  
   
    return (

        <>
         <div className="form-row row  ">
                <div className="col">
                    <label className="text-muted">Bank : <strong >{props.bankName}</strong></label>

                </div>
                <div className="col">
                    <label className="text-muted">Agence : #<strong>{props.codeAgence}</strong> </label>
                </div>
                <div className="col">
                    <label className="text-muted">ID Banker : #<strong>{props.identifiant}</strong></label>
                </div>
            </div>

        <div className="pt-2 mt-1 bg-color-table overflow-auto">
           
          
             {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={props.isdarkMode} />}
                {props.created && <Toasts props={toast} isdarkMode={props.isdarkMode} />}

            <button type="button" className="refresh-button" onClick={props.handleRefresh}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="reset" /></button>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        {props.tableHead.map((value, index) => {
                            return (<th key={index}>{value}</th>)
                        }
                        )}
                    </tr>
                </thead>
                <tbody>
                    {props.loading ? <tr><td colSpan={props.tableHead.length}><SpinnerGrow /></td></tr> :
                        props.tableData.map((data, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td><img src="https://img.icons8.com/ios-filled/20/40C057/hashtag-large.png" alt="img"/><span className="p-2 ">{data.identifiantClient}</span></td>
                                    <td><img src="https://img.icons8.com/pastel-glyph/26/40C057/email--v1.png"  alt="img"/><span className="p-2 ">{data.email}</span></td>
                                    <td ><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/24/40C057/external-telephone-contact-us-kmg-design-glyph-kmg-design.png"  alt="img"/><span className="p-2 " >{data.telephone}</span></td>
                                    <td><img src="https://img.icons8.com/sf-regular/26/40C057/region-code.png"/>{data.provinceAddress}</td>
                                    <td><img src="https://img.icons8.com/material-outlined/24/40C057/crossed-out-date.png"  alt="img"/><span className="p-2 ">{data.createdAt.substring(0, 10)}</span></td>
                                    <td><CheckStatus type={mappingStatus.get(data.status)} status={data.status} /></td>
                                    <td>
                                    <ModalBoot data={data.identifiantClient} key={index} handleRefresh={props.handleRefresh}/></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>

        </>
    )
}

const mapStateToProps = (state,ownedProps) => {
    return {
        loading: ownedProps.loading,
        tableData: ownedProps.tableData,
        tableHead: ownedProps.tableHead,
        handleRefresh: ownedProps.handleRefresh,
        created : state.backoffice.createdSuccess,
        message : state.message.message,
        isdarkMode : state.darkMode.isdarkMode,
        codeAgence: state.auth.user.codeAgence,
        identifiant: state.auth.user.identifiantBanquier,
        bankName: state.auth.user.bankName,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearCreatedRes: () => dispatch(clearCreatedRes()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableC)
