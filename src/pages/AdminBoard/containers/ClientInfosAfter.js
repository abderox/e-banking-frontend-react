import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AjouterCompte from './AjouterCompte';
function ClientInfoAfter() {
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
        dateToFormat
      </Tab>
      <Tab eventKey="comptes" title="Comptes" tabClassName="tabs-color">
        <AjouterCompte newAccount={false}/>
      </Tab>
      <Tab eventKey="Recherche" title="Recherche" tabClassName="tabs-color" >
        data
      </Tab>
      <Tab eventKey="transactions" title="Transactions" tabClassName="tabs-color">
        data
      </Tab>
     
    </Tabs>
  );
}

export default ClientInfoAfter;