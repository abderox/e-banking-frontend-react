import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ClientRegistration from './ClientRegistration';

function ClientInfo() {
  const [key, setKey] = useState('client-register');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      defaultActiveKey={key}
      className="mb-3"
     
    >
      <Tab eventKey="client-register" title="Clients" tabClassName="tabs-color"> 
        <ClientRegistration />
      </Tab>
      <Tab eventKey="Recherche" title="Recherche" tabClassName="tabs-color" >
        data
      </Tab>
      <Tab eventKey="transactions" title="Transactions" tabClassName="tabs-color">
        data
      </Tab>
      <Tab eventKey="comptes" title="Comptes" tabClassName="tabs-color">
        data
      </Tab>
    </Tabs>
  );
}

export default ClientInfo;