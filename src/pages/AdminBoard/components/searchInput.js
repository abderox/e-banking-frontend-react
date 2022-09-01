import React from 'react'

const SearchInput = ({handleChangeSearch,value,handleChangeSearchE,valueE}) => {
    return (
        <div className="p-4 border bg-color-div" >


            <div className="form-row row ">
                <div className="col">
                        <label>Identifiant client</label>
                        <input id="1" type="text"  name="identifiant" className="form-control" value={value} placeholder="Search ... "  onChange={handleChangeSearch}/>
                    
                </div>
                <div className="col">
                        <label>Email</label>
                        <input id="1" type="text"  name="email" className="form-control" value={valueE} placeholder="Search ... "  onChange={handleChangeSearchE}/>
                    
                </div>
            </div>
        </div>
    )
}

export default SearchInput;