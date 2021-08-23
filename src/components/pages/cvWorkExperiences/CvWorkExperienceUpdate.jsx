import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Image, Input, Segment, Button, Grid, Radio, Form } from 'semantic-ui-react'
import { getWorkExperience } from '../../../store/actions/WorkExperienceActions';
import WorkExperienceService from '../../services/WorkExperienceService';
import JobPositionService from '../../services/JobPositionService';
import * as Yup from "yup";
import moment from 'moment';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import getCvWorkExperienceState from '../../../store/actions/CvWorkExperienceActions';

export default function CvWorkExperienceUpdate() {

    let { cvId } = useParams()
    const dispatch = useDispatch()
    let [dateState, setDateState] = useState([])

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
            positionId: workExperiences.jobPositionId,
            startingDate: formatDate(workExperiences.startingDate),
            endingdate: workExperiences.endingdate,
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
   // workExperiences.endingdate == null ? dateState.value = '1' : dateState.value = '2' //default radio 
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
                                            <Input id="startingDate" type="date" defaultValue={formik.values.startingDate} value={formik.values.startingDate} onChange={formik.handleChange} fluid></Input>
                                            {formik.errors.startingDate && formik.touched.startingDate && (
                                                <p style={{ color: "red" }}>{formik.errors.startingDate}</p>
                                            )}</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={5} style={{ textAlign: "right", fontWeight: "bold", marginTop: "6%" }}>
                                            <p>Bitiş Tarihi:</p>
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
                                                label='Bitti'
                                                name='radioGroup'
                                                value='2'
                                                checked={dateState.value === '2'}
                                                onChange={(e, { value }) => setDateState({ value })}
                                                style={{ marginBottom: "1%", marginLeft: "4%" }}
                                            />
                                            {dateState.value === '2' &&
                                                <Input id="endingdate" type="date" value={formatDate(formik.values.endingdate)} onChange={formik.handleChange} fluid></Input>
                                            }
                                            {dateState.value === '1' &&
                                                <Input id="endingdate" value="Devam Ediyor" fluid disabled></Input>
                                            }
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
