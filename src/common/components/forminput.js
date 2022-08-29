import React from 'react'


function FormInput({ handleChange, formInputData, handleSubmit }) {
    return (
        <div className="p-4 border bg-color-div">
            <div className="form-row row p-2">
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.fullName} name="fullName" className="form-control" placeholder="Full Name" />
                </div>
                <div className="col">
                    <input type="email" onChange={handleChange} value={formInputData.emailAddress} name="emailAddress" className="form-control" placeholder="Email Address" />
                </div>
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.salary} name="salary" className="form-control" placeholder="Salary" />
                </div>
            </div>
            <div className="form-row row p-2">
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.fullName} name="fullName" className="form-control" placeholder="Full Name" />
                </div>
                <div className="col">
                    <input type="email" onChange={handleChange} value={formInputData.emailAddress} name="emailAddress" className="form-control" placeholder="Email Address" />
                </div>
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.salary} name="salary" className="form-control" placeholder="Salary" />
                </div>
            </div>
            <div className="form-row row p-2">
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.fullName} name="fullName" className="form-control" placeholder="Full Name" />
                </div>
                <div className="col">
                    <input type="email" onChange={handleChange} value={formInputData.emailAddress} name="emailAddress" className="form-control" placeholder="Email Address" />
                </div>
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.salary} name="salary" className="form-control" placeholder="Salary" />
                </div>

            </div>
            <div className="form-row row p-2 ">
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.fullName} name="fullName" className="form-control" placeholder="Full Name" />
                </div>
                <div className="col">
                    <input type="email" onChange={handleChange} value={formInputData.emailAddress} name="emailAddress" className="form-control" placeholder="Email Address" />
                </div>
                <div className="col">
                    <input type="text" onChange={handleChange} value={formInputData.salary} name="salary" className="form-control" placeholder="Salary" />
                </div>

            </div>

           
                <input type="submit" onClick={handleSubmit} className="button-login p-2" />
        
        </div>


    )
}
export default FormInput;