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
            <tbody>
                {
                    tableData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.intituleVirement}</td>
                                <td>{data.nature}</td>
                                <td>{data.nom}</td>
                                <td>{data.rib}</td>
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