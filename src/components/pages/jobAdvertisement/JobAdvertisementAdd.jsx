import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Button, Segment, Input, Dropdown, Form, TextArea, Label } from 'semantic-ui-react'
import CityService from '../../services/CityService';
import JobAdvertisementService from '../../services/JobAdvertisementService';
import JobPositionService from '../../services/JobPositionService';
import WorkTimeTypeService from '../../services/WorkTimeTypeService';
import WorkTypeService from '../../services/WorkTypeService';
import '../../../css/JobAdvertisementAdd.css'
import * as Yup from "yup";
import * as moment from 'moment'
import { toast } from 'react-toastify';

export default function JobAdvertisementAdd() {

    const [cities, setCities] = useState([]);
    const [jobPositions, setJobPositions] = useState([]);
    const [workTimeTypes, setWorkTimeTypes] = useState([]);
    const [workTypes, setWorkTypes] = useState([]);
    let jobAdvertisementService = new JobAdvertisementService()


    useEffect(() => {
        let cityService = new CityService()
        let jobPositionService = new JobPositionService()
        let workTimeTypeService = new WorkTimeTypeService()
        let workTypeService = new WorkTypeService()
        cityService.getCities().then(result => setCities(result.data.data))
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))
        workTimeTypeService.getWorkTimeTypes().then(result => setWorkTimeTypes(result.data.data))
        workTypeService.getWorkTypes().then(result => setWorkTypes(result.data.data))
    }, [])

    const getCities = cities.map((city, index) => ({
        key: index,
        text: city.cityName,
        value: city.cityId,
    }));
    const getJobPositions = jobPositions.map((position, index) => ({
        key: index,
        text: position.positionName,
        value: position.positionId,
    }));
    const getWorkTimeTypes = workTimeTypes.map((workTimeType, index) => ({
        key: index,
        text: workTimeType.workTimeTypeName,
        value: workTimeType.workTimeTypeId,
    }));
    const getWorkTypes = workTypes.map((workType, index) => ({
        key: index,
        text: workType.workTypeName,
        value: workType.workTypeId,
    }));

    const formik = useFormik({
        initialValues: {
            positionId: "",
            cityId: "",
            minSalary: "",
            maxSalary: "",
            positionAmount: "",
            jobDescription: "",
            applicationDeadline: "",
            workTypeId: "",
            workTimeTypeId: "",
            userId: 20,
            releaseDate: moment().format("YYYY-MM-DD")//veritaban??nda default de??er-> CURRENT_TIMESTAMP
        },
        validationSchema: Yup.object({
            positionId: Yup.number().required("???? pozisyonu bilgisi se??iniz!"),
            cityId: Yup.string().required("??ehir bilgisi se??iniz!"),
            positionAmount: Yup.number().required("Al??nacak eleman say??s?? bo?? b??rak??lamaz!"),
            jobDescription: Yup.string().required("A????klama bo?? b??rak??lamaz!"),
            applicationDeadline: Yup.string().required("Son ba??vuru tarihi bo?? b??rak??lamaz!"),
            workTypeId: Yup.string().required("??al????ma tipi bilgisi se??iniz!"),
            workTimeTypeId: Yup.string().required("??al????ma zaman?? tipi bilgisi se??iniz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let jobAdvertisement = {//sol taraftakiler swagger'da jobAdvertisement eklerken gelen de??i??kenler, sa?? taraftakiler ise initialValues k??sm??nda belirlediklerimiz
                applicationDeadline: values.applicationDeadline,
                city: { cityId: values.cityId },
                employer: { userId: values.userId },
                position: { positionId: values.positionId },
                minSalary: values.minSalary,
                maxSalary: values.maxSalary,
                positionAmount: values.positionAmount,
                jobDescription: values.jobDescription,
                workType: { workTypeId: values.workTypeId },
                workTimeType: { workTimeTypeId: values.workTimeTypeId },
                releaseDate: values.releaseDate
            };
            console.log(jobAdvertisement);
            jobAdvertisementService.addJobAdvertisement(jobAdvertisement).then((result) => result.data.success ? toast.success(`???? ??lan?? Eklendi.`)
            && formik.resetForm()//formu s??f??rlamak i??in 
            : toast.error("???? ??lan?? Eklenemedi!"));
            
        },
    });

    return (
        <div>
            <Segment.Group>
                <Segment inverted><h3 className="headerStyle">???? ??lan?? Ekle</h3></Segment>
                <Segment>
                    <Form onSubmit={formik.handleSubmit}>
                        <div style={{ textAlign: "left", fontFamily: "Arial", fontWeight: "bold", padding: "3px" }} >
                            <div className="divStyle" >
                                <label>??ehir:</label>
                                <Dropdown style={{ fontFamily: "Arial", marginTop: "1em", fontWeight: "lighter" }}
                                    button
                                    placeholder='??ehir Se??iniz...'
                                    fluid
                                    search
                                    selection
                                    id="cityId"
                                    options={getCities}
                                    onChange={(event, data) =>
                                        formik.setFieldValue("cityId", data.value)
                                    }
                                    value={formik.values.cityId}
                                />
                                {formik.errors.cityId && formik.touched.cityId && (
                                    <Label basic color="red" pointing>{formik.errors.cityId}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>???? Pozisyonu:</label>
                                <Dropdown className="divDropdown"
                                    button
                                    placeholder='???? Pozisyonu Se??iniz...'
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
                                    <Label basic color="red" pointing>{formik.errors.positionId}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>??al????ma Tipi:</label>
                                <Dropdown style={{ fontFamily: "Arial", marginTop: "1em", fontWeight: "lighter" }}
                                    button
                                    placeholder='??al????ma Tipini Se??iniz...'
                                    fluid
                                    search
                                    selection
                                    id="workTypeId"
                                    options={getWorkTypes}
                                    onChange={(event, data) =>
                                        formik.setFieldValue("workTypeId", data.value)
                                    }
                                    value={formik.values.workTypeId}
                                    required
                                />
                                {formik.errors.workTypeId && formik.touched.workTypeId && (
                                    <Label basic color="red" pointing>{formik.errors.workTypeId}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>??al????ma Zaman?? Tipi:</label>
                                <Dropdown style={{ fontFamily: "Arial", marginTop: "1em", fontWeight: "lighter" }}
                                    button
                                    placeholder='??al????ma Zaman?? Tipini Se??iniz...'
                                    fluid
                                    search
                                    selection
                                    id="workTimeTypeId"
                                    options={getWorkTimeTypes}
                                    onChange={(event, data) =>
                                        formik.setFieldValue("workTimeTypeId", data.value)
                                    }
                                    value={formik.values.workTimeTypeId}
                                />
                                {formik.errors.workTimeTypeId && formik.touched.workTimeTypeId && (
                                    <Label basic color="red" pointing>{formik.errors.workTimeTypeId}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>Minimum Maa??:</label>
                                <Input id="minSalary" placeholder="Minimum Maa??..." fluid
                                    onChange={formik.handleChange} value={formik.values.minSalary}></Input>
                                {formik.errors.minSalary && formik.touched.minSalary && (
                                    <Label basic color="red" pointing>{formik.errors.minSalary}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>Maksimum Maa??:</label>
                                <Input id="maxSalary" placeholder="Maksimum Maa??..." fluid
                                    onChange={formik.handleChange} value={formik.values.maxSalary}></Input>
                                {formik.errors.maxSalary && formik.touched.maxSalary && (
                                    <Label basic color="red" pointing>{formik.errors.maxSalary}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>Al??nacak Personel Say??s??:</label>
                                <Input id="positionAmount" placeholder="Al??nacak Personel Say??s??..." fluid
                                    onChange={formik.handleChange} value={formik.values.positionAmount}></Input>
                                {formik.errors.positionAmount && formik.touched.positionAmount && (
                                    <Label basic color="red" pointing>{formik.errors.positionAmount}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>Son Ba??vuru Tarihi:</label>
                                <Input type="date" id="applicationDeadline" placeholder="Son Ba??vuru Tarihi..." fluid
                                    onChange={formik.handleChange} value={formik.values.applicationDeadline}></Input>
                                {formik.errors.applicationDeadline && formik.touched.applicationDeadline && (
                                    <Label basic color="red" pointing>{formik.errors.applicationDeadline}</Label>
                                )}
                            </div>
                            <div className="divStyle">
                                <label>A????klama:</label>
                                <TextArea id="jobDescription" placeholder="A????klama..."
                                    onChange={formik.handleChange} value={formik.values.jobDescription}></TextArea>
                                {formik.errors.jobDescription && formik.touched.jobDescription && (
                                    <Label basic color="red" pointing>{formik.errors.jobDescription}</Label>
                                )}
                            </div>
                        </div>
                        <Button type="submit" id="addButton">EKLE</Button>
                    </Form>
                </Segment>
            </Segment.Group>

        </div>
    )
}
