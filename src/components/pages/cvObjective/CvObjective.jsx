import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Segment, Table, Button, Grid } from 'semantic-ui-react';
import { getCv } from '../../../store/actions/CvActions';
import CvService from '../../services/CvService';

export default function CvObjective() {

    let { cvId } = useParams()

    const dispatch = useDispatch()
    let cvService = new CvService()

    let [cvs, setCvs] = useState([])

    useEffect(() => {
        cvService.getCvsByCvId(cvId).then(result => setCvs(result.data.data))
    }, [])

    const handleGetCvId = (cv) => {
        dispatch(getCv(cv));
    }
    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Ön Söz </h3></Segment>
                {
                    cvs.map(cv => (
                        <Segment>

                            <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                <Grid.Column width={1} style={{ marginLeft: "4%" }}>
                                    <p style={{ fontSize: "25px" }}>&#9733;</p>
                                </Grid.Column>
                                <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%",minHeight:70 }}>
                                    {cv.objective != null &&
                                        <p>{cv.objective}</p>
                                    }
                                    {cv.objective == null &&
                                        <p style={{color:"grey"}}>İş verenlerin sizi daha iyi tanıyabilmesi için ön söz ekleyebilirsiniz...</p>
                                    }

                                </Grid.Column>
                                <Grid.Column width={3}>
                                    {cv.objective != null &&
                                        <Button onClick={() => handleGetCvId(cv)}
                                            style={{ float: "right", backgroundColor: "black", color: "white", }}>Güncelle</Button>}
                                    {cv.objective == null &&
                                        <Button onClick={() => handleGetCvId(cv)}
                                            style={{ float: "right", backgroundColor: "black", color: "white", }}>Ekle</Button>}
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
