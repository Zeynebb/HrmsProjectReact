import React, { useEffect, useState } from 'react'
import CvSocialMediaService from '../../services/CvSocialMediaService'
import { Table, Segment, Image, Button } from 'semantic-ui-react'
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
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Sosyal Medya Adresleri </h3></Segment>
                {
                    cvSocialMedia.map(cvSocialMedia => (
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
                                        <p>{cvSocialMedia.socialMediaName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Sosyal Medya Linki:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{cvSocialMedia.link}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                    </td>
                                    <td className="rightTd">
                                        <Button onClick={() => handleGetSocialMedia(cvSocialMedia)}
                                            style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    </td>
                                </tr>
                            </td>
                        </Table>
                    ))
                }
            </Segment.Group>
        </div>
    )
}
