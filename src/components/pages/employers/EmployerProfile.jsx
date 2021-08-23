import React, { useEffect, useState } from 'react'
import { Segment, Table, Button, Grid } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService'
import '../../../css/JobAdvertisement.css'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { getEmployer } from '../../../store/actions/EmployerActions';
import EmployerMenu from '../../LeftMenu/EmployerMenu'
import ZYBaseGrid from '../../toolbox/ZYBaseGrid'

export default function EmployerDetail() {
    const dispatch = useDispatch()

    let { userId } = useParams()

    const [employer, setEmployer] = useState({})

    useEffect(() => {
        let employerService = new EmployerService()
        employerService.getByEmployerForUserId(userId).then(result => setEmployer(result.data.data))
    }, [])

    function handleGetEmployer(employer) {
        dispatch(getEmployer(employer))
    }

    return (
        <div>
            <ZYBaseGrid menu={<EmployerMenu />}
                contents={
                    <Segment.Group>
                        <Segment style={{ backgroundColor: "black" }}>
                            <h3 style={{ backgroundColor: "black", color: "white", textAlign: "left", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }} >
                                Firma Bilgileri</h3>
                        </Segment>
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
                                <td className="leftTd" >
                                </td>
                                <td >
                                    <Button onClick={() => handleGetEmployer(employer)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    {employer.updateStatus == false && employer.update != null &&
                                        <p style={{ fontSize: "15px" }}>
                                            <Button style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }} disabled>
                                                Onay Bekliyor</Button></p>}
                                </td>
                            </tr>
                        </Table>
                    </Segment.Group>
                } />
        </div>
    )
}
