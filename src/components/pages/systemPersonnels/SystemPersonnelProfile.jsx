import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { Segment, Table,Button } from 'semantic-ui-react'
import PersonnelService from '../../services/PersonnelService'
import CvPhotos from '../cvPhotos/CvPhotos'
import { getSystemPersonnel } from '../../../store/actions/SystemPersonnelActions';

export default function SystemPersonnelProfile() {

    const dispatch = useDispatch()
    let { userId } = useParams()

    const [personnel, setPersonnel] = useState({})

    useEffect(() => {
        let personnelService = new PersonnelService()
        personnelService.getByPersonnelId(userId).then(result => setPersonnel(result.data.data))
    }, [])

    const handleGetSystemPersonnel = (systemPersonnel) => {
        dispatch(getSystemPersonnel(systemPersonnel));
    }

    return (
        <div>
            <Segment.Group>
                <Segment inverted style={{ textAlign: "left" }}><h3 className="headerThree" >İletişim Bilgileri </h3></Segment>
                <Table className="cvTable">
                    <td width="10%">
                        <tr>
                        </tr>
                        <tr>
                            <CvPhotos />
                        </tr>
                    </td>
                    <td width="90%">
                        <tr>
                            <td className="leftTd" >
                                <p>İsim:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{personnel.firstName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Soyisim:</p>
                            </td>
                            <td className="rightTd">
                                <p>{personnel.lastName}</p>
                            </td>

                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Email:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{personnel.email}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Şifre:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{personnel.password}</p>
                            </td>
                        </tr>
                        <tr>
                            <td >
                            </td>
                            <td >
                                <Button onClick={() => handleGetSystemPersonnel(personnel)}
                                    style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                            </td>
                        </tr>
                    </td>
                </Table>
            </Segment.Group>
        </div>
    )
}
