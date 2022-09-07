import React from 'react'
import Form from "react-validation/build/form";
import { connect } from 'react-redux'
import { required, montant_ } from '../../../utils/constraints'



function FormInput(props) {




    return (
        <>
            <Form className="p-4 border bg-color-div" onSubmit={props.handleSubmit} >


                <div className="form-row row ">
                    <div className="col">
                        <label className="text-muted">Bank : <strong >{props.bankName}</strong></label>

                    </div>
                    <div className="col">

                    </div>
                    <div className="col">
                        <label className="text-muted">ID Client : #<strong>{props.identifiant}</strong></label>
                    </div>
                </div>
                <hr />

                <div className="form-row row pt-3 mt-3 ">
                    <div className="col">
                        <label>Account</label>
                        <select className="form-control" onChange={props.handleChange} name="ribEmetteur" required>

                            <option value="" >--Choose account--</option>
                            {props.accountsClient.map((account, index) =>
                            (
                                <option key={index} value={account.ribCompte}>{account.ribCompte}{"  "} [{account.intituleCompte}]{"  "} {account.solde} {"  MAD"} </option>
                            ))
                            }

                        </select>
                        {required(props.formInputData.ribEmetteur)}

                    </div>
                    <div className="col">
                        <label>Receiver</label>
                        <select className="form-control" onChange={props.handleChange} name="ribplusperiod" required>

                            <option value="B,O"  >--Choose account--</option>
                            {props.benificiaresClient.map((receiver, index) =>
                            (
                                <option key={index} value={receiver.ribBenificiaire + "," + receiver.periodicity}>{receiver.ribBenificiaire}{"  "} [{receiver.nomBenificiaire}]{"  "} {receiver.intituleVirementBenificiaire} {" | "} {receiver.periodicity}  </option>
                            ))
                            }

                        </select>
                        <small className="text-muted">Format : rib [nom] title | periodicity</small>
                        {required(props.formInputData.ribplusperiod)}
                    </div>

                </div>

                <div className="form-row row pt-2 ">
                    <div className="col">
                        <label>Montant</label>
                        <input type="number" step="0.1" min="0" onChange={props.handleChange} value={props.formInputData.montant} name="montant" className="form-control" placeholder="0.00" title="montant" />
                        {required(props.formInputData.montant)}
                        {montant_(props.formInputData.montant.toString())}
                    </div>

                    <div className="col">
                        <label>{ props.formInputData.applyPeriodicity ?"Starting from " : "Execution date"}</label>
                        <input type="date" onChange={props.handleChange} value={props.formInputData.dateExecution} name="dateExecution" className="form-control" />
                        {required(props.formInputData.dateExecution)}
                    </div>

                </div>
                {props.formInputData.ribplusperiod.split(",")[1]!=='O' &&

                    <div className="form-row row ">
                        <div className=" col-lg-2 col-md-6 col-sm-12 pt-3 d-flex justify-content-between">
                            <input className="form-check-input " type="checkbox" checked={props.formInputData.applyPeriodicity} id="flexCheckDefault" name="applyPeriodicity" onClick={props.handleCheck}  />
                            <span className="" >
                                Apply Periodicity 
                            </span>
                        </div>
                        <small className="text-muted">Leaving it unchecked will make the transfer to happen once !</small>
                    </div>
                }




                <div className="row mt-4">
                    <div className="col-lg-3 col-md-4 col-sm-12 pt-4">
                    </div>
                    <div className=" col-lg-5 col-md-2   pt-4"></div>
                    <div className="col-lg-2 col-md-3 col-sm-2 text-center ">
                        <button type="button" className="button-login-reset" onClick={props.resetForm}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="reset" /><span>Reset</span></button>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 text-center">
                        <button type="submit" className="button-login " disabled={props.loading}>
                            {props.loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    <span style={{ marginLeft: 5 }}>Submiting ...</span>
                                </>
                            ) :
                                <span>Submit</span>
                            }
                        </button>
                    </div>
                </div>
            </Form>
        </>


    )
}

const mapToStateProps = (state, ownedProps) => {
    return {
        codeAgence: state.auth.user.codeAgence,
        identifiant: state.auth.user.identifiantClient,
        bankName: state.auth.user.bankName,
        formInputData: ownedProps.formInputData,
        handleChange: ownedProps.handleChange,
        handleSubmit: ownedProps.handleSubmit,
        resetForm: ownedProps.resetForm,
        loading: ownedProps.loading,
        handleCheck: ownedProps.handleCheck,
        accountsClient: state.frontoffice.accountsClient,
        benificiaresClient: state.frontoffice.benificiaresClient,

    }
}
export default connect(mapToStateProps)(FormInput);