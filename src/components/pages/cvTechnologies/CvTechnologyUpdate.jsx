import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Form, Image, Segment, Table } from 'semantic-ui-react'
import TechnologyService from '../../services/TechnologyService'
import getCvTechnology from "../../../store/actions/CvTechnologyActions"
import { useParams } from 'react-router'
import * as Yup from "yup";
import CvTechnologyService from '../../services/CvTechnologyService'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

export default function CvTechnologyUpdate() {

    let { cvId } = useParams()
    const dispatch = useDispatch()

    let cvTechnologies = useSelector(state => state.cvTechnology)

    let [technologies, setTechnologies] = useState([])

    let cvTechnologyService = new CvTechnologyService()

    useEffect(() => {
        let technologyService = new TechnologyService()
        technologyService.getTechnology().then(result => setTechnologies(result.data.data))
    }, [])

    const getTechnologies = technologies.map((technology, index) => ({
        key: index,
        text: technology.technologyName,
        value: technology.technologyId,
    }));

    const handleGetTechnology = () => {
        dispatch(getCvTechnology(0));
    }

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            technologyId: cvTechnologies.technologyId,
            cvTechnologiesId: cvTechnologies.cvTechnologyId
        },
        validationSchema: Yup.object({
            technologyId: Yup.number().required("Teknoloji bilgisi boş bırakılamaz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let cvTechnology = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                cv: { cvId: values.cvId },
                cvTechnologiesId: values.cvTechnologiesId,
                technology: { technologyId: values.technologyId }
            };
            console.log(cvTechnology);
            cvTechnologyService.add(cvTechnology).then((result) => console.log(result.data.message));
            toast.success(`Teknoloji Bilgisi Başarıyla Güncellendi.`)
        },
    });

    return (
        <div>
            <Segment.Group piled>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree">Yetenekler </h3></Segment>
                <Form onSubmit={formik.handleSubmit} validationSchema={formik.validationSchema}>
                    <Table className="cvTable">
                        <td width="5%">
                            <tr>
                                <Image src='https://res.cloudinary.com/zeydatabase/image/upload/v1623788178/technologyIcon_kqtmh7.png' size='mini' />
                            </tr>
                            <tr>

                            </tr>
                        </td>
                        <td width="95%">
                            <tr>
                                <td className="leftTd" >
                                    <p>Teknoloji Adı:</p>
                                </td>
                                <td className="rightTd" >
                                    <Dropdown
                                        button
                                        fluid
                                        search
                                        selection
                                        id="technologyId"
                                        options={getTechnologies}
                                        onChange={(event, data) =>
                                            formik.setFieldValue("technologyId", data.value)
                                        }
                                        value={formik.values.technologyId}
                                    />
                                    {formik.errors.technologyId && formik.touched.technologyId && (
                                        <p style={{ color: "red" }}>{formik.errors.technologyId}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                    <Button type="button" onClick={() => handleGetTechnology()}
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
