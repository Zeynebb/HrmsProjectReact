import React, { useEffect, useState } from 'react'
import CvTechnologyService from '../../services/CvTechnologyService'
import { Segment, Image, Button, Grid, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import getCvTechnology from '../../../store/actions/CvTechnologyActions';
import getCvTechnologyState from '../../../store/actions/CvTechnologyStateActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function CvTechnologyList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvTechnologies, setCvTechnologies] = useState([]);
    let cvTechnologyService = new CvTechnologyService()
    useEffect(() => {
        cvTechnologyService.getCvTechnologiesByCvId(cvId).then(result => setCvTechnologies(result.data.data))
    }, [])

    const handleGetTechnology = (cvTechnology) => {
        dispatch(getCvTechnology(cvTechnology));
    }
    const handleGetTechnologyState = (state) => {
        let newState = { state }
        dispatch(getCvTechnologyState(newState));
    }
    function deleteTechnologies(cvTechnologyId) {
        cvTechnologyService.delete(cvTechnologyId).then(result => console.log(result.data.message))
        toast.success("Yetenek Bilgisi Silindi.")
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} style={{ textAlign: "left", marginTop: "1%", fontFamily: "Arial" }}>
                                <h3 className="headerThree">Yetenekler </h3>
                            </Grid.Column>
                            <Grid.Column width={6} style={{ textAlign: "right" }}>
                                <Button onClick={() => handleGetTechnologyState(2)} style={{ fontFamily: "Arial" }} fluid>
                                    <Icon name="plus"></Icon> Yeni Yetenek Ekle</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {
                    cvTechnologies.map(cvTechnology => (
                        <Segment>
                            <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788178/technologyIcon_kqtmh7.png' size='mini' />
                                </Grid.Column>
                                <Grid.Column width={3} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                    <p>Teknoloji Adı: </p>
                                </Grid.Column>
                                <Grid.Column width={4} style={{ textAlign: "left", marginTop: "1%" }}>
                                    <p> {cvTechnology.technologyname}</p>
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Button onClick={() => { handleGetTechnology(cvTechnology); handleGetTechnologyState(1) }}
                                        style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    <Button onClick={() => deleteTechnologies(cvTechnology.cvTechnologyId)}
                                        style={{ float: "right", backgroundColor: "#505050", color: "white", marginLeft: "1em" }}>Sil</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>

        </div>
    )
}
