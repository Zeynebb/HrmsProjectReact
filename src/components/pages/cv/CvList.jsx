import React, { useEffect, useState } from 'react'
import CvService from '../../services/CvService'
import { Table, Image, Segment } from 'semantic-ui-react'
import '../../../css/CvList.css'
import CvEducationInformationList from '../cvEducationInformation/CvEducationInformationList';
import CvWorkExperienceList from '../cvWorkExperiences/CvWorkExperienceList';
import CvTechnologyList from '../cvTechnologies/CvTechnologyList';
import CvSocialMediaList from '../cvSocialMedia/CvSocialMediaList';
import CvForeignLanguageList from '../cvForeignLanguages/CvForeignLanguageList';
import { useParams } from 'react-router';

export default function CvList() {

    let { cvId } = useParams()

    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        let cvService = new CvService()
        cvService.getCvsByCvId(cvId).then(result => setCvs(result.data.data))
    }, [])

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted style={{ textAlign: "left" }}><h3 className="headerThree" >İletişim Bilgileri </h3></Segment>
                {
                    cvs.map(cv => (
                        <Table className="cvTable">
                            <td width="10%">
                                <tr>
                                </tr>
                                <tr>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623358602/user_z5bivv.png' size='small' />
                                </tr>
                            </td>
                            <td width="90%">
                                <tr>
                                    <td className="leftTd" >
                                        <p>Ad Soyad:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{cv.firstName} {cv.lastName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Email:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{cv.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Doğum Tarihi:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p> {cv.birthYear}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Önsöz:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{cv.objective}</p>
                                    </td>
                                </tr>
                            </td>
                        </Table>
                    ))
                }
            </Segment.Group>
            <CvEducationInformationList />
            <br />
            <br />
            <CvWorkExperienceList />
            <br />
            <br />
            <CvTechnologyList />
            <br />
            <br />
            <CvForeignLanguageList />
            <br />
            <br />
            <CvSocialMediaList />
            <br />
            <br />
        </div>
    )
}
