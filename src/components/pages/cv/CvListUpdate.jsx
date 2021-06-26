import React, { useEffect, useState } from 'react'
import CvService from '../../services/CvService'
import { Table, Segment, TextArea, Form } from 'semantic-ui-react'
import '../../../css/CvList.css'
import { useHistory, useParams } from 'react-router';
import moment from 'moment';
import { Button } from 'rebass';
import { useFormik } from 'formik';
import * as Yup from "yup";

export default function CvListUpdate() {

    let { cvId } = useParams()
    let cvService = new CvService()
    const [cvs, setCvs] = useState([]);

    const [isUpdated, setIsUpdated] = useState(true)

    const history = useHistory()

    function handleUpdated() {
        setIsUpdated(true)

    }
    function handleNotUpdated() {
        setIsUpdated(false)
    }

    useEffect(() => {
        cvService.getCvsByCvId(cvId).then(result => setCvs(result.data.data))
    }, [])

    const formik = useFormik({
        initialValues: {
            cvId: cvId,
            objective: "",
            userId: 10,
            creationDate: moment().format("YYYY-MM-DD")//veritabanında default değer-> CURRENT_TIMESTAMP
        },
        validationSchema: Yup.object({
            objective: Yup.string().required("Önyazı boş bırakılamaz!"),
            creationDate: Yup.string().required("Oluşturma tarihi boş bırakılamaz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let cv = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                cvId: values.cvId,
                objective: values.objective,
                jobSeeker: { userId: values.userId },
                creationDate: values.creationDate
            };
            console.log(cv);
            cvService.addCv(cv).then((result) => console.log(result.data.message));
        },
    });

    return (
        <div>
            {
                cvs.map(cv => (
                    <Segment.Group piled>
                        <Segment inverted style={{ textAlign: "left" }}><h3 className="headerThree" >Ön Söz </h3></Segment>
                        <Form onSubmit={formik.handleSubmit}>
                            <Table className="cvTable">
                                <td >
                                    <tr>
                                        <td  >
                                            <p style={{ fontSize: "20px" }}>&#9733;</p>
                                        </td>
                                        <td width="100%" style={{ fontSize: "16px" }}>
                                            <TextArea defaultValue={cv.objective} id="objective" onChange={formik.handleChange} value={formik.values.objective} ></TextArea>
                                        </td>
                                    </tr>
                                    <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }} >KAYDET</Button>
                                </td>
                            </Table>
                        </Form>
                    </Segment.Group>
                ))
            }
        </div>
    )
}
