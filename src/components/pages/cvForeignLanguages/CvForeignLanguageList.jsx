import React, { useEffect, useState } from 'react'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'
import { Table, Segment, Image, Button } from 'semantic-ui-react'
import { useParams } from 'react-router';
import '../../../css/CvList.css'
import { useDispatch } from 'react-redux';
import getCvForeignLanguage from '../../../store/actions/CvForeignLanguageActions';

export default function CvForeignLanguageList() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const [cvForeignLanguages, setCvForeignLanguages] = useState([]);

    useEffect(() => {
        let cvForeignLanguageService = new CvForeignLanguageService()
        cvForeignLanguageService.getCvForeignLanguagesByCvId(cvId).then(result => setCvForeignLanguages(result.data.data))
    }, [])

    const handleGetForeignLanguage = (cvForeignLanguage) => {
        dispatch(getCvForeignLanguage(cvForeignLanguage));
    }

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
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button onClick={() => handleGetForeignLanguage(cvForeignLanguage)}
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
