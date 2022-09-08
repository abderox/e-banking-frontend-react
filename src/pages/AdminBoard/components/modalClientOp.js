import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import { apiMessage } from "../../../store/actions";
import { editClient_, clearEditClientResponse } from '../../../store/actions/backoffice'
import authApi from '../../../api/auth/auth.api';


function ModalClientOP(props) {

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [dataTosend, setDataTosend] = useState(
        {
            identifiantClient: props.data.identifiantClient,
            statusClient: props.data.status
        })


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleSubmit = (e) => {
        e.preventDefault();


        if (authApi.NotvalidJwt()) {
            alert("Your session has expired, please login again")
            props.logout(URL.SIGN_OUT_URL_ADMIN);
            return <Navigate to={"/login-admin"} replace />
        }

        setLoading(true);



        let checkAll = Object.values(dataTosend).every(el => el !== null && el !== undefined && el !== "");
        if (checkAll) {

            props.clearMessage();
            console.log(dataTosend)
            props.editClient_(dataTosend).then(res => {
                console.log(res)
                setLoading(false);
                handleClose();
                props.handleRefresh();
            }).catch(err => {
                setLoading(false);
            })

        } else {
            console.log("not ok")
            setLoading(false);
        }

    }

    const handleChange = (e) => {
        let val = e.target.value;
        setDataTosend({ ...dataTosend, [e.target.name]: val })
    }


    return (
        <>

            <button className="choose-action" onClick={handleShow}>
                <img src="https://img.icons8.com/external-sbts2018-solid-sbts2018/24/FFFFFF/external-choose-basic-ui-elements-2.5-sbts2018-solid-sbts2018.png" />
            </button>

            <Modal show={show} onHide={handleClose} key={props.key} backdrop="static" keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                {!loading ?
                    <Modal.Header closeButton>
                        <Modal.Title>Client service</Modal.Title>
                    </Modal.Header> :
                    <Modal.Header >
                        <Modal.Title>Please wait  ... </Modal.Title>
                    </Modal.Header>}

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Identifiant client</Form.Label>
                            <input type="text" className="form-control" value={props.data.identifiantClient} disabled name="identifiantClient" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Current status </Form.Label>
                            <input type="text" className="form-control" value={props.data.status} disabled name="statusClient" />
                        </Form.Group>

                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Change status</Form.Label>
                            <select className="form-control" name="statusClient" onChange={handleChange} required>

                                <option value="DESACTIVE" defaultValue={"DESACTIVE"}>--Status--</option>
                                <option value="DESACTIVE" >DESACTIVE</option>
                                <option value="ACTIVE" >ACTIVE</option>
                                <option value="SUSPENDU" >SUSPENDU</option>
                                <option value="BLOQUE" >BLOQUE</option>


                            </select>
                        </Form.Group>
                        <Modal.Footer>
                            {!loading &&
                                <Button variant="secondary" onClick={handleClose} >
                                    Close
                                </Button>}

                            <Button variant="warning" disabled={loading} type="submit">
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm"></span>
                                        <span style={{ marginLeft: 5 }}>Submiting ...</span>
                                    </>
                                ) :
                                    <span>Update</span>
                                }
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    );
}

const mapStateToProps = (state, ownedProps) => {
    return {
        data: ownedProps.data,
        key: ownedProps.key,
        handleRefresh: ownedProps.handleRefresh
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        editClient_: (data) => dispatch(editClient_(data)),
        clearEditClientResponse: () => dispatch(clearEditClientResponse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalClientOP);
