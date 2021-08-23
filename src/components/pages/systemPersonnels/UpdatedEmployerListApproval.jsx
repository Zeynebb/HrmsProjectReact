import React, { useEffect, useState } from 'react'
import { Table, Segment, Button, Header } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService'
import { useParams } from 'react-router';
import '../../../css/JobAdvertisement.css'
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import ZYBaseGrid from '../../toolbox/ZYBaseGrid';
import SystemPersonnelMenu from '../../LeftMenu/SystemPersonnelMenu';

export default function UpdatedEmployerListApproval() {

    let { userId } = useParams()

    let [employer, setEmployers] = useState({})
    let employerService = new EmployerService()

    useEffect(() => {
        employerService.getByEmployerForUserId(userId).then(result => setEmployers(result.data.data))
    }, [])
    console.log(employer)

    function updatedEmployerApproval(employerId) {
        employerService.updatedEmployerApproval(employerId).then(result => console.log(result.data.message))
        toast.success("Onaylama Başarılı.")
    }

    return (
        <div>
            <ZYBaseGrid
                menu={<SystemPersonnelMenu />}
                contents={<Table className="jobAdvertisementTable">
                    <Segment style={{ backgroundColor: "black" }}>
                        <h3 style={{ backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif", textAlign: "center" }} >Firma Bilgileri
            </h3>
                    </Segment>
                    <Segment.Group horizontal >
                        <Segment>
                            <Header as="h4" block style={{ color: "white", backgroundColor: "#505050" }}>Eski Bilgiler</Header>
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
                                <td></td>
                                <td></td>
                            </tr>
                        </Segment>
                        <Segment>
                            <Header as="h4" block style={{ color: "white", backgroundColor: "#780000" }}>Yeni Bilgiler</Header>
                            <tr>
                                <td className="leftTd" >
                                    <p>Şirket İsmi:</p>
                                </td>
                                <td className="rightTd" >
                                    <p>{employer.update?.companyName}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Website:</p>
                                </td>
                                <td className="rightTd">
                                    <p>{employer.update?.website}</p>
                                </td>

                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Email:</p>
                                </td>
                                <td className="rightTd" >
                                    <p>{employer.update?.email}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Telefon Numarası:</p>
                                </td>
                                <td className="rightTd" >
                                    <p>{employer.update?.phoneNumber}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button as={NavLink} to="/updatedEmployerList"
                                        style={{ backgroundColor: "black", color: "white", marginBottom: "0.001em" }} >GERİ DÖN</Button>
                                </td>
                                <td>
                                    <Button onClick={() => updatedEmployerApproval(userId)}
                                        style={{ backgroundColor: "#780000", color: "white", marginBottom: "0.001em", marginLeft: "50%" }}>ONAYLA</Button>
                                </td>
                            </tr>
                        </Segment>
                    </Segment.Group>
                </Table>}
            />
        </div>
    )
}
