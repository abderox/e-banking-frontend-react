import React from 'react'
import { useState , useEffect } from "react/cjs/react.development";
import FormInput from "../../../common/components/forminput";
import TableC from "../../../common/components/table";
import  registerClient from "../../../api/auth/backoffice"
import { connect } from "react-redux";

const ClientRegistration = (props) => {


    const [tableData, setTableData] = useState([])
    const codeAgence = props.user.codeAgence;
    const headNames = [
        "email",
        "telephone",
        "typepiece",
        "N° piece",
        "province",
        "street",
    ]

    const [formInputData, setformInputData] = useState(
        {
            username: 'alikyiz',
            codeAgence : codeAgence,
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
            ville: '',
            region: '',
        }
    );

    

   
    const handleChange = (evnt) => {
        const newInput = (data) => ({ ...data, [evnt.target.name]: evnt.target.value })
        setformInputData(newInput)
    }

    const handleSubmit = (evnt) => {
        evnt.preventDefault();
        const checkEmptyInput = !Object.values(formInputData).every(res => res === "")
        if (checkEmptyInput) {
            const newData = (data) => ([...data, formInputData])
            setTableData(newData);
            const emptyInput = {
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
                ville: '',
                region: '',
            }
            setformInputData(emptyInput)
        }
        registerClient(formInputData).then(res => {
            console.log(res)}).catch(err => {
            console.log(err)
        } )
    }
    return (
        <React.Fragment>
            <div className="container mt-5 ">
                <div className="row">
                    <div className="col-sm-12">
                        <FormInput handleChange={handleChange} formInputData={formInputData} handleSubmit={handleSubmit} />
                        <TableC tableData={tableData} tableHead={headNames} />
                    </div>
                    {/* <div className="col-sm-4">
            </div> */}
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }}

export default connect(mapStateToProps)(ClientRegistration);