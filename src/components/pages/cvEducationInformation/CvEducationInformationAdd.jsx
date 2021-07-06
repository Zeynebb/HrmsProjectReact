import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Form, Grid, Image, Input, Segment } from 'semantic-ui-react'
import getEducationInformationState from '../../../store/actions/CvEducationInformationActions'
import EducationInformationService from '../../services/EducationInformationService'
import UniversityDepartmentService from '../../services/UniversityDepartmentService'
import UniversityService from '../../services/UniversityService'
import * as Yup from "yup";
import { getEducationInformation } from '../../../store/actions/EducationInformationActions'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'

export default function CvEducationInformationAdd() {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const educationInformations = useSelector(state => state.educationInformation)

    const [universities, setUniversities] = useState([])
    const [universityDepartments, setUniversityDepartments] = useState([])
    let educationInformationService = new EducationInformationService()

    const handleGetEducationId = () => {//bir önceki sayfaya dönerken id'yi sıfırlamak için
        dispatch(getEducationInformation(0));
    }
    const handleGetEducationState = (state) => {
        dispatch(getEducationInformationState(state));
    }

    useEffect(() => {
        let universityService = new UniversityService()
        let universityDepartmentService = new UniversityDepartmentService()
        universityService.getUniversities().then(result => setUniversities(result.data.data))
        universityDepartmentService.getUniversityDepartments().then(result => setUniversityDepartments(result.data.data))
    }, [])

    const getUniversities = universities.map((university, index) => ({
        key: index,
        text: university.universityName,
        value: university.universityId,
    }));
    const getUniversityDepartments = universityDepartments.map((departments, index) => ({
        key: index,
        text: departments.universityDepartmentName,
        value: departments.universityDepartmentId,
    }));

    const formik = useFormik({
        initialValues: {
            universityId: "",
            universityDepartmentId: "",
            startingDate: "",
            graduationDate: "",
            cvId: cvId,
            educationInformationId: ""
        },
        validationSchema: Yup.object({
            universityId: Yup.number().required("Üniversite bilgisi seçiniz!"),
            universityDepartmentId: Yup.number().required("Bölüm bilgisi seçiniz!"),
            startingDate: Yup.string().required("Başlangıç tarihi boş bırakılamaz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let educationInformation = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                educationInformationId: values.educationInformationId,
                cv: { cvId: values.cvId },
                university: { universityId: values.universityId },
                universityDepartment: { universityDepartmentId: values.universityDepartmentId },
                startingDate: values.startingDate,
                graduationDate: values.graduationDate,
            };
            console.log(educationInformation);
            educationInformationService.add(educationInformation).then((result) => console.log(result.data.message));
            toast.success(`Eğitim Bilgisi Başarıyla Eklendi.`)
        },
    });
    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Eğitim Bilgisi Ekle </h3></Segment>
                <Segment>
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                            <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "5%" }}>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783434/university_wa4gwv.png' size='mini' style={{ marginTop: "5em" }} />
                            </Grid.Column>
                            <Grid.Column width={11} >
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", marginTop: "3%", fontWeight: "bold" }}>
                                            <p>Üniversite Adı:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
                                            <Dropdown
                                                button
                                                fluid
                                                search
                                                selection
                                                id="universityId"
                                                options={getUniversities}
                                                onChange={(event, data) =>
                                                    formik.setFieldValue("universityId", data.value)
                                                }
                                                value={formik.values.universityId}
                                            />
                                            {formik.errors.universityId && formik.touched.universityId && (
                                                <p style={{ color: "red" }}>{formik.errors.universityId}</p>
                                            )}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "2%" }}>
                                            <p>Bölüm:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Dropdown
                                                button
                                                fluid
                                                search
                                                selection
                                                id="universityDepartmentId"
                                                options={getUniversityDepartments}
                                                onChange={(event, data) =>
                                                    formik.setFieldValue("universityDepartmentId", data.value)
                                                }
                                                value={formik.values.universityDepartmentId}
                                            />
                                            {formik.errors.universityDepartmentId && formik.touched.universityDepartmentId && (
                                                <p style={{ color: "red" }}>{formik.errors.universityDepartmentId}</p>
                                            )}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "2%" }}>
                                            <p>Başlangıç Tarihi:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Input id="startingDate" type="date" value={formik.values.startingDate} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.startingDate && formik.touched.startingDate && (
                                                <p style={{ color: "red" }}>{formik.errors.startingDate}</p>
                                            )} </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "2%" }}>
                                            <p>Mezuniyet Tarihi:</p>

                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Input id="graduationDate" type="date" value={formik.values.graduationDate} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.graduationDate && formik.touched.graduationDate && (
                                                <p style={{ color: "red" }}>{formik.errors.graduationDate}</p>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Button type="submit"
                                                style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                            <Button type="button" onClick={() => { handleGetEducationId(); handleGetEducationState(0) }}
                                                style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>GERİ DÖN</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    </Form>
                </Segment>
            </Segment.Group>

        </div >
    )
}
