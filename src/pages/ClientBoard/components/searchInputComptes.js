import React from 'react'

const SearchInput = ({ handleChangeSearch, inputData }) => {
    return (
        <div className="p-4 border bg-color-div" >
            <div className="d-flex justify-content-center ">

                <h1 className="display-6 text-center">Browse accounts</h1>

            </div>

            <div className="form-row row ">
                <div className="col">
                    <label>Account title</label>
                    <input id="1" type="text" name="intituleCompte" className="form-control" value={inputData.value} placeholder="eg: courant ... " onChange={handleChangeSearch} />

                </div>
                <div className="col">
                    <label>Rib</label>
                    <input id="1" type="text" name="rib" className="form-control" value={inputData.valueE} placeholder="eg: 951 ... " onChange={handleChangeSearch} />

                </div>
            </div>
            <div className="form-row row ">
                <div className="col">
                    <label>Solde less than</label>
                    <input id="1" type="number" step="50" min="100" name="soldeLess" className="form-control" value={inputData.valueS} placeholder="eg: 20000 " onChange={handleChangeSearch} />

                </div>
                <div className="col-6">
                    <div className="col">
                        <label>Solde greater than</label>
                        <input id="1" type="number" step="50" min="100" name="soldeGreat" className="form-control" value={inputData.valueG} placeholder="eg: 100 " onChange={handleChangeSearch} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchInput;