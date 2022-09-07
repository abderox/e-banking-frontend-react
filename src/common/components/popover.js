import React, { useState, useRef } from 'react';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { apiMessage } from "../../store/actions";


function PopoverPositioned(props) {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        props.clearMessage()
        setShow(!show);
        setTarget(event.target);
    };
    return (


        <div ref={ref} className="justify-content-center d-flex mt-4">
            <p  onClick={handleClick} className="anchor-link "><small>{props.name}</small></p>
           
            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={20}
            >
                <Popover id="popover-contained">
                    <Popover.Header as="h3">If not a customer go here !</Popover.Header>
                    <Popover.Body>
                  
                    <Link to={props.url} className=" text-decoration-none text-center text-info">
                              Login-admin
                    </Link>
                    
                  
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>


    );
}

const mapStateToProps = (state,ownedProps) => {
    return {
        url: ownedProps.url,
        name : ownedProps.name,
    }}

const mapToDispatch = (dispatch) => {
    return {
        clearMessage: () => dispatch(apiMessage.clearMessage())
    }
}


export default connect(mapStateToProps, mapToDispatch)(PopoverPositioned);