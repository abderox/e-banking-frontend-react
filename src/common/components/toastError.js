import Toast from 'react-bootstrap/Toast';
import React , {useState} from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Moment from 'react-moment';
import 'moment-timezone';

function ToastError({ props, dateToFormat }) {

    const [showA, setShowA] = useState(true);
        
    return (
        <ToastContainer className="p-3" position={props.position}>
     
            <Toast onClose={()=>(setShowA(!showA))} show={showA} >
                <Toast.Header >
                    <img
                        src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/32/000000/external-unauthorized-privacy-flaticons-lineal-color-flat-icons.png"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.code}</strong>
                    <small>

                        <Moment format="HH:mm:ss" interval={1}>{dateToFormat}</Moment>

                    </small>
                </Toast.Header>
                <Toast.Body>{props.status} for {props.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastError;