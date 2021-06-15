import React, { useEffect, useState } from 'react'
import CvTechnologyService from '../../services/CvTechnologyService'
import { Table, Segment, Image } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'

export default function CvTechnologyList() {

    let { cvId } = useParams()

    const [cvTechnologies, setCvTechnologies] = useState([]);

    useEffect(() => {
        let cvTechnologyService = new CvTechnologyService()
        cvTechnologyService.getCvTechnologiesByCvId(cvId).then(result => setCvTechnologies(result.data.data))
    }, [])

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
                        </Table>
                    ))
                }
            </Segment.Group>
        </div>
    )
}
