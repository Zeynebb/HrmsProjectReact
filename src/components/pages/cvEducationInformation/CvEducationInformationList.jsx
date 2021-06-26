import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Table, Segment, Image, Button } from 'semantic-ui-react'
import { useParams } from 'react-router'
import '../../../css/CvList.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { getEducationInformation } from '../../../store/actions/EducationInformationActions'

export default function CvEducationInformationList({ updated }) {

    const dispatch = useDispatch()
    let { cvId } = useParams()
    let { jobSeekerId } = useParams()
    const [open, setOpen] = React.useState(false)

    const [educationInformations, setEducationInformations] = useState([])

    useEffect(() => {
        let educationInformationService = new EducationInformationService()
        educationInformationService.getEducationInformationsByCvId(cvId).then(result => setEducationInformations(result.data.data))
    }, [])

    const handleGetEducationId = (education) => {//düzenleme sayfasına giderken bilgileri göndermek için
        dispatch(getEducationInformation(education));
    }
    return (
        <div>
            {<Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Eğitim Bilgileri </h3></Segment>
                {
                    educationInformations.map(educationInformation => (
                        <Table className="cvTable">
                            <td width="5%">
                                <tr>
                                </tr>
                                <tr>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783434/university_wa4gwv.png' size='mini' style={{ marginTop: "5em" }} />
                                </tr>

                            </td>
                            <td width="95%">
                                <tr>
                                    <td className="leftTd" >
                                        <p>Üniversite Adı:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{educationInformation.universityName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Bölüm:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{educationInformation.universityDepartmentName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Başlangıç Tarihi:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{moment(educationInformation.startingDate).format("DD.MM.yyyy")}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Mezuniyet Tarihi:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{educationInformation.graduationDate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                    </td>
                                    <td className="rightTd">
                                        <Button onClick={() => handleGetEducationId(educationInformation)}
                                            style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    </td>
                                </tr>
                            </td>
                        </Table>
                    ))
                }
            </Segment.Group>
            }
        </div>

    )
}
