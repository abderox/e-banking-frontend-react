import React from 'react'
import Form from "react-validation/build/form";
import { connect } from 'react-redux'
import { required, stringType, rib } from '../../../utils/constraints'



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
                        <label>Name</label>
                        <input type="text" onChange={props.handleChange} value={props.formInputData.nom} name="nom" className="form-control" placeholder="Name" />
                        {required(props.formInputData.nom)}
                        {stringType(props.formInputData.nom)}


                    </div>
                    <div className="col">
                        <label>Rib</label>
                        <input type="text" onChange={props.handleChange} value={props.formInputData.rib} name="rib" className="form-control" placeholder="11110000...0001460" />
                        {required(props.formInputData.rib)}
                        {rib(props.formInputData.rib)}
                    </div>
                    <div className="col">
                        <label>Title for transfers</label>
                        <input type="text" onChange={props.handleChange} value={props.formInputData.intituleVirement} name="intituleVirement" className="form-control" placeholder="School fees" title="title transfer" />
                        {required(props.formInputData.intituleVirement)}
                        {stringType(props.formInputData.intituleVirement)}

                    </div>
                </div>
                <div className="form-row row ">
                    <div className="col">
                        <label>Periodicity</label>
                        <select className="form-control" onChange={props.handleChange}   name="periodicity" >
                            <option value="O">Select Periodicity</option>
                            <option value="O">Once</option>
                            <option value="D">Daily</option>
                            <option value="W">Weekly</option>
                            <option value="F">Fortnight</option>
                            <option value="M">Monthly</option>
                            <option value="A">Yearly</option>
                        </select>
                        <small className="text-muted">Default : Once</small>

                    </div>
                    <div className="col-8">
                    </div>
                </div>



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
    }
}
export default connect(mapToStateProps)(FormInput);