import React from 'react'
import Form from "react-validation/build/form";
import { connect } from 'react-redux'
import { required, email ,telephone,stringType,idCode} from '../../utils/constraints'



function FormInput(props) {

 
   

    return (
        <>
       <Form className="p-4 border bg-color-div" onSubmit={props.handleSubmit} >
                            
        
            <div className="form-row row ">
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
            <hr />
           
            <div className="form-row row pt-3 mt-3">
                <div className="col">
                    {/* <label>First Name</label> */}
                    <input id="1" type="text" onChange={props.handleChange} value={props.formInputData.firstName} name="firstName" className="form-control" placeholder="firstName" />
                    {required(props.formInputData.firstName)}
                    {stringType(props.formInputData.firstName) }
                </div>
                <div className="col">
                    {/* <label>Last Name</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.lastName} name="lastName" className="form-control" placeholder="lastName" />
                    {required(props.formInputData.lastName)}
                    {stringType(props.formInputData.lastName)}

                </div>
                <div className="col">
                    {/* <label>Telephone</label> */}
                    <input type="tel" onChange={props.handleChange} value={props.formInputData.telephone} name="telephone" className="form-control" placeholder="telephone" />
                    {required(props.formInputData.telephone)}
                    {telephone(props.formInputData.telephone)}
                </div>
            </div>
            <div className="form-row row ">
                <div className="col">
                    <label>Email</label>
                    <input type="email" onChange={props.handleChange} value={props.formInputData.email} name="email" className="form-control" placeholder="email"  />
                    {required(props.formInputData.email)}
                    {email(props.formInputData.email)}
                </div>
                <div className="col">
                    <label>Metier</label>
                    <input type="text" onChange={props.handleChange} value={props.formInputData.metierClient} name="metierClient" className="form-control" placeholder="Profession" />
                    {required(props.formInputData.metierClient)}
                    {stringType(props.formInputData.metierClient)}
                </div>
                <div className="col">
                    <label>Date of Birth</label>
                    <input type="date" onChange={props.handleChange} value={props.formInputData.date_birth} name="date_birth" className="form-control" placeholder="date of birth" title="date of birth" />
                    {required(props.formInputData.date_birth)}
                </div>
            </div>
            <div className="form-row row  pt-2">


                <div className="col">
                    {/* <label>ID type</label> */}
                    <select className="form-control" onChange={props.handleChange} name="typepiece" required>

                        <option value="ID" defaultValue={"NODATA"}>--Type ID--</option>
                        <option value="CIN" >CIN</option>
                        <option value="PASSPORT">PASSPORT</option>
                        <option value="PERMIS">PERMIS</option>

                    </select>
                </div>
                <div className="col">
                    {/* <label>Credentials</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.numPieceIdentiteClient} name="numPieceIdentiteClient" className="form-control" placeholder="CIN/PASSPORT ..." />
                    {required(props.formInputData.numPieceIdentiteClient)}
                    {idCode(props.formInputData.numPieceIdentiteClient)}
                </div>
                <div className="col">
                    <select className="form-control" onChange={props.handleChange} name="familystatus" required>

                        <option value="NODATA" defaultValue={"NODATA"}>--Family state--</option>
                        <option value="NODATA" >NO OPTIONS</option>
                        <option value="SINGLE" >SINGLE</option>
                        <option value="MARRIED" >MARRIED</option>

                    </select>
                </div>
            </div>
            <div className="form-row row pt-2">
                <div className="col">
                    {/* <label>Region</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.regionAddress} name="regionAddress" className="form-control" placeholder="Region" />
                    {stringType(props.formInputData.regionAddress)}
                </div>
                <div className="col">
                    {/* <label>Ville</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.villeAddress} name="villeAddress" className="form-control" placeholder="ville" />
                    {stringType(props.formInputData.villeAddress)}
                </div>
                <div className="col">
                    {/* <label>Province</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.provincAddress} name="provincAddress" className="form-control" placeholder="Province" />
                    {stringType(props.formInputData.provincAddress)}
                    {required(props.formInputData.provincAddress)}
                </div>
                <div className="col">
                    {/* <label >Street</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.rue} name="rue" className="form-control" placeholder="street Address" />
                    {required(props.formInputData.rue)}
                </div>

            </div>

            <div className="row mt-4">
                <div className="col-lg-3 col-md-4 col-sm-12 pt-4">
                    <select className="form-control" onChange={props.handleChange} name="statusProfile" required>

                        <option value="DESACTIVE" defaultValue={"DESACTIVE"}>--Status--</option>
                        <option value="DESACTIVE" >DESACTIVE</option>
                        <option value="ACTIVE" >ACTIVE</option>
                      

                    </select>
                    <small className ="text-muted">Default : DESACTIVE </small>
            </div>
            <div className=" col-lg-5 col-md-2   pt-4"></div>
            <div className="col-lg-2 col-md-3 col-sm-2 text-center ">
            <button type="button" className="button-login-reset" onClick={props.resetForm}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="reset" /><span>Reset</span></button>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 text-center">
                <button type="submit"  className="button-login " disabled={props.loading}>
                {props.loading ?  (
                    <>
                    <span className="spinner-border spinner-border-sm"></span>
                    <span style={{marginLeft : 5}}>Submiting ...</span>
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
        identifiant: state.auth.user.identifiantBanquier,
        bankName: state.auth.user.bankName,
        formInputData: ownedProps.formInputData,
        handleChange: ownedProps.handleChange,
        handleSubmit: ownedProps.handleSubmit,
        resetForm : ownedProps.resetForm,
        loading : ownedProps.loading,
    }
}
export default connect(mapToStateProps)(FormInput);