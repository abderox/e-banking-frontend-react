import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import InputGroup from 'react-bootstrap/InputGroup';
import { montant_ } from '../../../utils/constraints';
import { updateAccount, clearUpdatedAccount } from '../../../store/actions/backoffice';
import { apiMessage } from "../../../store/actions";
import authApi from '../../../api/auth/auth.api';


function ModalBoot(props) {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);




    const [dataTosend, setDataTosend] = useState(
        {
            ribCompte: props.data.ribCompte,
            inclusVirement: props.data.inclusVirement,
            montant: 0,
            bloqued: props.data.bloqued,
            solde : props.data.solde,
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

        dataTosend.montant = parseFloat(dataTosend.montant)

        let checkAll = Object.values(dataTosend).every(el => el !== null && el !== undefined && el !== "");
        if (checkAll) {

            console.log(dataTosend)
            props.clearUpdatedAccount();
            props.clearMessage();
            props.updateAccount(dataTosend)
                .then(res => {
                    console.log(res)
                    setLoading(false);
                    handleClose();

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
        setDataTosend({ ...dataTosend, [e.target.name]: val })
    }

    let handleCheck = () => {
        setDataTosend({ ...dataTosend, inclusVirement: !dataTosend.inclusVirement })
    }

    let handleCheckBlock = () => {
        setDataTosend({ ...dataTosend, bloqued: !dataTosend.bloqued })
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
                        <Modal.Title>Update account</Modal.Title>
                    </Modal.Header> :
                    <Modal.Header >
                        <Modal.Title>Please wait  ... </Modal.Title>
                    </Modal.Header>}

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rib</Form.Label>
                            <input type="text" className="form-control" value={props.data.ribCompte} disabled name="ribCompte" />
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
                            <div className="form-check">
                                <input className="form-check-input p-2" type="checkbox" checked={dataTosend.bloqued} id="flexCheckDefault" name="bloqued" onClick={handleCheckBlock} />
                                <span className="" for="flexCheckDefault">
                                    Block
                                </span>
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Balance</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>MAD</InputGroup.Text>
                                <input type="text" className="form-control"  name="solde" value={(parseFloat(dataTosend.solde)+parseFloat(dataTosend.montant || 0)).toString()} disabled={true}/>
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                            {dataTosend.montant && <small className="text-success">+{dataTosend.montant}</small>}
                            
                           

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Amount</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>MAD</InputGroup.Text>
                                <input type="text" className="form-control" placeholder="Desposit amount" name="montant" value={dataTosend.montant} onChange={handleChange} />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>
                            {montant_(dataTosend.montant.toString())}

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
                                        <span style={{ marginLeft: 5 }}>Updating ...</span>
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

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAccount: (data) => dispatch(updateAccount(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearUpdatedAccount: () => dispatch(clearUpdatedAccount()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBoot);
