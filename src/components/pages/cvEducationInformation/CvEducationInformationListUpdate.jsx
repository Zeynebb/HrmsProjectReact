import React, { useEffect, useState } from 'react'
import EducationInformationService from '../../services/EducationInformationService'
import { Table, Segment, Image, Dropdown, Input, Form,Button } from 'semantic-ui-react'
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

export default function CvEducationInformationListUpdate({ notUpdated }) {

    const dispatch = useDispatch()
    let { cvId } = useParams()

    const educationInformations = useSelector(state => state.educationInformation)

    const [universities, setUniversities] = useState([])
    const [universityDepartments, setUniversityDepartments] = useState([])
    let educationInformationService = new EducationInformationService()

    const handleGetEducationId = () => {//bir önceki sayfaya dönerken id'yi sıfırlamak için
        dispatch(getEducationInformation(0));
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

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Eğitim Bilgileri </h3></Segment>
                <Form onSubmit={formik.handleSubmit} validationSchema={formik.validationSchema}>
                    <Table className="cvTable">
                        <td width="5%">
                            <tr>
                            </tr>
                            <tr>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623783434/university_wa4gwv.png' size='mini' style={{ marginTop: "5em" }} />
                            </tr>

                        </td>
                        <td width="95%">
                            <tr>
                                <td className="leftTd" >
                                    <p>Üniversite Adı:</p>
                                </td>
                                <td className="rightTd" >
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
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Bölüm:</p>
                                </td>
                                <td className="rightTd">
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
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Başlangıç Tarihi:</p>
                                </td>
                                <td className="rightTd" >
                                    <Input id="startingDate" value={formik.values.startingDate} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.startingDate && formik.touched.startingDate && (
                                        <p style={{ color: "red" }}>{formik.errors.startingDate}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Mezuniyet Tarihi:</p>
                                </td>
                                <td className="rightTd">
                                    <p>
                                        {educationInformations.graduationDate != 'Devam Ediyor' &&
                                            <Input id="graduationDate" value={formik.values.graduationDate} onChange={formik.handleChange} fluid></Input>

                                        }
                                        {educationInformations.graduationDate == 'Devam Ediyor' &&
                                            <Input id="graduationDate" value={formik.values.graduationDate} onChange={formik.handleChange} fluid></Input>
                                        }
                                        {formik.errors.graduationDate && formik.touched.graduationDate && (
                                            <p style={{ color: "red" }}>{formik.errors.graduationDate}</p>
                                        )}
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button type="submit"
                                        style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                    <Button type="button" onClick={()=>handleGetEducationId()}
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
