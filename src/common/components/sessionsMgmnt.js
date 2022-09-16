import React from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const GroupItem = ({ country, ipv4, agent }) => {
    return (
        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center '>
                <img
                    src='https://img.icons8.com/ios-filled/48/40C057/multiple-devices.png'
                    alt=''
                    style={{ width: '48px', height: '48px', paddingLeft: '5px' }}

                />
                <div className='ms-3'>
                    <p className='fw-bold mb-1'>{country}</p>
                    <p className='text-muted mb-0'>{ipv4}</p>
                </div>
            </div>
            <MDBBadge pill light color='success' className='badge-margin-sessions'>
                {agent}
            </MDBBadge>
        </MDBListGroupItem>)
}


export default function ActiveSessions({ data }) {

    return (
        <MDBListGroup style={{ minWidth: '22rem' }} light>
            <h6 className='bg-light p-2 mt-4 border-top border-bottom'>Connected devices</h6>
            <MDBListGroupItem>
                {data.map((item, index) => (
                    <GroupItem key={index} country={item.split(",")[1]} ipv4={item.split(",")[2]} agent={item.split(",")[0]} />
                ))}
            </MDBListGroupItem>


        </MDBListGroup>
    );
}