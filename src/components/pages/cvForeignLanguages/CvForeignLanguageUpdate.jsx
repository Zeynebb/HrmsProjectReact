import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as Yup from "yup";
import { Dropdown, Form, Image, Segment, Table, Button } from 'semantic-ui-react'
import getCvForeignLanguage from '../../../store/actions/CvForeignLanguageActions'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'
import ForeignLanguageService from '../../services/ForeignLanguageService'
import LanguageLevelService from '../../services/LanguageLevelService'
import { toast } from 'react-toastify';

export default function CvForeignLanguageUpdate() {

    let { cvId } = useParams()

    const dispatch = useDispatch()

    const cvForeignLanguages = useSelector(state => state.cvForeignLanguage)

    let [foreignLanguages, setForeignLanguages] = useState([])
    let [languageLevels, setLanguageLevels] = useState([])

    let cvForeignLanguageService = new CvForeignLanguageService()

    useEffect(() => {
        let foreignLanguageService = new ForeignLanguageService()
        let languageLevelService = new LanguageLevelService()
        foreignLanguageService.getForeignLanguages().then(result => setForeignLanguages(result.data.data))
        languageLevelService.getAll().then(result => setLanguageLevels(result.data.data))
    }, [])

    const getForeignLanguages = foreignLanguages.map((foreignLanguage, index) => ({
        key: index,
        text: foreignLanguage.foreignLanguageName,
        value: foreignLanguage.foreignLanguageId,
    }));
    const getLanguageLevels = languageLevels.map((languageLevel, index) => ({
        key: index,
        text: languageLevel.languageLevelName,
        value: languageLevel.languageLevelId,
    }));

    const handleGetForeignLanguage = () => {
        dispatch(getCvForeignLanguage(0));
    }

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            languageLevelId: cvForeignLanguages.languageLevelId,
            cvforeignLanguageId: cvForeignLanguages.cvForeignLanguageId,
            foreignLanguageId: cvForeignLanguages.foreignLanguageId
        },
        validationSchema: Yup.object({
            languageLevelId: Yup.number().required("Yabancı dil seviyesi bilgisi boş bırakılamaz!"),
            foreignLanguageId: Yup.number().required("Yabancı dil bilgisi boş bırakılamaz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let cvForeignLanguage = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                cv: { cvId: values.cvId },
                cvforeignLanguageId: values.cvforeignLanguageId,
                foreignLanguage: { foreignLanguageId: values.foreignLanguageId },
                languageLevel: { languageLevelId: values.languageLevelId }
            };
            console.log(cvForeignLanguage);
            cvForeignLanguageService.add(cvForeignLanguage).then((result) => console.log(result.data.message));
            toast.success(`Yabancı Dil Bilgisi Başarıyla Güncellendi.`)
        },
    });

    return (
        <div>
            <Segment.Group piled >
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yabancı Diller </h3></Segment>
                <Form onSubmit={formik.handleSubmit} validationSchema={formik.validationSchema}>
                    <Table className="cvTable">
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
                                    <Dropdown
                                        button
                                        fluid
                                        search
                                        selection
                                        id="foreignLanguageId"
                                        options={getForeignLanguages}
                                        onChange={(event, data) =>
                                            formik.setFieldValue("foreignLanguageId", data.value)
                                        }
                                        value={formik.values.foreignLanguageId}
                                    />
                                    {formik.errors.foreignLanguageId && formik.touched.foreignLanguageId && (
                                        <p style={{ color: "red" }}>{formik.errors.foreignLanguageId}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Yabancı Dil Seviyesi:</p>
                                </td>
                                <td className="rightTd" >
                                    <Dropdown
                                        button
                                        fluid
                                        search
                                        selection
                                        id="languageLevelId"
                                        options={getLanguageLevels}
                                        onChange={(event, data) =>
                                            formik.setFieldValue("languageLevelId", data.value)
                                        }
                                        value={formik.values.languageLevelId}
                                    />
                                    {formik.errors.languageLevelId && formik.touched.languageLevelId && (
                                        <p style={{ color: "red" }}>{formik.errors.languageLevelId}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                    <Button type="button" onClick={() => handleGetForeignLanguage()}
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
