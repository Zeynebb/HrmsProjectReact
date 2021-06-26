import React, { useEffect, useState } from 'react'
import CvTechnologyService from '../../services/CvTechnologyService'
import { Table, Segment, Image, Button } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import getCvTechnology from '../../../store/actions/CvTechnologyActions';
import { useDispatch } from 'react-redux';

export default function CvTechnologyList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvTechnologies, setCvTechnologies] = useState([]);

    useEffect(() => {
        let cvTechnologyService = new CvTechnologyService()
        cvTechnologyService.getCvTechnologiesByCvId(cvId).then(result => setCvTechnologies(result.data.data))
    }, [])

    const handleGetTechnology = (cvTechnology) => {
        dispatch(getCvTechnology(cvTechnology));
    }

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yetenekler </h3></Segment>
                {
                    cvTechnologies.map(cvTechnology => (
                        <Table className="cvTable">
                            <td width="5%">
                                <tr>
                                    <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788178/technologyIcon_kqtmh7.png' size='mini' />
                                </tr>
                                <tr>

                                </tr>
                            </td>
                            <td width="95%">
                                <tr>
                                    <td className="leftTd" >
                                        <p>Teknoloji Adı:</p>
                                    </td>
                                    <td className="rightTd" >
                                        <p>{cvTechnology.technologyname}</p>
                                    </td>
                                </tr>
                            </td>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button onClick={() => handleGetTechnology(cvTechnology)}
                                        style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>Güncelle</Button>
                                </td>
                            </tr>
                        </Table>
                    ))
                }
            </Segment.Group>
        </div>
    )
}
