import React from 'react'
import Table from 'react-bootstrap/Table';
import ModalBoot from './modal'
import CheckStatus from '../../../common/components/checkStatus';

function TableC({ tableData , tableHead,handleRefresh}) {

    const mapping = new Map();
    mapping.set("M", ["monthly","success"]);
    mapping.set("W", ["weekly","info"]);
    mapping.set("D", ["daily","warning"]);
    mapping.set("A", ["yearly","dark"]);
    mapping.set("O", ["once","danger"]);
    mapping.set("F", ["fortnightly","secondary"]);

    return (


        <div className="pt-4 mt-2 bg-color-table overflow-auto ">
        <Table striped bordered hover >
            <thead>
                <tr>
            {tableHead.map((value,index)=>
            {
                return (<th key={index}>{value}</th>)
            }
            )}
            </tr>
            </thead>
            <tbody className="tbody-table">
                {
                    tableData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.intituleVirementBenificiaire}</td>
                                <td>{data.nature}</td>
                                <td>{data.nomBenificiaire}</td>
                                <td>{data.ribBenificiaire}</td>
                                <td><CheckStatus status={mapping.get(data.periodicity)[0]} type={mapping.get(data.periodicity)[1]} /></td>
                                <td><ModalBoot data={data} key={index} handleRefresh={handleRefresh} mapping={mapping} /></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
        </div>


    )
}
export default TableC;