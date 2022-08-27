import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';


function PopoverPositioned({ name, url }) {

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    const handleClick = (event) => {
        setShow(!show);
        setTarget(event.target);
    };
    return (


        <div ref={ref} className="justify-content-center d-flex mt-4">
            <a href="#" onClick={handleClick} className="text-decoration-none"><small>{name}</small></a>
           
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
                  
                    <Link to={url} className=" text-decoration-none text-center text-bg-warning">
                              Login-admin
                    </Link>
                    
                  
                    </Popover.Body>
                </Popover>
            </Overlay>
        </div>


    );
}

export default PopoverPositioned;