import React, { useEffect, useState } from 'react'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'
import { Table, Segment, Image } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'

export default function CvForeignLanguageList() {

    let { cvId } = useParams()

    const [cvForeignLanguages, setCvForeignLanguages] = useState([]);

    useEffect(() => {
        let cvForeignLanguageService = new CvForeignLanguageService()
        cvForeignLanguageService.getCvForeignLanguagesByCvId(cvId).then(result => setCvForeignLanguages(result.data.data))
    }, [])


    return (
        <div>
            <Segment.Group piled >
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yabancı Diller </h3></Segment>
                {cvForeignLanguages.map(cvForeignLanguage => (

                    <Table className="cvTable" key={cvForeignLanguage.cvId}>
                        <td width="5%">
                            <tr>
                            </tr>
                            <tr>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783705/translate_zboywx.png' size='mini' />
                            </tr>
                        </td>
                        <td width="95%">
                            <tr>
                                <td className="leftTd" >
                                    <p>Yabancı Dil Adı:</p>
                                </td>
                                <td className="rightTd" >
                                    <p>{cvForeignLanguage.foreignLanguageName}</p>
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Yabancı Dil Seviyesi:</p>
                                </td>
                                <td className="rightTd" >
                                    <p>{cvForeignLanguage.languageLevelName}</p>
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
