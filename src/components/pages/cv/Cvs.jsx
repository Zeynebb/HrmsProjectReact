import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Grid, Image, Segment, Button } from 'semantic-ui-react'
import CvService from '../../services/CvService'
import Moment from 'moment';
import moment from 'moment'
import { toast } from 'react-toastify'

export default function Cvs() {

    let { userId } = useParams()
    let [cvs, setCvs] = useState([])

    let cvService = new CvService()
    useEffect(() => {
        cvService.getCvsByJobSeekerId(userId).then(result => setCvs(result.data.data))
    }, [])

    function updateCreationDate(cvId) {
        cvService.updateCreationDate(cvId).then(result => console.log(result.data.message))
        toast.success("Oluşturulma Tarihi Güncellendi.")
    }
    function cvAdd() {
        let cv = {
            cvId: "",
            jobSeeker: { userId: userId },
            creationDate: moment().format("YYYY-MM-DD")
        };
        console.log(cv);
        cvService.addCv(cv).then((result) => console.log(result.data.message));
        toast.success('Özgeçmiş Eklendi.')
    }

    return (
        <div>
            {/* Başlığın rengini değiştirip dene, özgeçmiş başlığının rengini değiştir*/}
            <Segment.Group>
                <Segment inverted color="black" style={{ textAlign: "right" }}>
                    <Grid>
                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                            <h3 className="headerThree">Özgeçmişler</h3>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button onClick={() => cvAdd()} style={{ fontFamily: "Arial" }}>+ Yeni Özgeçmiş</Button>
                        </Grid.Column>
                    </Grid>

                </Segment>
                <br />
                {
                    cvs.map(cv => (
                        <Segment.Group>
                            <Segment inverted color="black" style={{ textAlign: "left" }}><h4 className="headerThree">Özgeçmiş</h4></Segment>
                            <Segment style={{ height: 120 }}>
                                <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                                    <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "3%" }}>
                                        <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1625321250/cv_qojpyv.png' size='mini' />
                                    </Grid.Column>
                                    <Grid.Column width={4} style={{ textAlign: "left", marginTop: "4%", fontWeight: "bold" }}>
                                        <p>Oluşturulma Tarihi:</p>
                                    </Grid.Column>
                                    <Grid.Column width={5} style={{ textAlign: "left", marginTop: "3%" }}>
                                        <p>{Moment(cv.creationDate).format("DD.MM.yyyy")}
                                            {moment().format("DD.MM.yyyy") == moment(cv.creationDate).format("DD.MM.yyyy") &&
                                                <Button onClick={() => updateCreationDate(cv.cvId)}
                                                    style={{ backgroundColor: "white", color: "green", fontFamily: "Arial" }}>Güncelle</Button>
                                            }
                                            {moment().format("DD.MM.yyyy") != moment(cv.creationDate).format("DD.MM.yyyy") &&
                                                <Button onClick={() => updateCreationDate(cv.cvId)}
                                                    style={{ backgroundColor: "white", color: "red", fontFamily: "Arial" }}>Güncelle</Button>
                                            }
                                        </p>
                                    </Grid.Column>
                                    <Grid.Column width={4} style={{ marginTop: "3%" }}>
                                        <Button as={NavLink} to={`/cvs/${userId}/cv/${cv.cvId}`}
                                            style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial" }} >Detay Görüntüle </Button>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Segment.Group>

                    ))}

            </Segment.Group>
        </div>
    )
}
