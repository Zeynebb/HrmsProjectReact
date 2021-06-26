import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image, Input, Segment, Table, Form, Button } from 'semantic-ui-react'
import { getWorkExperience } from '../../../store/actions/WorkExperienceActions';
import WorkExperienceService from '../../services/WorkExperienceService';
import JobPositionService from '../../services/JobPositionService';
import * as Yup from "yup";
import moment from 'moment';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function CvWorkExperienceUpdate() {

    let { cvId } = useParams()
    const dispatch = useDispatch()

    const workExperiences = useSelector(state => state.workExperience)

    let workExperienceService = new WorkExperienceService()

    let [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))
    }, [])

    const getJobPositions = jobPositions.map((jobPosition, index) => ({
        key: index,
        text: jobPosition.positionName,
        value: jobPosition.positionId,
    }));

    const handleGetWorkExperience = () => {
        dispatch(getWorkExperience(0));
    }
    const defaultEndingDate = (date) => {
        if (date == null) {
            return workExperiences.endingdate = "Devam Ediyor"
        } else if (date == "Devam Ediyor") {
            return workExperiences.endingdate = "Devam Ediyor"
        }
        else {
            return moment((workExperiences.endingdate)).format('YYYY-MM-DD')
        }
    }
    const formatDate = (date) => {
        return moment((date)).format('YYYY-MM-DD')
    }

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            positionId: workExperiences.jobPositionId,
            startingDate: formatDate(workExperiences.startingDate),
            endingdate: defaultEndingDate(workExperiences.endingdate),
            workExperienceId: workExperiences.workExperienceId,
            workplaceName: workExperiences.workplaceName
        },
        validationSchema: Yup.object({
            positionId: Yup.number().required("İş pozisyonu boş bırakılamaz!"),
            startingDate: Yup.string().required("Başlangıç tarihi boş bırakılamaz!"),
            workplaceName: Yup.string().required("İş yeri ismi boş bırakılamaz!"),
        }),
        onSubmit: (values) => {
            console.log(values);
            let workExperience = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                cv: { cvId: values.cvId },
                jobPosition: { positionId: values.positionId },
                startingDate: values.startingDate,
                endingDate: values.endingdate,
                workplaceName: values.workplaceName,
                workExperienceId: values.workExperienceId
            };
            console.log(workExperience);
            workExperienceService.add(workExperience).then((result) => console.log(result.data.message));
            toast.success(`İş Deneyimi Başarıyla Güncellendi.`)
        },
    });
    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">İş Deneyimleri </h3></Segment>
                <Form onSubmit={formik.handleSubmit} validationSchema={formik.validationSchema}>
                    <Table className="cvTable">
                        <td width="5%">
                            <tr>
                            </tr>
                            <tr>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788957/work_vaf7yi.png' size='mini' style={{ marginTop: "5em" }} />
                            </tr>
                        </td>
                        <td width="95%">
                            <tr>
                                <td className="leftTd" >
                                    <p>İş Pozisyonu:</p>
                                </td>
                                <td className="rightTd" >
                                    <Dropdown
                                        button
                                        fluid
                                        search
                                        selection
                                        id="positionId"
                                        options={getJobPositions}
                                        onChange={(event, data) =>
                                            formik.setFieldValue("positionId", data.value)
                                        }
                                        value={formik.values.positionId}
                                    />
                                    {formik.errors.positionId && formik.touched.positionId && (
                                        <p style={{ color: "red" }}>{formik.errors.positionId}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>İş Yeri:</p>
                                </td>
                                <td className="rightTd">
                                    <Input id="workplaceName" value={formik.values.workplaceName} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.workplaceName && formik.touched.workplaceName && (
                                        <p style={{ color: "red" }}>{formik.errors.workplaceName}</p>
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
                                    <p>Bitiş Tarihi:</p>
                                </td>
                                <td className="rightTd">
                                    <Input id="endingdate" value={formik.values.endingdate} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.endingdate && formik.touched.endingdate && (
                                        <p style={{ color: "red" }}>{formik.errors.endingdate}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                    <Button type="button" onClick={() => handleGetWorkExperience()}
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
