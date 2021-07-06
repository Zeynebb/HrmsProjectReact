import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import * as Yup from "yup";
import { Dropdown, Grid, Image, Segment, Button, Form } from 'semantic-ui-react'
import getCvForeignLanguage, { getCvForeignLanguageState } from '../../../store/actions/CvForeignLanguageActions'
import ForeignLanguageService from '../../services/ForeignLanguageService'
import LanguageLevelService from '../../services/LanguageLevelService'
import CvForeignLanguageService from '../../services/CvForeignLanguageService'

export default function CvForeignLanguageAdd() {
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
    const handleGetForeignLanguageState = (state) => {
        dispatch(getCvForeignLanguageState(state));
    }

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            languageLevelId: "",
            cvforeignLanguageId: "",
            foreignLanguageId: ""
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
            toast.success(`Yabancı Dil Bilgisi Başarıyla Eklendi.`)
        },
    });

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yabancı Dil Ekle </h3></Segment>
                <Segment>
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                            <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "4%" }}>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783705/translate_zboywx.png' size='mini' />
                            </Grid.Column>
                            <Grid.Column width={11} >
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", marginTop: "3%", fontWeight: "bold" }}>
                                            <p>Yabancı Dil Adı:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
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
                                            )}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ marginTop: "2%", textAlign: "right", fontWeight: "bold" }}>
                                            <p>Yabancı Dil Seviyesi:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
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
                                            )}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5}></Grid.Column>
                                        <Grid.Column width={11}>
                                            <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                            <Button type="button" onClick={() => { handleGetForeignLanguage(); handleGetForeignLanguageState(0) }}
                                                style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>GERİ DÖN</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Segment>
            </Segment.Group>
        </div>
    )
}
