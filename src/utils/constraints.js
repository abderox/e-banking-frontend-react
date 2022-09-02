/** 
 * @author  https://github.com/abderox
*/

import { isEmail } from "validator";
import React from 'react';

const required = (value) => {
    if (!value) {
        return (

            <small className="text-danger ">required * </small>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <small className="text-danger ">provide with valid email !</small>
        );
    }
};
const stringType = value => {

    if (value && !value.match(/^[a-zA-Z\s]*$/)) {
        return (
            <small className="text-danger ">invalid type ! only letters are allowed </small>
        );
    }
};

const idCode = value => {

    if (value && !value.match(/^[A-Za-z0-9]*$/)) {
        return (
            <small className="text-danger ">only letters and numbers are allowed ! </small>
        );
    }
};

const telephone = (value) => {
    let count = value ? value.length : 0;
    if (value && !value.match(/\d/g)) {
        return (
            <small className="text-danger ">number as of format 06../05..</small>
        );
    }

    if (count < 10 || count > 10) {
        return (
            <small className="text-danger ">max numbers 10</small>
        );
    }
};



const rib = (value) => {
    let count = value ? value.length : 0;
    if (value && !value.match(/\d/g)) {
        return (
            <small className="text-danger ">only digits are allowed ! </small>
        );
    }

    if (count < 24 || count > 24) {
        return (
            <small className="text-danger ">rib consists of 24 digits</small>
        );
    }
};


const montant_ = (value) => {

    
    let count = value ? value.length : 0;

    if (value && !value.match(/\d+(\.)\d+$/)) {
        return (
            <small className="text-danger ">Insert amount as this format 1800.0</small>
        );
    }

    let countPeriods = value ? value.match(/\./g).length : 0;
    if (countPeriods > 1) {
        return (
            <small className="text-danger ">One period is allowed</small>
        );
    }
   
    let countNumbers = value ? value.split(".")[0] : 0;
    if (value && (countPeriods === 1) ) {
        if(countNumbers.length>=7) {
        return (
            <small className="text-danger ">Consult the director</small>
        );}
    }
};



export { required, email, telephone, stringType, idCode, montant_ ,rib};
