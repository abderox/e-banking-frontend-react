import React from 'react'
import Table from 'react-bootstrap/Table';


function TableC({ tableData , tableHead}) {
    return (


        <div className="pt-4 mt-2 bg-color-table overflow-auto">
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
                                <td>{data.ribEmetteur}</td>
                                <td>{data.ribBenificiaire}</td>
                                <td>{data.typeVirement}</td>
                                <td>{data.montant}</td>
                                <td>{data.dateExecution}</td>
                                {/* <td><button className="refresh-button">action</button></td> */}
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