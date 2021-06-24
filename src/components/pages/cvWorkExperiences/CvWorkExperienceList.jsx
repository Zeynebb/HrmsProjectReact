import React, { useEffect, useState } from 'react'
import WorkExperienceService from '../../services/WorkExperienceService'
import { Table, Segment, Image } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'

export default function CvWorkExperienceList() {

    let { cvId } = useParams()

    const [workExperiences, setWorkExperiences] = useState([]);

    useEffect(() => {
        let workExperienceService = new WorkExperienceService()
        workExperienceService.getWorkExperiencesByCvId(cvId).then(result => setWorkExperiences(result.data.data))
    }, [])


    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">İş Deneyimleri </h3></Segment>
                {
                    workExperiences.map(workExperience => (
                        <Table className="cvTable">
                            <td width="5%">
                                <tr>
                                </tr>
                                <tr>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788957/work_vaf7yi.png' size='mini' style={{ marginTop: "5em" }} />
                                </tr>
                            </td>
                            <td width="95%">
                                <tr>
                                    <td className="leftTd" >
                                        <p>Pozisyon Adı:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{workExperience.workplaceName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>İş Yeri:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{workExperience.startingDate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Başlangıç Tarihi:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{workExperience.endingdate}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Bitiş Tarihi:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{workExperience.positionName}</p>
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
