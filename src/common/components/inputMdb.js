import React from 'react';
import { MDBInput } from 'mdb-react-ui-kit';

export default function Input({handleChange,label,name,type,key}) {
  return (
    <MDBInput label={label} id={key} type={type} name={name} />
  );
}