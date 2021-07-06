import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button, Dropdown, Grid, Image, Segment, TextArea } from 'semantic-ui-react'
import SocialMediaService from '../../services/SocialMediaService'
import * as Yup from "yup";
import CvSocialMediaService from '../../services/CvSocialMediaService'
import getCvSocialMedia, { getCvSocialMediaState } from '../../../store/actions/CvSocialMediaActions'
import { toast } from 'react-toastify'

export default function CvSocialMediaUpdate() {

    const dispatch = useDispatch()

    let { cvId } = useParams()

    let [socialMedia, setSocialMedia] = useState([])
    const cvSocialMedia = useSelector(state => state.cvSocialMedia)

    let cvSocialMediaService = new CvSocialMediaService()

    useEffect(() => {
        let socialMediaService = new SocialMediaService()
        socialMediaService.getSocialMedia().then(result => setSocialMedia(result.data.data))
    }, [])

    const handleGetSocialMedia = () => {
        dispatch(getCvSocialMedia(0));
    }
    const handleGetSocialMediaState = (state) => {
        dispatch(getCvSocialMediaState(state));
    }

    const getSocialMedia = socialMedia.map((socialMedia, index) => ({
        key: index,
        text: socialMedia.socialMediaName,
        value: socialMedia.socialMediaId,
    }));

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            cvSocialMediaId: cvSocialMedia.cvSocialMediaId,
            socialMediaId: cvSocialMedia.socialMediaId,
            link: cvSocialMedia.link,
        },
        validationSchema: Yup.object({
            socialMediaId: Yup.number().required("Sosyal medya bilgisi boş bırakılamaz!"),
            link: Yup.string().required("Link bilgisi boş bırakılamaz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let cvSocialMedia = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                cv: { cvId: values.cvId },
                link: values.link,
                socialMedia: { socialMediaId: values.socialMediaId },
                cvSocialMediaId: values.cvSocialMediaId
            };
            console.log(cvSocialMedia);
            cvSocialMediaService.add(cvSocialMedia).then((result) => console.log(result.data.message));
            toast.success(`Sosyal Medya Bilgisi Başarıyla Güncellendi.`)
        },
    });

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Sosyal Medyalar </h3></Segment>
                <Segment>
                    <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
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
                                        <Dropdown
                                            button
                                            fluid
                                            search
                                            selection
                                            id="socialMediaId"
                                            options={getSocialMedia}
                                            onChange={(event, data) =>
                                                formik.setFieldValue("socialMediaId", data.value)
                                            }
                                            value={formik.values.socialMediaId}
                                        />
                                        {formik.errors.socialMediaId && formik.touched.socialMediaId && (
                                            <p style={{ color: "red" }}>{formik.errors.socialMediaId}</p>
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                        <p>Sosyal Medya Linki:</p>
                                    </Grid.Column>
                                    <Grid.Column width={11} style={{ textAlign: "left" }}>
                                        <TextArea id="link" value={formik.values.link} onChange={formik.handleChange} fluid
                                            style={{ minHeight: 50, minWidth: "100%", maxWidth: "100%", padding: "7px" }}>
                                        </TextArea>
                                        {formik.errors.link && formik.touched.link && (
                                            <p style={{ color: "red" }}>{formik.errors.link}</p>
                                        )}
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                    </Grid.Column>
                                    <Grid.Column width={11} style={{ textAlign: "left" }}>
                                        <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                        <Button type="button" onClick={() => { handleGetSocialMedia(); handleGetSocialMediaState(0) }}
                                            style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>GERİ DÖN</Button>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        </div>
    )
}
