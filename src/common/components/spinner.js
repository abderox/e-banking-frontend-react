import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function SpinnerGrow() {

  return <div className="justify-content-center d-flex">
    <Spinner animation="grow" variant="warning" size="md" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
}

export default SpinnerGrow;


