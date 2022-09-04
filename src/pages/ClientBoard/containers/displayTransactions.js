import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getTransactionsClient } from '../../../store/actions/frontoffice';
import SearchInput from '../components/searchInputTransactions'
import Comptes from '../components/comptes'
import SpinnerGrow from '../../../common/components/spinner'
import ToastError from '../../../common/components/toastError';
import TableC from '../components/tableTransactions'

const DisplayTransactions = (props) => {

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        rib: '',
        reference: '',
        montantLess: '',
        type: '',
        dateExecution:'',
        montantGreat: '0',
        state:'',
        status:''
    })


    const headNames = [
        "N°",
        "Rib",
        "Reference",
        "Type",
        "dateExecution",
        "Montant (MAD)",
        "state"
    ]


  



    useEffect(() => {
        initData();
    }, [])


    const initData = () => {

        if (props.transactionsClient.length > 0) {
        setTableData(props.transactionsClient);
        }
        else {
            handleRefresh();
        }
    
    }



    const handleRefresh = () => {

        setLoading(true);
            props.getTransactionsClient().then((res) => {
                setTableData(res.data);
                setLoading(false);
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
      
    


    let handleChangeSearch = (e) => {

        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    let filteredTable =
        tableData.filter((row) => {
            return row.ribCompte.includes(inputData.rib)
        }
        ).filter((row) => {
            return row.typeTransaction.toLowerCase().includes(inputData.type.toLowerCase())
        })
        .filter((row) => {
            return row.referenceTransaction.toLowerCase().includes(inputData.reference.toLowerCase())
        })
        .filter((row) => {
            return (inputData.montantLess != '' ? row.montant < parseFloat(inputData.montantLess) : row)

        }).filter((row) => {
            return (inputData.montantGreat ? row.montant > parseFloat(inputData.montantGreat) : row)

        }).filter((row) => {
            return (inputData.dateExecution ? row.dateExecution.substring(0,10).includes(inputData.dateExecution) : row)
        }).filter((row)=> {
           if(inputData.status==="true" && row.executed)
           {
            return row;
           }
           else if(inputData.status==="false" && !row.executed)
           {
            return row;
           }
           else if(inputData.status=="")
              {
                return row;
              }
        }).sort((a, b) => {
            return a.dateExecution > b.dateExecution ? -1 : 1
        })





    return (
        <React.Fragment>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-sm-12">
                        {props.message && <ToastError props={JSON.parse(props.message)} isdarkMode={props.isdarkMode} />}

                        <SearchInput handleChangeSearch={handleChangeSearch} inputData={inputData}
                        />
                        <div className="row ">
                            <div className="col-md-2">
                                <button type="button" className="refresh-button" onClick={handleRefresh}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="refresh" /></button>
                            </div>
                        </div>
                        <div className="row  justify-content-between d-flex overflow-auto max-height-tx-table ">

                            {loading ?
                                <div className="d-block justify-content-center align-content-center mt-5">
                                    <SpinnerGrow />
                                </div>
                                :

                                <TableC tableData={filteredTable} tableHead={headNames} />

                            }
                        </div>


                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => {
    return {
        transactionsClient: state.frontoffice.transactionsClient,
        message: state.message.message,
        isDarkMode: state.darkMode.isDarkMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTransactionsClient: () => dispatch(getTransactionsClient())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTransactions);
