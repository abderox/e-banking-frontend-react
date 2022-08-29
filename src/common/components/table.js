import React from 'react'
import Table from 'react-bootstrap/Table';


function TableC({ tableData }) {
    return (


        <div className="pt-4 mt-2 bg-color-div">
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>S.N</th>
                    <th>Full Name</th>
                    <th>Email Address</th>
                    <th>Salary</th>
                </tr>
            </thead>
            <tbody>
                {
                    tableData.map((data, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.fullName}</td>
                                <td>{data.emailAddress}</td>
                                <td>{data.salary}</td>
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