import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function SpinnerGrow() {

  return <div className="justify-content-center d-flex mb-2 pb-2">
    <Spinner animation="grow" variant="warning" size="md" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
}

export default SpinnerGrow;


