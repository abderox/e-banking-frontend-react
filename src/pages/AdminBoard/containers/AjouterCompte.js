import React,{useEffect, useState} from 'react'
import TableC from "../components/table";
import {getClientsFoAccounts} from '../../../api/auth/backoffice'
import SearchInput from '../components/searchInput'



const AjouterCompte = () => {
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [val, setval] = useState("");
    const [valE, setvalE] = useState("");
    const [valS, setvalS] = useState("");

    const headNames = [
        "N°",
        "Identifiant",
        "email",
        "telephone",
        "province",
        "Date souscription",
        "Status",
        "Action"
    ];

    useEffect(() => {
        handleRefresh()
    },[])

    const handleRefresh =()=>{
        setLoading(true);
        getClientsFoAccounts().then((res) => {
            console.log(res.data);
         
            setTableData(res.data);
            setLoading(false);
            
        }).catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    let handleChangeSearch = (e) => {
        const search = e.target.value;
        setval(search);
    }
    let handleChangeSearchE = (e) => {
        const search = e.target.value;
        setvalE(search);
    }
    let handleChangeSearchS = (e) => {
        const search = e.target.value;
        setvalS(search);
    }

    let searchTable = tableData.filter((row)=>{
        return row.identifiantClient.toLowerCase().indexOf(val.toLowerCase()) !== -1
    }).filter((row)=>{
        return row.email.toLowerCase().indexOf(valE.toLowerCase()) !== -1
    }).filter((row)=>{
        return row.status.toLowerCase().indexOf(valS.toLowerCase()) !== -1
    })
  
    return (
        <React.Fragment>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-sm-12">
                        <SearchInput handleChangeSearch={handleChangeSearch} value={val}
                         handleChangeSearchE={handleChangeSearchE} valueE={valE} 
                         valueS={valS} handleChangeSearchS={handleChangeSearchS}/>
                        
                        <TableC tableData={searchTable} tableHead={headNames} loading={loading} handleRefresh={handleRefresh}/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AjouterCompte