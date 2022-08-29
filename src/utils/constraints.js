/** 
 * @author  https://github.com/abderox
*/

import { isEmail } from "validator";
import React from 'react';

const required = (value) => {
    if (!value) {
        return (

            <small className="text-danger ">This field is required !</small>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <small className="text-danger ">This is not an email format !</small>
        );
    }
};


export { required, email };
