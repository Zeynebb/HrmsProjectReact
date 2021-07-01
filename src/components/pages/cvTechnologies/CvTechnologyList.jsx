import React, { useEffect, useState } from 'react'
import CvTechnologyService from '../../services/CvTechnologyService'
import { Table, Segment, Image, Button, Grid } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import getCvTechnology from '../../../store/actions/CvTechnologyActions';
import { useDispatch } from 'react-redux';

export default function CvTechnologyList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvTechnologies, setCvTechnologies] = useState([]);

    useEffect(() => {
        let cvTechnologyService = new CvTechnologyService()
        cvTechnologyService.getCvTechnologiesByCvId(cvId).then(result => setCvTechnologies(result.data.data))
    }, [])

    const handleGetTechnology = (cvTechnology) => {
        dispatch(getCvTechnology(cvTechnology));
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yetenekler </h3></Segment>
                {
                    cvTechnologies.map(cvTechnology => (
                        <Segment>
                            <Grid style={{ fontSize: "15px" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788178/technologyIcon_kqtmh7.png' size='mini' />
                                </Grid.Column>
                                <Grid.Column width={3} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                    <p>Teknoloji Adı: </p>
                                </Grid.Column>
                                <Grid.Column width={7} style={{ textAlign: "left", marginTop: "1%" }}>
                                    <p> {cvTechnology.technologyname}</p>
                                </Grid.Column>
                                <Grid.Column width={3}>
                                    <Button onClick={() => handleGetTechnology(cvTechnology)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>

        </div>
    )
}
