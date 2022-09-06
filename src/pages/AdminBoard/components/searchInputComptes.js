import React from 'react'

const SearchInput = ({ handleChangeSearch, inputData }) => {
    return (
        <div className="p-4 border bg-color-div" >
            <div className="d-flex justify-content-center ">

                <h3 className="display-6 text-center font-weight-bold">Desposit</h3>

            </div>
            <div className="form-row row ">
                <div className="col">
                    <label>Identifiant client</label>
                    <input id="1" type="text" name="identifiantClient" className="form-control" value={inputData.identifiantClient} placeholder="Search ... " onChange={handleChangeSearch} />

                </div>
                <div className="col">
                    <label>Family name</label>
                    <input id="1" type="text" name="lastName" className="form-control" value={inputData.lastName} placeholder="Search ... " onChange={handleChangeSearch} />

                </div>
                <div className="col">
                    <label>First name</label>
                    <input id="1" type="text" name="firstName" className="form-control" value={inputData.firstName} placeholder="Search ... " onChange={handleChangeSearch} />

                </div>
            </div>
            <div className="form-row row ">

                <div className="col">
                    <label>RIB</label>
                    <input id="1" type="text" name="rib" className="form-control" value={inputData.rib} placeholder="Search ... " onChange={handleChangeSearch} />

                </div>
                <div className="col">
                    <label>Account title</label>
                    <input id="1" type="text" name="intituleCompte" className="form-control" value={inputData.intituleCompte} placeholder="Search ... " onChange={handleChangeSearch} />

                </div>
            </div>

        </div>
    )
}

export default SearchInput;