import React from 'react'
import Input from "react-validation/build/input";

function InputText({ data ,handleChange , value }) {
    return (

        
        <div className={data.position}>

            <div className="d-flex justify-content-between">
                {data.img && (

                    <div className="mt-1 col-2">
                        <img src={data.img} alt={data.alt} />
                    </div>
                )}

                <div className="col">
                    <input
                        id={data.placeholder}
                        type={data.type}
                        className={`form-control`}
                        name={data.placeholder}
                        value={value}
                        placeholder={data.placeholder}
                        onChange={handleChange}
                  
                    />
                </div>
            </div>

        </div>
    )
}

export default InputText;