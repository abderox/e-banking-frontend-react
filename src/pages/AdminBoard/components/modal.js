import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import { montant_ } from '../../../utils/constraints';
import { addFirstAccountToClient, clearCreatedRes } from '../../../store/actions/backoffice';
import { apiMessage } from "../../../store/actions";
import authApi from '../../../api/auth/auth.api';


function ModalBoot(props) {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);




    const [dataTosend, setDataTosend] = useState(
        {
            identifiantClient: props.data,
            inclusVirement: false,
            solde: 100.00,
            statusClient: "DESACTIVE"
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

        dataTosend.solde = parseFloat(dataTosend.solde)

        let checkAll = Object.values(dataTosend).every(el => el !== null && el !== undefined && el !== "");
        if (checkAll) {
            props.clearCreatedRes();
            props.clearMessage();
            props.addFirstAccountToClient(dataTosend)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    handleClose();
                    props.handleRefresh();
                }).catch(err => {
                    console.log(err)
                    setLoading(false);
                    handleClose();

                }
                );


        } else {
            console.log("not ok")
            setLoading(false);
        }

    }

    let handleChange = (e) => {
        let val = e.target.value;
        if ([e.target.name] === "solde") {
            val = parseFloat(val);
        }
        setDataTosend({ ...dataTosend, [e.target.name]: val })
    }

    let handleCheck = () => {
        setDataTosend({ ...dataTosend, inclusVirement: !dataTosend.inclusVirement })
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
                        <Modal.Title>New account for new client</Modal.Title>
                    </Modal.Header> :
                    <Modal.Header >
                        <Modal.Title>Please wait  ... </Modal.Title>
                    </Modal.Header>}

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Identifiant client</Form.Label>
                            <input type="text" className="form-control" value={props.data} disabled name="identifiantClient" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <div className="form-check">
                                <input className="form-check-input p-2" type="checkbox" checked={dataTosend.inclusVirement} id="flexCheckDefault" name="inclusVirement" onClick={handleCheck} />
                                <span className="" for="flexCheckDefault">
                                    Inclus virement
                                </span>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Montant</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>MAD</InputGroup.Text>
                                <input type="text" className="form-control" placeholder="Solde initial" name="solde" value={dataTosend.solde} onChange={handleChange} />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                            {montant_(dataTosend.solde.toString())}

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
                            <small className="text-muted">Default : DESACTIVE </small>
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
                                    <span>Confirm</span>
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
        addFirstAccountToClient: (data) => dispatch(addFirstAccountToClient(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearCreatedRes: () => dispatch(clearCreatedRes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBoot);
