import React from 'react'
import Table from 'react-bootstrap/Table';


function TableC({ tableData , tableHead}) {

    const mapping = new Map();
    mapping.set('DEPOT', 'text-success add-plus ');
    mapping.set('RETRAIT', 'text-danger add-minus');
    mapping.set('VIREMENT','text-info add-minus-warning');


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
                                <td>{data.ribCompte}</td>
                                <td>{data.referenceTransaction}</td>
                                <td>{data.typeTransaction}</td>
                                <td>{data.dateExecution.substring(0,10)}</td>
                                <td className={`${mapping.get(data.typeTransaction)} add`} >{data.montant}</td>
                                <td><img src={`${data.executed ? 
                                "https://img.icons8.com/external-bearicons-glyph-bearicons/32/12B886/external-settings-approved-and-rejected-bearicons-glyph-bearicons.png" :
                                 "https://img.icons8.com/ios-filled/32/FD7E14/in-progress.png"}`}/></td>
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

// ? new Date(data.dateExecution.substring(0,10))<new Date()