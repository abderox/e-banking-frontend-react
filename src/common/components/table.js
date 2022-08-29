import React from 'react'
import Table from 'react-bootstrap/Table';


function TableC({ tableData , tableHead}) {
    return (


        <div className="pt-4 mt-2 bg-color-div">
        <Table striped bordered hover>
            <thead>
                <th>N°</th>
            {tableHead.map((value,index)=>
            {
                return (<th key={index}>{value}</th>)
            }
            )}
            </thead>
            <tbody>
                {
                    tableData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.email}</td>
                                <td>{data.telephone}</td>
                                <td>{data.typepiece}</td>
                                <td>{data.numPieceIdentiteClient}</td>
                                <td>{data.provincAddress}</td>
                                <td>{data.rue}</td>
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