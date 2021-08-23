import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Grid, Image, Segment, Button, Icon, Modal, Header } from 'semantic-ui-react'
import CvService from '../../services/CvService'
import Moment from 'moment';
import moment from 'moment'
import { toast } from 'react-toastify'
import { getCv } from '../../../store/actions/CvActions'
import { useDispatch } from 'react-redux'
import _, { delay } from 'lodash'

export default function Cvs() {

    const dispatch = useDispatch()
    let { userId } = useParams()
    let [cvs, setCvs] = useState([])

    let cvService = new CvService()
    useEffect(() => {
        cvService.getCvsByJobSeekerId(userId).then(result => setCvs(result.data.data))
    }, [])

    function updateCreationDate(cvId) {
        cvService.updateCreationDate(cvId).then(result => console.log(result.data.message))
        toast.success("Oluşturulma Tarihi Güncellendi.")
        _.delay(refreshPage(), 5000)//sayfayı yenilemek için
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

    function sendCv(cv) {
        dispatch(getCv(cv))
    }
    function deleteCv(cvId) {
        cvService.deleteCv(cvId).then(result => console.log(result.data.message))
        toast.success("Özgeçmiş Silindi")
    }

    function refreshPage() {//sayfayı yenilemek için
        window.location.reload();
    }

    const [open, setOpen] = React.useState(false)

    return (
        <div>
            <Segment.Group>
                <Segment style={{ textAlign: "right", backgroundColor: "black", color: "white" }}>
                    <Grid>
                        <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%", fontFamily: "Arial" }}>
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
                            <Segment style={{ textAlign: "left", backgroundColor: "black", color: "white" }}>
                                <Grid>
                                    <Grid.Column width={12}>
                                        <h4 className="headerThree" style={{ fontFamily: "Arial", marginTop: "1%" }}>Özgeçmiş</h4>
                                    </Grid.Column>
                                    <Grid.Column width={4} style={{ textAlign: "right" }}>
                                        <Modal
                                            closeIcon
                                            open={open}
                                            trigger={
                                                <Button onClick={() => sendCv(cv)} icon="delete" size="mini" style={{ backgroundColor: "black", color: "white" }}></Button>}
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                        >
                                            <Header icon='delete' content='Özgeçmiş Sil' style={{ fontFamily: "Arial" }} />
                                            <Modal.Content>
                                                <p style={{ fontSize: "20px", fontFamily: "Arial" }}>Özgeçmişi Silmek İstediğinizden Emin Misiniz?</p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button color='red' onClick={() => setOpen(false)}>
                                                    <Icon name='remove' /> VAZGEÇ</Button>
                                                <Button color='green' onClick={() => { setOpen(false); deleteCv(cv.cvId) }}>
                                                    <Icon name='checkmark' /> SİL </Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
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
                                            {moment().format("DD.MM.yyyy") === moment(cv.creationDate).format("DD.MM.yyyy") &&
                                                <Button onClick={() => updateCreationDate(cv.cvId)}
                                                    style={{ backgroundColor: "white", color: "green", fontFamily: "Arial" }}>Güncelle</Button>
                                            }
                                            {moment().format("DD.MM.yyyy") !== moment(cv.creationDate).format("DD.MM.yyyy") &&
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
