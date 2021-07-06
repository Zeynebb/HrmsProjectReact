import React, { useEffect, useState } from 'react'
import WorkExperienceService from '../../services/WorkExperienceService'
import { Table, Segment, Image, Button, Grid,Icon  } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import { useDispatch, useSelector } from 'react-redux';
import { getWorkExperience } from '../../../store/actions/WorkExperienceActions';
import moment from 'moment';
import getCvWorkExperienceState from '../../../store/actions/CvWorkExperienceActions';

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
    const handleWorExperienceState = (state) => {
        let newState = { state }
        dispatch(getCvWorkExperienceState(newState));
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} style={{ textAlign: "left", marginTop: "1%",fontFamily: "Arial" }}>
                                <h3 className="headerThree">İş Deneyimleri </h3>
                            </Grid.Column>
                            <Grid.Column width={6} style={{ textAlign: "right" }}>
                                <Button onClick={() => handleWorExperienceState(2)} style={{ fontFamily: "Arial"}} fluid>
                                    <Icon name="plus"></Icon> Yeni İş Deneyimi Ekle</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {
                    workExperiences.map(workExperience => (
                        <Segment>
                            <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "1%" }}>
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
                                <Grid.Column width={2} style={{ marginTop: "8%" }}>
                                    <Button onClick={() => { handleGetWorkExperience(workExperience); handleWorExperienceState(1) }}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
