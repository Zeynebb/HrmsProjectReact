import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Button } from 'rebass'
import { Segment, Table } from 'semantic-ui-react'
import CvService from '../../services/CvService'
import CvPhotos from '../cvPhotos/CvPhotos'
import Moment from 'moment';

export default function Cvs() {

    let { jobSeekerId } = useParams()
    let { cvId } = useParams()
    let count = 0;

    let [cvs, setCvs] = useState([])

    useEffect(() => {
        let cvService = new CvService()
        cvService.getCvsByJobSeekerId(jobSeekerId).then(result => setCvs(result.data.data))

    }, [])
    return (
        <div>
            {
                cvs.map(cv => (
                    <Segment.Group piled>
                        <Segment inverted style={{ textAlign: "left" }}><h3 className="headerThree" >Özgeçmiş</h3></Segment>
                        <Table className="cvTable">
                            <td width="10%">
                                <tr>
                                </tr>
                                <tr>
                                    <CvPhotos />
                                </tr>
                            </td>
                            <td width="90%">
                                <tr>
                                    <td className="leftTd" >
                                        <p>Ad Soyad:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{cv.jobSeeker?.firstName} {cv.jobSeeker?.lastName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Email:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{cv.jobSeeker?.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Önsöz:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{cv.objective}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="leftTd" >
                                        <p>Oluşturulma Tarihi:</p>
                                    </td>
                                    <td className="rightTd">
                                        <p>{Moment(cv.creationDate).format("DD.MM.yyyy")}</p>
                                    </td>
                                </tr>
                                <Button as={NavLink} to={`/cv/${cv.cvId}`} style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }} >Detay Görüntüle </Button>
                            </td>
                        </Table>
                    </Segment.Group>
                ))
            }


        </div>
    )
}
