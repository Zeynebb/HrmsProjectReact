import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Segment, Table, Button } from 'semantic-ui-react';
import { getCv } from '../../../store/actions/CvActions';
import CvService from '../../services/CvService';

export default function CvObjective() {

    let { cvId } = useParams()

    const dispatch = useDispatch()
    let cvService = new CvService()

    let [cvs, setCvs] = useState([])

    useEffect(() => {
        cvService.getCvsByCvId(cvId).then(result => setCvs(result.data.data))
    }, [])

    const handleGetCvId = (cv) => {
        dispatch(getCv(cv));
    }
    return (
        <div>
            {
                cvs.map(cv => (
                    <Segment.Group piled>
                        <Segment inverted style={{ textAlign: "left" }}><h3 className="headerThree" >Ön Söz </h3></Segment>
                        <Table className="cvTable">
                            <td>
                                <tr>
                                    <td width="5%" >
                                        <p style={{ fontSize: "20px" }}>&#9733;</p>
                                    </td>
                                    <td width="95%" style={{ fontSize: "16px" }}>
                                        <p>{cv.objective}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td >
                                    </td>
                                    <td >
                                        <Button onClick={()=>handleGetCvId(cv)}
                                            style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                    </td>
                                </tr>
                            </td>

                        </Table>
                    </Segment.Group>
                ))
            }
        </div>
    )
}
