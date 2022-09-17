import React from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdb-react-ui-kit';
import authApi from '../../api/auth/auth.api';
import { data } from 'jquery';


const GroupItem = ({ country, ipv4, agent, token, expiration ,refresh}) => {

    const signoutSession = () => {
        authApi.signoutSession({ accessToken: token }).then((res) => {
            refresh()
        }).catch((err) => {
            alert("Something went wrong !")
        })
    }

    return (
        <MDBListGroupItem className='d-flex justify-content-between align-items-center padding-sessions'>
            <div className='d-flex align-items-center '>
                <img
                    src='https://img.icons8.com/ios-filled/48/40C057/multiple-devices.png'
                    alt='device'
                    style={{ width: '48px', height: '48px', paddingLeft: '5px' }}

                />
                <div className='ms-3'>
                    <p className='fw-bold mb-1'>{country}</p>
                    <p className='text-muted mb-0'>{ipv4}</p>
                </div>
            </div>
            <div className='d-flex align-items-center '>
                <MDBBadge pill light color='success' className='badge-margin-sessions'>
                    {agent}
                </MDBBadge>
                <div className='ms-3'>
                <MDBBtn size='sm' rounded color='link' onClick={signoutSession}>
                    <img
                        src='https://img.icons8.com/windows/28/FD7E14/disconnected.png'
                        alt='disconnect'

                    />
                </MDBBtn>
                    <p className='text-muted mb-0 px-3'>{expiration}</p>
                </div>
            </div>

        </MDBListGroupItem>)
}


export default function ActiveSessions({ data, session ,refresh}) {



    return (
        <MDBListGroup style={{ minWidth: '22rem' }} light>
            <h6 className='bg-light p-2 mt-4 border-top border-bottom'>Connected devices</h6>
            <MDBListGroupItem className="max-height-sessions">
                {session.length > 0 ? session.map((item, index) =>
                    <GroupItem key={index}
                        country={item.agent.split(",")[1]}
                        ipv4={item.agent.split(",")[2]}
                        agent={item.agent.split(",")[0]}
                        token={item.token}
                        expiration={item.expirationDate.substring(0,11)}
                        refresh={refresh}
                    />)

                    : data.map((item, index) => (
                        <GroupItem key={index}
                            country={item.split(",")[1]}
                            ipv4={item.split(",")[2]}
                            agent={item.split(",")[0]} />
                    ))}
            </MDBListGroupItem>


        </MDBListGroup>
    );
}