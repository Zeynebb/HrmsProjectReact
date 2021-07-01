import React, { useEffect, useState } from 'react'
import CvSocialMediaService from '../../services/CvSocialMediaService'
import { Table, Segment, Image, Button, Grid } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import getCvSocialMedia from '../../../store/actions/CvSocialMediaActions';
import { useDispatch } from 'react-redux';

export default function CvSocialMediaList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvSocialMedia, setCvSocialMedia] = useState([]);

    useEffect(() => {
        let cvSocialMediaService = new CvSocialMediaService()
        cvSocialMediaService.getCvSocialMediaByCvId(cvId).then(result => setCvSocialMedia(result.data.data))
    }, [])

    const handleGetSocialMedia = (cvSocialMedia) => {
        dispatch(getCvSocialMedia(cvSocialMedia));
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Sosyal Medyalar </h3></Segment>
                {
                    cvSocialMedia.map(cvSocialMedia => (
                        <Segment>
                            <Grid style={{ fontSize: "15px" }}>
                                <Grid.Column width={1} style={{ marginLeft: "4%", marginTop: "4%" }}>
                                    {cvSocialMedia.socialMediaId == 1 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787549/GithubIcon_y0llz4.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId == 2 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787722/LinkedinIcon_uvdeca.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId == 3 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787549/instagramIcon_yuaose.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId == 4 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787722/FacebookIcon_dijgdv.png' size='mini' />
                                    }
                                    {cvSocialMedia.socialMediaId == 5 &&
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623787721/twitterIcon_cyqmri.png' size='mini' />
                                    }
                                </Grid.Column>
                                <Grid.Column width={12} >
                                    <Grid >
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", marginTop: "1%", fontWeight: "bold" }}>
                                                <p>Sosyal Medya Adı:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
                                                <p >{cvSocialMedia.socialMediaName}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                                <p>Sosyal Medya Linki:</p>
                                            </Grid.Column>
                                            <Grid.Column width={11} style={{ textAlign: "left" }}>
                                                <p>{cvSocialMedia.link}</p>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={2} style={{ marginTop: "3%"}}>
                                    <Button onClick={() => handleGetSocialMedia(cvSocialMedia)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </Grid.Column>
                            </Grid>

                        </Segment>
                    ))}
            </Segment.Group>
        </div>
    )
}
