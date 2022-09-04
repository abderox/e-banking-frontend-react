import React from 'react'

const SearchInput = ({ handleChangeSearch, inputData }) => {
    return (
        <div className="p-4 border bg-color-div" >
            <div className="d-flex justify-content-center ">

                <h1 className="display-6 text-center font-weight-bold">Browse Transactions</h1>

            </div>

            <div className="form-row row ">
                <div className="col">
                    <label>Reference</label>
                    <input id="1" type="text" name="reference" className="form-control"  placeholder="eg: D_1220 ... " onChange={handleChangeSearch} />

                </div>
                <div className="col">
                    <label>Rib</label>
                    <input id="1" type="text" name="rib" className="form-control"  placeholder="eg: 951 ... " onChange={handleChangeSearch} />

                </div>
            </div>
            <div className="form-row row ">
                <div className="col">
                    <label>Montant less than</label>
                    <input id="1" type="number" step="50" min="100" name="montantLess" className="form-control" placeholder="eg: 20000 " onChange={handleChangeSearch} />

                </div>
                <div className="col-6">
                    <div className="col">
                        <label>Montant greater than</label>
                        <input id="1" type="number" step="50" min="100" name="montantGreat" className="form-control"  placeholder="eg: 100 " onChange={handleChangeSearch} />

                    </div>
                </div>
            </div>
            <div className="form-row row ">
                <div className="col">
                    <label>Type</label>
                    <select className="form-control" onChange={handleChangeSearch} name="type" required>

                        <option value="" >--Type Transaction--</option>
                        <option value="DEPOT" >DEPOT</option>
                        <option value="RETRAIT">RETRAIT</option>
                        <option value="VIREMENT">VIREMENT</option>

                    </select>
                </div>
                
                <div className="col">
                    <label>Status</label>
                    <select className="form-control" onChange={handleChangeSearch} name="status" required>

                        <option value="" >--Status--</option>
                        <option value="true" >Executed</option>
                        <option value="false">Pending</option>

                    </select>
                    
                </div>
                <div className="col">
                        <label>Date execution</label>
                        <input id="1" type="date"  name="dateExecution" className="form-control"   onChange={handleChangeSearch} />

                    </div>
                
            </div>
        </div>
    )
}

export default SearchInput;