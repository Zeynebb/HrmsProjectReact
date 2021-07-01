import React, { useEffect, useState } from 'react'
import WorkExperienceService from '../../services/WorkExperienceService'
import { Table, Segment, Image, Button, Grid } from 'semantic-ui-react'
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
                        <Segment>
                            <Grid style={{ fontSize: "15px" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "4%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788957/work_vaf7yi.png' size='mini' style={{ marginTop: "5em" }} />
                                </Grid.Column>
                                <Grid.Column width={11} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Pozisyon Adı:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p>{workExperience.positionName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>İş Yeri:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{workExperience.workplaceName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Başlangıç Tarihi:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{moment(workExperience.startingDate).format("DD.MM.yyyy")}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Bitiş Tarihi:</p>

                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                {workExperience.endingdate == null &&
                                                    <p>Devam Ediyor</p>
                                                }
                                                {workExperience.endingdate != null &&
                                                    <p>{moment(workExperience.endingdate).format("DD.MM.yyyy")}</p>
                                                }
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={2} style={{ marginTop: "3%" }}>
                                    <Button onClick={() => handleGetWorkExperience(workExperience)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
