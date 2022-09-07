import React,{useEffect} from 'react'
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table';
import SpinnerGrow from '../../../common/components/spinner'
import CheckStatus from './checkStatus'
import ToastError from '../../../common/components/toastError';
import Toasts from '../../../common/components/toast';


function TableC(props) {

  

    const mappingStatus = new Map();
    mappingStatus.set(false, "success");
    mappingStatus.set(true, "danger");
   
    const toast = {
        title: "success",
        body: "Account created successfully !",
        position: "top-center",
        place: "toast-position"
    }

   
  
   
    return (

        <>
         

        <div className="pt-2 mt-1 bg-color-table overflow-auto">
           
          
             {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={props.isdarkMode} />}
              

            <Table striped bordered hover >
                <thead>
                    <tr>
                        {props.tableHead.map((value, index) => {
                            return (<th key={index}>{value}</th>)
                        }
                        )}
                    </tr>
                </thead>
                <tbody className="tbody-table">
                    {props.loading ? <tr><td colSpan={props.tableHead.length}><SpinnerGrow /></td></tr> :
                        props.tableData.map((data, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{data.ribCompte}</td>
                                    <td>{data.intituleCompte}</td>
                                    <td>{data.solde}</td>
                                    <td><CheckStatus type={mappingStatus.get(data.bloqued)} status={data.bloqued?"Yes":"No"} /></td>
                                    <td>action</td>
                                   
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
        message : state.message.message,
        isdarkMode : state.darkMode.isdarkMode,
    }
}

export default connect(mapStateToProps)(TableC)
