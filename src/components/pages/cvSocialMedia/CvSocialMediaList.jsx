import React, { useEffect, useState } from 'react'
import CvSocialMediaService from '../../services/CvSocialMediaService'
import { Segment, Image, Button, Grid, Icon } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import getCvSocialMedia, { getCvSocialMediaState } from '../../../store/actions/CvSocialMediaActions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function CvSocialMediaList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvSocialMedia, setCvSocialMedia] = useState([]);
    let cvSocialMediaService = new CvSocialMediaService()

    useEffect(() => {
        cvSocialMediaService.getCvSocialMediaByCvId(cvId).then(result => setCvSocialMedia(result.data.data))
    }, [])

    const handleGetSocialMedia = (cvSocialMedia) => {
        dispatch(getCvSocialMedia(cvSocialMedia));
    }
    const handleGetSocialMediaState = (state) => {
        let newState = { state }
        dispatch(getCvSocialMediaState(newState));
    }
    function deleteCvSocialMedia(cvSocialMediaId) {
        cvSocialMediaService.delete(cvSocialMediaId).then(result => console.log(result.data.message))
        toast.success("Sosyal Medya Bilgisi Silindi")
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10} style={{ textAlign: "left", marginTop: "1%" }}>
                                <h3 className="headerThree">Sosyal Medyalar </h3>
                            </Grid.Column>
                            <Grid.Column width={6} style={{ textAlign: "right" }}>
                                <Button onClick={() => handleGetSocialMediaState(2)} style={{ fontFamily: "Arial" }} fluid>
                                    <Icon name="plus"></Icon>Yeni Sosyal Medya Ekle</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                {
                    cvSocialMedia.map(cvSocialMedia => (
                        <Segment>
                            <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "4%" }}>
                                    {cvSocialMedia.socialMediaId === 1 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787549/GithubIcon_y0llz4.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId === 2 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787722/LinkedinIcon_uvdeca.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId === 3 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787549/instagramIcon_yuaose.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId === 4 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787722/FacebookIcon_dijgdv.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId === 5 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787721/twitterIcon_cyqmri.png' size='mini' />
                                    }
                                </Grid.Column>
                                <Grid.Column width={8} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Sosyal Medya Ad??:</p>
                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p >{cvSocialMedia.socialMediaName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={7} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Sosyal Medya Linki:</p>
                                            </Grid.Column>
                                            <Grid.Column width={9} style={{ textAlign: "left" }}>
                                                <p>{cvSocialMedia.link}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={5} style={{ marginTop: "3%" }}>
                                    <Button onClick={() => { handleGetSocialMedia(cvSocialMedia); handleGetSocialMediaState(1) }}
                                        style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>G??ncelle</Button>
                                    <Button onClick={() => deleteCvSocialMedia(cvSocialMedia.cvSocialMediaId)}
                                        style={{ float: "right", backgroundColor: "#505050", color: "white", marginLeft: "1em" }}>Sil</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
