import React, { useEffect, useState } from 'react'
import { Segment, Table } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService'
import '../../../css/JobAdvertisement.css'
import { useParams } from 'react-router'

export default function EmployerDetail() {

    let { employerId } = useParams()

    const [employer, setEmployer] = useState({})

    useEffect(() => {
        let employerService = new EmployerService()
        employerService.getByEmployerForUserId(employerId).then(result => setEmployer(result.data.data))
    }, [])


    return (
        <div>
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
                </Table>
            </Segment.Group>

        </div>
    )
}
