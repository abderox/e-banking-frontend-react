import React from 'react'
import { connect } from 'react-redux'

function FormInput(props) {

    return (
        <div className="p-4 border bg-color-div">
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
                    <input type="text" onChange={props.handleChange} value={props.formInputData.firstName} name="firstName" className="form-control" placeholder="firstName" />
                </div>
                <div className="col">
                    {/* <label>Last Name</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.lastName} name="lastName" className="form-control" placeholder="lastName" />
                </div>
                <div className="col">
                    {/* <label>Telephone</label> */}
                    <input type="tel" onChange={props.handleChange} value={props.formInputData.telephone} name="telephone" className="form-control" placeholder="telephone" />
                </div>
            </div>
            <div className="form-row row ">
                <div className="col">
                    <label>Email</label>
                    <input type="email" onChange={props.handleChange} value={props.formInputData.email} name="email" className="form-control" placeholder="email" />
                </div>
                <div className="col">
                    <label>Password</label>
                    <input type="password" onChange={props.handleChange} value={props.formInputData.password} name="password" className="form-control" placeholder="password" />
                </div>
                <div className="col">
                    <label>Date of Birth</label>
                    <input type="date" onChange={props.handleChange} value={props.formInputData.date_birth} name="date_birth" className="form-control" placeholder="date of birth" title="date of birth" />
                </div>
            </div>
            <div className="form-row row  pt-2">


                <div className="col">
                    {/* <label>ID type</label> */}
                    <select className="form-control" onChange={props.handleChange} name="typepiece" required>

                        <option value="" selected>--Type ID--</option>
                        <option value="CIN" >CIN</option>
                        <option value="PASSPORT">PASSPORT</option>

                    </select>
                </div>
                <div className="col">
                    {/* <label>Credentials</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.numPieceIdentiteClient} name="numPieceIdentiteClient" className="form-control" placeholder="CIN/PASSPORT ..." />
                </div>
            </div>
            <div className="form-row row pt-2">
                <div className="col">
                    {/* <label>Region</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.region} name="region" className="form-control" placeholder="Region" />
                </div>
                <div className="col">
                    {/* <label>Ville</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.ville} name="ville" className="form-control" placeholder="ville" />
                </div>
                <div className="col">
                    {/* <label>Province</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.provincAddress} name="provincAddress" className="form-control" placeholder="Province" />
                </div>
                <div className="col">
                    {/* <label >Street</label> */}
                    <input type="text" onChange={props.handleChange} value={props.formInputData.rue} name="rue" className="form-control" placeholder="street Address" />
                </div>


            </div>




            <div class="row">
                <div className="col-md-10 col-sm-4 "></div>
                <div class="col-md-2 col-sm-8 text-right">
                    <input type="submit" onClick={props.handleSubmit} className="button-login " />
                </div>
            </div>

        </div>


    )
}

const mapToStateProps = (state, ownedProps) => {
    return {
        codeAgence: state.auth.user.codeAgence,
        identifiant: state.auth.user.identifiantBanquier,
        bankName: state.auth.user.bankName,
        formInputData: ownedProps.formInputData,
        handleChange: ownedProps.handleChange,
        handleSubmit: ownedProps.handleSubmit
    }
}
export default connect(mapToStateProps)(FormInput);