import Toast from 'react-bootstrap/Toast';
import React, { useState } from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Moment from 'react-moment';
import 'moment-timezone';
import { connect } from 'react-redux';

function ToastError(props) {

    const [showA, setShowA] = useState(true);
   

    return (
        <ToastContainer className="p-3" position={ "top-center"}>

            <Toast onClose={() => (setShowA(!showA))} show={showA} className={`${props.isdarkMode ? "":"toast-dark" }`}>
                <Toast.Header className={`${props.isdarkMode ? "":"toast-dark" }`}>
                    <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/32/000000/external-unauthorized-privacy-flaticons-lineal-color-flat-icons.png"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.props.code}</strong>
                    {props.dateToFormat && 
                    <small>

                        <Moment format="HH:mm:ss" interval={1}>{props.dateToFormat}</Moment>

                    </small> }
                </Toast.Header>
                <Toast.Body> <strong>{props.props.status} </strong> : {props.props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

const mapStateToProps=(state,ownedProps)=>{
    return{
        isdarkMode: state.darkMode.isdarkMode,
        props : ownedProps.props,
        dateToFormat : ownedProps.dateToFormat,
    }
}


export default connect(mapStateToProps)(ToastError);