import React, { useEffect, useState } from 'react'
import { Button } from 'rebass';
import { Segment, Table } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService';
import PersonnelService from '../../services/PersonnelService';

export default function ApprovedEmployerList() {

    const [employers, setEmployers] = useState([]);
    let employerService = new EmployerService()
    let personnelService = new PersonnelService()

    useEffect(() => {
        employerService.getAllEmployerByVerificationStatus(true).then(result => setEmployers(result.data.data))
    }, [])

    function employerVerification(employerId, status) {
        personnelService.employerVerification(employerId, status).then(result => console.log(result.data.message))
    } 

    return (
        <div>
            { employers.map(employer => (
                <Segment.Group>
                    <Segment style={{ backgroundColor: "black" }}><h3 style={{ backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }} >Firma Bilgileri</h3></Segment>
                    <Table className="jobAdvertisementTable">
                        <tr>
                            <td className="leftTd" >
                                <p>Şirket İsmi:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{employer.companyName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Website:</p>
                            </td>
                            <td className="rightTd">
                                <p>{employer.website}</p>
                            </td>

                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Email:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{employer.email}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Telefon Numarası:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{employer.phoneNumber}</p>
                            </td>
                        </tr>
                        <tr>
                            <td  >
                            </td>
                            <td  >
                                <Button onClick={() => employerVerification(employer.userId, false)} style={{ backgroundColor: "#505050", color: "white", marginBottom: "0.001em" }}>Onayı İptal Et</Button>
                            </td>
                        </tr>

                    </Table>
                </Segment.Group>
            ))}
        </div>
    )
}
