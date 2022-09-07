import React from 'react'
import Form from "react-validation/build/form";
import { connect } from 'react-redux'
import { required, stringType, rib } from '../../../utils/constraints'
import ToastError from '../../../common/components/toastError';


function SearchInput(props) {




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
                        <label className="text-muted">ID Banker : #<strong>{props.identifiant}</strong></label>
                    </div>
                </div>
                <hr />

                <div className="form-row row pt-3 mt-3 ">
                    <div className="col">
                        <label>Client identity </label>
                        <input type="text" onChange={props.handleChange} value={props.formInputData.identity} name="identity" className="form-control" placeholder="identity client" />
                     
                    </div>
                   
                    <div className="col">
                        <label>Mobile</label>
                        <input type="number" onChange={props.handleChange} value={props.formInputData.mobile} name="mobile" className="form-control" placeholder="Mobile number"  />
          

                    </div>
                </div>

                
              

                <div className="form-group row">
                <div className="col">
                        <label>Rib</label>
                        <input type="text" onChange={props.handleChange} value={props.formInputData.ribCompte} name="rib" className="form-control" placeholder="11110000...0001460" />
             
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
                                    <span style={{ marginLeft: 5 }}>Searching ...</span>
                                </>
                            ) :
                                <span>Search</span>
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
        identifiant: state.auth.user.identifiantBanquier,
        bankName: state.auth.user.bankName,
        formInputData: ownedProps.formInputData,
        handleChange: ownedProps.handleChange,
        handleSubmit: ownedProps.handleSubmit,
        resetForm: ownedProps.resetForm,
        loading: ownedProps.loading,
    }
}
export default connect(mapToStateProps)(SearchInput);