import Toast from 'react-bootstrap/Toast';
import React , {useState} from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Moment from 'react-moment';
import 'moment-timezone';

function Toasts({ props, dateToFormat }) {

    const [showA, setShowA] = useState(true);
        
    return (
        <ToastContainer className={`p-3 `} position={props.position} id={props.place} >
            <Toast onClose={()=>(setShowA(!showA))} show={showA} >
                <Toast.Header >
                    <img
                        src="https://img.icons8.com/cute-clipart/32/000000/info-popup.png"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.title}</strong>
                    <small>

                        <Moment format="HH:mm:ss" interval={1}>{dateToFormat}</Moment>

                    </small>
                </Toast.Header>
                <Toast.Body>{props.body}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Toasts;