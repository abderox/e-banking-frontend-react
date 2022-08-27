import React from 'react'
import Input from "react-validation/build/input";

function InputText({ props ,handleChange , value , email , required}) {
    return (
        <div className={props.position}>

            <div className="d-flex justify-content-between">
                {props.img && (

                    <div className="">
                        <img src={props.img} alt={props.alt} />
                    </div>
                )}

                <div className="">
                    <Input
                        id={props.placeholder}
                        type={props.type}
                        className="form-control"
                        name={props.placeholder}
                        value={value}
                        placeholder={props.placeholder}
                        onChange={handleChange}
                        validations={props.constraints}
                    />
                </div>
            </div>

        </div>
    )
}

export default InputText;