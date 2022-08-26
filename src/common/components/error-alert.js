import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissibleExample({props}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible >
        <Alert.Heading>{props.code} Oh snap! You got an error!</Alert.Heading>
        {props.message && (<p>
          Details : {props.status} for {props.message}
        </p>)}
        
      </Alert>
    );
  }
  
}

export default AlertDismissibleExample;