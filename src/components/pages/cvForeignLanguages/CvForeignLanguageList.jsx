import React, { useEffect, useState } from 'react'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'
import { Table, Segment, Image, Button, Grid } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import { useDispatch } from 'react-redux';
import getCvForeignLanguage from '../../../store/actions/CvForeignLanguageActions';

export default function CvForeignLanguageList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvForeignLanguages, setCvForeignLanguages] = useState([]);

    useEffect(() => {
        let cvForeignLanguageService = new CvForeignLanguageService()
        cvForeignLanguageService.getCvForeignLanguagesByCvId(cvId).then(result => setCvForeignLanguages(result.data.data))
    }, [])

    const handleGetForeignLanguage = (cvForeignLanguage) => {
        dispatch(getCvForeignLanguage(cvForeignLanguage));
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yabancı Diller </h3></Segment>
                {
                    cvForeignLanguages.map(cvForeignLanguage => (
                        <Segment>
                            <Grid style={{ fontSize: "15px" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "4%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783705/translate_zboywx.png' size='mini' />
                                </Grid.Column>
                                <Grid.Column width={11} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Yabancı Dil Adı:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p>{cvForeignLanguage.foreignLanguageName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Yabancı Dil Seviyesi:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{cvForeignLanguage.languageLevelName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={2} style={{ marginTop: "3%" }}>
                                    <Button onClick={() => handleGetForeignLanguage(cvForeignLanguage)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
