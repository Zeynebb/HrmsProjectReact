import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Segment, Image, Dropdown, Input, Form, Button, Grid, Radio } from 'semantic-ui-react'
import { useParams } from 'react-router'
import '../../../css/CvList.css'
import { useFormik } from 'formik'
import * as Yup from "yup";
import UniversityService from '../../services/UniversityService'
import UniversityDepartmentService from '../../services/UniversityDepartmentService'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getEducationInformation } from '../../../store/actions/EducationInformationActions'
import { toast } from 'react-toastify'
import getEducationInformationState from '../../../store/actions/CvEducationInformationActions'

export default function CvEducationInformationListUpdate({ notUpdated }) {

    const dispatch = useDispatch()
    let { cvId } = useParams()
    let [dateState, setDateState] = useState([])


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
    const formatDate = (date) => {
        return moment((date)).format('YYYY-MM-DD')
    }
    const formik = useFormik({
        initialValues: {
            universityId: educationInformations.universityId,
            universityDepartmentId: educationInformations.departmentId,
            startingDate: formatDate(educationInformations.startingDate),
            graduationDate: educationInformations.graduationDate,
            cvId: cvId,
            educationInformationId: educationInformations.educationId
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
            toast.success(`Eğitim Bilgisi Başarıyla Güncellendi.`)
        },
    });
    //educationInformations.graduationDate == "Devam Ediyor" ? dateState.value = '1' : dateState.value = '2' //default radio 
    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Eğitim Bilgileri </h3></Segment>
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
                                            <Input id="startingDate" type="date" defaultValue={formik.values.startingDate} value={formik.values.startingDate} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.startingDate && formik.touched.startingDate && (
                                                <p style={{ color: "red" }}>{formik.errors.startingDate}</p>
                                            )} </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "6%" }}>
                                            <p>Mezuniyet Tarihi:</p>

                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Radio
                                                label='Devam Ediyor'
                                                name='radioGroup'
                                                value='1'
                                                checked={dateState.value === '1'}
                                                onChange={(e, { value }) => setDateState({ value })}
                                                style={{ marginBottom: "1%" }}
                                            />
                                            <Radio
                                                label='Mezun'
                                                name='radioGroup'
                                                value='2'
                                                checked={dateState.value === '2'}
                                                onChange={(e, { value }) => setDateState({ value })}
                                                style={{ marginBottom: "1%", marginLeft: "4%" }}
                                            />
                                            {dateState.value == '2' &&
                                                <Input id="graduationDate" type="date" value={formik.values.graduationDate} onChange={formik.handleChange} fluid></Input>
                                            }
                                            {dateState.value == '1' &&
                                                <Input id="graduationDate" value="Devam Ediyor" fluid disabled></Input>
                                            }
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
        </div>
    )
}
