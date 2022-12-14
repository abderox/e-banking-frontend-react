import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddBenificiare from './addBenificiare';
import DisplayAccounts from './displayComptes'
import MakeTransfer from './makeTransfer'
import DisplayTransactions from './displayTransactions'

function ClientBoard() {
  const [key, setKey] = useState('client-register');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      defaultActiveKey={key}
      className="mb-3"
     
    >
      <Tab eventKey="client-register" title="Comptes" tabClassName="tabs-color"> 
      <DisplayAccounts/>
      </Tab>
      <Tab eventKey="comptes" title="Transactions" tabClassName="tabs-color">
      <DisplayTransactions />
      </Tab>
      <Tab eventKey="Recherche" title="Virements" tabClassName="tabs-color" >
        <MakeTransfer />
      </Tab>
      <Tab eventKey="transactions" title="Benificiares" tabClassName="tabs-color">
        <AddBenificiare />
      </Tab>
     
    </Tabs>
  );
}

export default ClientBoard;