import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Table, Segment, Image, Button, Grid, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router'
import '../../../css/CvList.css'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { getEducationInformation } from '../../../store/actions/EducationInformationActions'
import getEducationInformationState from '../../../store/actions/CvEducationInformationActions'
import { toast } from 'react-toastify'

export default function CvEducationInformationList({ updated }) {

    const dispatch = useDispatch()
    let { cvId } = useParams()
    let { jobSeekerId } = useParams()
    const [open, setOpen] = React.useState(false)

    const [educationInformations, setEducationInformations] = useState([])
    let educationInformationService = new EducationInformationService()

    useEffect(() => {
        educationInformationService.getEducationInformationsByCvId(cvId).then(result => setEducationInformations(result.data.data))
    }, [])

    const handleGetEducationId = (education) => {//düzenleme sayfasına giderken bilgileri göndermek için
        dispatch(getEducationInformation(education));
    }

    const handleGetEducationState = (state) => {
        let newState = { state }
        dispatch(getEducationInformationState(newState));
    }
    function deleteEducationInformation(educationId) {
        educationInformationService.delete(educationId).then(result => console.log(result.data.message))
        toast.success("Eğitim Bilgisi Silindi")
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" >
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} style={{ textAlign: "left", marginTop: "1%" }}>
                                <h3 className="headerThree">Eğitim Bilgileri </h3>
                            </Grid.Column>
                            <Grid.Column width={6} style={{ textAlign: "right" }}>
                                <Button onClick={() => handleGetEducationState(2)} style={{ fontFamily: "Arial" }} fluid>
                                    <Icon name="plus"></Icon>Yeni Eğitim Bilgisi Ekle</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {
                    educationInformations.map(educationInformation => (
                        <Segment>
                            <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "1%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783434/university_wa4gwv.png' size='mini' style={{ marginTop: "5em" }} />
                                </Grid.Column>
                                <Grid.Column width={8} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Üniversite Adı:</p>

                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p>{educationInformation.universityName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Bölüm:</p>

                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left" }}>
                                                <p>{educationInformation.universityDepartmentName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Başlangıç Tarihi:</p>
                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left" }}>
                                                <p>{moment(educationInformation.startingDate).format("DD.MM.yyyy")}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Mezuniyet Tarihi:</p>

                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left" }}>
                                                <p>{educationInformation.graduationDate}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={5} style={{ marginTop: "8%" }}>
                                    <Button onClick={() => { handleGetEducationId(educationInformation); handleGetEducationState(1) }}
                                        style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    <Button onClick={() => deleteEducationInformation(educationInformation.educationInformationId)}
                                        style={{ float: "right", backgroundColor: "#505050", color: "white", marginLeft: "1em" }}>Sil</Button>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    ))}
            </Segment.Group>
        </div>

    )
}
