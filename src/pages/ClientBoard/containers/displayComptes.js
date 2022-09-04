import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getAccountsClient } from '../../../store/actions/frontoffice';
import SearchInput from '../components/searchInputComptes'
import Comptes from '../components/comptes'
import SpinnerGrow from '../../../common/components/spinner'
import ToastError from '../../../common/components/toastError';


const DisplayAccounts = (props) => {

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        intituleCompte: '',
        rib: '',
        soldeLess: '',
        soldeGreat: '0'
    })






    useEffect(() => {
        initData()
    }, [])


    const initData = () => {

        if (props.accountsClient.length > 0) {
            setTableData(props.accountsClient);
            setLoading(false);
        }
        else {
            handleRefresh();
        }
    }


    const handleRefresh = () => {

        setLoading(true);
        props.getAccountsClient().then((res) => {
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
            return row.intituleCompte.toLowerCase().includes(inputData.intituleCompte.toLowerCase())
        }
        ).filter((row) => {
            return row.ribCompte.toLowerCase().includes(inputData.rib.toLowerCase())
        }
        ).filter((row) => {
            return (inputData.soldeLess != '' ? row.solde < parseFloat(inputData.soldeLess) : row)

        }).filter((row) => {
            return (inputData.soldeGreat ? row.solde > parseFloat(inputData.soldeGreat) : row)

        });








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
                                <button type="button" className="refresh-button" onClick={handleRefresh}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="reset" /></button>
                            </div>
                        </div>
                        <div className="row  justify-content-between d-flex overflow-auto max-height bg-color-div">

                            {loading ?
                                <div className="d-block justify-content-center align-content-center mt-5">
                                    <SpinnerGrow />
                                </div>
                                :

                                filteredTable.map((row, index) => {
                                    return (

                                        <Comptes key={index} data={row} />

                                    )
                                })

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
        accountsClient: state.frontoffice.accountsClient,
        message: state.message.message,
        isDarkMode: state.darkMode.isDarkMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccountsClient: () => dispatch(getAccountsClient())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAccounts);
