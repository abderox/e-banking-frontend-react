import Toast from 'react-bootstrap/Toast';
import React , {useState} from 'react'
import ToastContainer from 'react-bootstrap/ToastContainer';
import Moment from 'react-moment';
import 'moment-timezone';
import {connect } from 'react-redux';

function Toasts(props) {

    const [showA, setShowA] = useState(true);
        
    return (
        <ToastContainer className={`p-3`} position={props.props.position} id={props.props.place} >
            <Toast onClose={()=>(setShowA(!showA))} show={showA} className={`${props.isdarkMode ? "" : "toast-dark" }`}>
                <Toast.Header className={`${props.isdarkMode ? "" : "toast-dark" }`}>
                    <img
                        src="https://img.icons8.com/cute-clipart/32/000000/info-popup.png"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{props.props.title}</strong>
                    <small>

                        <Moment format="HH:mm:ss" interval={1}>{props.dateToFormat}</Moment>

                    </small>
                </Toast.Header>
                <Toast.Body>{props.props.body}</Toast.Body>
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


export default connect(mapStateToProps)(Toasts);