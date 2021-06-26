import React, { useEffect, useState } from 'react'
import WorkExperienceService from '../../services/WorkExperienceService'
import { Table, Segment, Image, Button } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import { useDispatch, useSelector } from 'react-redux';
import { getWorkExperience } from '../../../store/actions/WorkExperienceActions';
import moment from 'moment';

export default function CvWorkExperienceList() {
    const dispatch = useDispatch()

    let { cvId } = useParams()

    const [workExperiences, setWorkExperiences] = useState([]);

    useEffect(() => {
        let workExperienceService = new WorkExperienceService()
        workExperienceService.getWorkExperiencesByCvId(cvId).then(result => setWorkExperiences(result.data.data))
    }, [])

    const handleGetWorkExperience = (workExperience) => {
        dispatch(getWorkExperience(workExperience));
    }

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
                                        <p>{workExperience.positionName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>İş Yeri:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{workExperience.workplaceName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Başlangıç Tarihi:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{moment(workExperience.startingDate).format("DD.MM.yyyy")}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Bitiş Tarihi:</p>
                                    </td>
                                    <td className="rightTd">
                                        {workExperience.endingdate == null &&
                                            <p>Devam Ediyor</p>
                                        }
                                        {workExperience.endingdate != null &&
                                            <p>{moment(workExperience.endingdate).format("DD.MM.yyyy")}</p>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                    </td>
                                    <td className="rightTd">
                                        <Button onClick={() => handleGetWorkExperience(workExperience)}
                                            style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
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
