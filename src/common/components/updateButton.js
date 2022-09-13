import React from 'react';
import { MDBBtn, MDBIcon,MDBSpinner } from 'mdb-react-ui-kit';

export default function UpdateButton({ loading ,handleSendOtp}) {
    return (
        <MDBBtn style={{ backgroundColor: '#55acee' }} type='button' disabled={loading} onClick={handleSendOtp}>
            {loading ?
                <> <MDBSpinner size='sm' role='status' tag='span' />
                    <span className='visually-hidden'>Loading...</span></>

                : <><MDBIcon className='me-2' far icon='edit' /> Update password</>
            }

        </MDBBtn>
    );
}