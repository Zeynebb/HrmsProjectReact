import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button, Dropdown, Form, Image, Input, Segment, Table, TextArea } from 'semantic-ui-react'
import SocialMediaService from '../../services/SocialMediaService'
import * as Yup from "yup";
import CvSocialMediaService from '../../services/CvSocialMediaService'
import getCvSocialMedia from '../../../store/actions/CvSocialMediaActions'
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
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Sosyal Medya Adresleri </h3></Segment>
                <Form onSubmit={formik.handleSubmit} validationSchema={formik.validationSchema}>
                    <Table className="cvTable">
                        <td width="5%">
                            <tr>
                            </tr>
                            <tr>{cvSocialMedia.socialMediaId == 1 &&
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
                            </tr>
                        </td>
                        <td width="95%">
                            <tr>
                                <td className="leftTd" >
                                    <p>Sosyal Medya Adı:</p>
                                </td>
                                <td className="rightTd" >
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
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Sosyal Medya Linki:</p>
                                </td>
                                <td className="rightTd" >
                                    <TextArea id="link" value={formik.values.link} onChange={formik.handleChange} fluid></TextArea>
                                    {formik.errors.link && formik.touched.link && (
                                        <p style={{ color: "red" }}>{formik.errors.link}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                    <Button type="button" onClick={() => handleGetSocialMedia()}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>GERİ DÖN</Button>
                                </td>
                            </tr>
                        </td>
                    </Table>
                </Form>
            </Segment.Group>
        </div>
    )
}
