import React, { useEffect, useState } from 'react'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'
import { Segment, Image, Button, Grid, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import { useDispatch } from 'react-redux';
import getCvForeignLanguage, { getCvForeignLanguageState } from '../../../store/actions/CvForeignLanguageActions';
import { toast } from 'react-toastify';

export default function CvForeignLanguageList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvForeignLanguages, setCvForeignLanguages] = useState([]);
    let cvForeignLanguageService = new CvForeignLanguageService()

    useEffect(() => {
        cvForeignLanguageService.getCvForeignLanguagesByCvId(cvId).then(result => setCvForeignLanguages(result.data.data))
    }, [])

    const handleGetForeignLanguage = (cvForeignLanguage) => {
        dispatch(getCvForeignLanguage(cvForeignLanguage));
    }
    const handleGetForeignLanguageState = (state) => {
        let newState = { state }
        dispatch(getCvForeignLanguageState(newState));
    }
    function deleteCvForeignLanguage(cvForeignLanguageId) {
        cvForeignLanguageService.delete(cvForeignLanguageId).then(result => console.log(result.data.message))
        toast.success("Yabancı Dil Bilgisi Silindi")
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} style={{ textAlign: "left", marginTop: "1%", fontFamily: "Arial" }}>
                                <h3 className="headerThree">Yabancı Diller </h3>
                            </Grid.Column>
                            <Grid.Column width={6} style={{ textAlign: "right" }}>
                                <Button onClick={() => handleGetForeignLanguageState(2)} style={{ fontFamily: "Arial" }} fluid>
                                    <Icon name="plus"></Icon> Yeni Yabancı Dil Ekle</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {
                    cvForeignLanguages.map(cvForeignLanguage => (
                        <Segment>
                            <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "3%" }}>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783705/translate_zboywx.png' size='mini' />
                                </Grid.Column>
                                <Grid.Column width={8} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Yabancı Dil Adı:</p>
                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p>{cvForeignLanguage.foreignLanguageName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Yabancı Dil Seviyesi:</p>
                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left" }}>
                                                <p>{cvForeignLanguage.languageLevelName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={5} style={{ marginTop: "3%" }}>
                                    <Button onClick={() => { handleGetForeignLanguage(cvForeignLanguage); handleGetForeignLanguageState(1) }}
                                        style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    <Button onClick={() => deleteCvForeignLanguage(cvForeignLanguage.cvForeignLanguageId)}
                                        style={{ float: "right", backgroundColor: "#505050", color: "white", marginLeft: "1em" }}>Sil</Button>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
