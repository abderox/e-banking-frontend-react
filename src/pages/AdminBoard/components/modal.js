import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

function ModalBoot({ key, data }) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    return (
        <>

            <button className="choose-action" onClick={handleShow}>
                <img src="https://img.icons8.com/external-sbts2018-solid-sbts2018/24/FFFFFF/external-choose-basic-ui-elements-2.5-sbts2018-solid-sbts2018.png" />
            </button>

            <Modal show={show} onHide={handleClose} key={key}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Identifiant client</Form.Label>
                            <input type="text" className="form-control" value={data} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Intitule compte</Form.Label>
                            <input type="text" className="form-control" value="" placeholder="Intitule compte" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <div className="form-check">
                                <input className="form-check-input p-2" type="checkbox" value="true" id="flexCheckDefault" />
                                <span className="" for="flexCheckDefault">
                                    Inclus virement
                                </span>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Montant</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>MAD</InputGroup.Text>
                                <input type="number" step="1" min="100"  className="form-control"  placeholder="Solde initial" />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                       
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Change status</Form.Label>
                            <select className="form-control" name="statusProfile" required>

                                <option value="DESACTIVE" defaultValue={"DESACTIVE"}>--Status--</option>
                                <option value="DESACTIVE" >DESACTIVE</option>
                                <option value="ACTIVE" >ACTIVE</option>
                                <option value="SUSPENDU" >SUSPENDU</option>
                                <option value="BLOQUE" >BLOQUE</option>


                            </select>
                            <small className="text-muted">Default : DESACTIVE </small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalBoot;