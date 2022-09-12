import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { editBenificiare_, clearAll } from '../../../store/actions/frontoffice'
import { apiMessage } from "../../../store/actions";
import authApi from '../../../api/auth/auth.api';


function ModalBoot(props) {


    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);




    const [dataTosend, setDataTosend] = useState(
        {
            rib: props.data.ribBenificiaire,
            nom: props.data.nomBenificiaire,
            intituleVirement: props.data.intituleVirementBenificiaire,
            periodicity: props.data.periodicity,
            applyPeriodicity: props.data.applyPeriodicity,
        })


    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    const handleSubmit = (e) => {
        e.preventDefault();


        if (authApi.NotvalidJwt()) {
            alert("Your session has expired, please login again")
            props.logout(URL.SIGN_OUT_URL_CLIENT);
            return <Navigate to={"/login"} replace />
        }

        setLoading(true);


        let checkAll = Object.values(dataTosend).every(el => el !== null && el !== undefined && el !== "");
        if (checkAll) {
            props.clearAll();
            props.clearMessage();
            console.log(dataTosend)
            props.editBenificiare_(dataTosend)
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
        setDataTosend({ ...dataTosend, [e.target.name]: val })
    }

    let handleCheck = () => {
        setDataTosend({ ...dataTosend, applyPeriodicity: !dataTosend.applyPeriodicity })
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
                        <Modal.Title>Modify Beneficiary</Modal.Title>
                    </Modal.Header> :
                    <Modal.Header >
                        <Modal.Title>Please wait  ... </Modal.Title>
                    </Modal.Header>}

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Rib beneficiary</Form.Label>
                            <input type="text" className="form-control" value={props.data.ribBenificiaire} disabled name="ribBenificiaire" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name </Form.Label>
                            <input type="text" className="form-control" value={dataTosend.nom} name="nom" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Transfer title </Form.Label>
                            <input type="text" className="form-control" value={dataTosend.intituleVirement} name="intituleVirement" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Current periodicity </Form.Label>
                            <input type="text" className="form-control" value={props.mapping.get(dataTosend.periodicity)[0]}  disabled={true} />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Change periodicity</Form.Label>
                            <select className="form-control" onChange={handleChange} name="periodicity" >
                                <option value="O">Select Periodicity</option>
                                <option value="O">Once</option>
                                <option value="D">Daily</option>
                                <option value="W">Weekly</option>
                                <option value="F">Fortnight</option>
                                <option value="M">Monthly</option>
                                <option value="A">Yearly</option>
                            </select>
        
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <div className="form-check">
                                <input className="form-check-input p-2" type="checkbox" checked={dataTosend.applyPeriodicity} id="flexCheckDefault"  onClick={handleCheck} />
                                <span className="" for="flexCheckDefault">
                                    Apply periodicity
                                </span>
                            </div>
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
        handleRefresh: ownedProps.handleRefresh,
        mapping: ownedProps.mapping,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editBenificiare_: (data) => dispatch(editBenificiare_(data)),
        clearMessage: () => dispatch(apiMessage.clearMessage()),
        clearAll: () => dispatch(clearAll()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalBoot);
