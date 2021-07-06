import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Grid, Segment, Table } from 'semantic-ui-react'
import JobSeekerService from '../../services/JobSeekerService'
import CvPhotos from '../cvPhotos/CvPhotos'

export default function JobSeekerDetail() {

    let { userId } = useParams()
    let { cvId } = useParams()

    const [jobSeeker, setJobSeeker] = useState({})

    useEffect(() => {
        let jobSeekerService = new JobSeekerService()
        jobSeekerService.getJobSeekerByUserId(userId).then(result => setJobSeeker(result.data.data))
    }, [])

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">İletişim Bilgileri </h3></Segment>
                <Segment>
                    <Grid style={{ fontSize: "17px", fontFamily:"Arial" }}>
                        <Grid.Column width={4} style={{ marginLeft: "4%", marginTop: "3%" }}>
                            <CvPhotos />
                            </Grid.Column>
                        <Grid.Column width={10} >
                            <Grid >
                                <Grid.Row>
                                    <Grid.Column width={4} style={{ textAlign: "left", marginTop: "1%", fontWeight: "bold" }}>
                                        <p>İsim:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12} style={{ textAlign: "left", marginTop: "1%" }}>
                                        {jobSeeker.firstName}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={4} style={{ textAlign: "left",fontWeight: "bold" }}>
                                        <p>Soyisim:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12} style={{ textAlign: "left" }}>

                                        <p>{jobSeeker.lastName}</p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={4} style={{ textAlign: "left", fontWeight: "bold" }}>
                                        <p>Email:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12} style={{ textAlign: "left" }}>
                                        <p>{jobSeeker.email}</p>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={4} style={{textAlign: "left", fontWeight: "bold" }}>
                                        <p>Doğum Yılı:</p>
                                    </Grid.Column>
                                    <Grid.Column width={12} style={{ textAlign: "left" }}>
                                        <p>{jobSeeker.birthYear}</p>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        </div>
    )
}
