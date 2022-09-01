import React from 'react'
import Badge from 'react-bootstrap/Badge';


const CheckStatus = ({status,type}) => {

    return <Badge pill bg={type}>
            {status}
           </Badge>



}

export default CheckStatus;




