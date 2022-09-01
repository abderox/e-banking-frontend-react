import React from 'react'
import Table from 'react-bootstrap/Table';
import SpinnerGrow from '../../../common/components/spinner'
import CheckStatus from '../components/checkStatus'
import ModalBoot from './modal';


function TableC({ tableData, tableHead, loading, handleRefresh }) {

  

    const mappingStatus = new Map();
    mappingStatus.set("ACTIVE", "success");
    mappingStatus.set("DESACTIVE", "danger");
    mappingStatus.set("SUSPENDU", "warning");
    mappingStatus.set("BLOQUE", "dark");

    return (


        <div className="pt-2 mt-1 bg-color-table overflow-auto">
            <button type="button" className="refresh-button" onClick={handleRefresh}><img src="https://img.icons8.com/sf-black-filled/28/FFFFFF/recurring-appointment.png" alt="reset" /></button>

            <Table striped bordered hover >
                <thead>
                    <tr>
                        {tableHead.map((value, index) => {
                            return (<th key={index}>{value}</th>)
                        }
                        )}
                    </tr>
                </thead>
                <tbody>
                    {loading ? <tr><td colSpan={tableHead.length}><SpinnerGrow /></td></tr> :
                        tableData.map((data, index) => {
                            return (
                                <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td><img src="https://img.icons8.com/ios-filled/20/40C057/hashtag-large.png" alt="img"/><span className="p-2 ">{data.identifiantClient}</span></td>
                                    <td><img src="https://img.icons8.com/pastel-glyph/26/40C057/email--v1.png"  alt="img"/><span className="p-2 ">{data.email}</span></td>
                                    <td ><img src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/24/40C057/external-telephone-contact-us-kmg-design-glyph-kmg-design.png"  alt="img"/><span className="p-2 " >{data.telephone}</span></td>
                                    <td><img src="https://img.icons8.com/sf-regular/26/40C057/region-code.png"/>{data.provinceAddress}</td>
                                    <td><img src="https://img.icons8.com/material-outlined/24/40C057/crossed-out-date.png"  alt="img"/><span className="p-2 ">{data.createdAt.substring(0, 10)}</span></td>
                                    <td><CheckStatus type={mappingStatus.get(data.status)} status={data.status} /></td>
                                    <td>
                                    <ModalBoot data={data.identifiantClient} key={index}/></td>
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