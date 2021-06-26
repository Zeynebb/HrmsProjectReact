import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Segment, Table } from 'semantic-ui-react'
import JobSeekerService from '../../services/JobSeekerService'
import CvPhotos from '../cvPhotos/CvPhotos'

export default function JobSeekerDetail() {

    let { jobSeekerId } = useParams()
    let { cvId } = useParams()

    const [jobSeeker, setJobSeeker] = useState({})

    useEffect(() => {
        let jobSeekerService = new JobSeekerService()
        jobSeekerService.getJobSeekerByUserId(jobSeekerId).then(result => setJobSeeker(result.data.data))
    }, [])

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
                                <p>{jobSeeker.firstName}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Soyisim:</p>
                            </td>
                            <td className="rightTd">
                                <p>{jobSeeker.lastName}</p>
                            </td>

                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Email:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{jobSeeker.email}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Doğum Yılı:</p>
                            </td>
                            <td className="rightTd" >
                                <p>{jobSeeker.birthYear}</p>
                            </td>

                        </tr>
                    </td>
                </Table>
            </Segment.Group>
        </div>
    )
}
