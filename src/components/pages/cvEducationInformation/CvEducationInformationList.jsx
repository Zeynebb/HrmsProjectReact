import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Table, Segment, Image } from 'semantic-ui-react'
import { useParams } from 'react-router'
import '../../../css/CvList.css'

export default function CvEducationInformationList() {

    let { cvId } = useParams()

    const [educationInformations, setEducationInformations] = useState([])

    useEffect(() => {
        let educationInformationService = new EducationInformationService()
        educationInformationService.getEducationInformationsByCvId(cvId).then(result => setEducationInformations(result.data.data))
    }, [])

    return (
        <div>

            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Eğitim Bilgileri </h3></Segment>
                {
                    educationInformations.map(educationInformation => (
                        <Table className="cvTable">
                            <td width="5%">
                                <tr>
                                </tr>
                                <tr>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783434/university_wa4gwv.png' size='mini' style={{marginTop:"5em"}} />
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
                                        <p>{educationInformation.startingDate}</p>
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
                            </td>
                        </Table>
                    ))
                }
            </Segment.Group>
        </div>
    )
}
