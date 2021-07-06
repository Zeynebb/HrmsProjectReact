import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { Button, Dropdown, Form, Grid, Image, Input, Segment } from 'semantic-ui-react'
import { getWorkExperience } from '../../../store/actions/WorkExperienceActions'
import JobPositionService from '../../services/JobPositionService'
import WorkExperienceService from '../../services/WorkExperienceService'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import getCvWorkExperienceState from '../../../store/actions/CvWorkExperienceActions';

export default function CvWorkExperienceAdd() {

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
    const handleWorExperienceState = (state) => {
        dispatch(getCvWorkExperienceState(state));
    }
    const formatDate = (date) => {
        return moment((date)).format('YYYY-MM-DD')
    }

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            positionId: "",
            startingDate: "",
            endingdate: "",
            workExperienceId: "",
            workplaceName: ""
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
            toast.success(`İş Deneyimi Başarıyla Eklendi.`)
        },
    });
    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">İş Deneyimleri </h3></Segment>
                <Segment>
                    <Form onSubmit={formik.handleSubmit}>
                        <Grid style={{ fontSize: "15px", fontFamily: "Arial" }}>
                            <Grid.Column width={2} style={{ marginLeft: "4%", marginTop: "4%" }}>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788957/work_vaf7yi.png' size='mini' style={{ marginTop: "5em" }} />
                            </Grid.Column>
                            <Grid.Column width={11} >
                                <Grid >
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", marginTop: "3%", fontWeight: "bold" }}>
                                            <p>İş Pozisyonu:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left", marginTop: "1%" }}>
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
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", marginTop: "2%", fontWeight: "bold" }}>
                                            <p>İş Yeri:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Input id="workplaceName" value={formik.values.workplaceName} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.workplaceName && formik.touched.workplaceName && (
                                                <p style={{ color: "red" }}>{formik.errors.workplaceName}</p>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "2%" }}>
                                            <p>Başlangıç Tarihi:</p>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Input id="startingDate" value={formik.values.startingDate} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.startingDate && formik.touched.startingDate && (
                                                <p style={{ color: "red" }}>{formik.errors.startingDate}</p>
                                            )}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "2%" }}>
                                            <p>Bitiş Tarihi:</p>

                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Input id="endingdate" value={formik.values.endingdate} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.endingdate && formik.touched.endingdate && (
                                                <p style={{ color: "red" }}>{formik.errors.endingdate}</p>
                                            )}
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold" }}>
                                        </Grid.Column>
                                        <Grid.Column width={11} style={{ textAlign: "left" }}>
                                            <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                            <Button type="button" onClick={() => { handleGetWorkExperience(); handleWorExperienceState(0) }}
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
