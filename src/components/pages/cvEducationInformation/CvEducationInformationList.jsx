import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Table, Segment, Image, Button, Grid } from 'semantic-ui-react'
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
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Eğitim Bilgileri </h3></Segment>
                {
                    educationInformations.map(educationInformation => (
                        <Segment>
                            <Grid style={{ fontSize: "15px" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "2%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783434/university_wa4gwv.png' size='mini' style={{ marginTop: "5em" }} />
                                </Grid.Column>
                                <Grid.Column width={11} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Üniversite Adı:</p>

                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p>{educationInformation.universityName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Bölüm:</p>

                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{educationInformation.universityDepartmentName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Başlangıç Tarihi:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{moment(educationInformation.startingDate).format("DD.MM.yyyy")}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Mezuniyet Tarihi:</p>

                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{educationInformation.graduationDate}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={2} style={{ marginTop: "8%" }}>
                                    <Button onClick={() => handleGetEducationId(educationInformation)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>
        </div>

    )
}
