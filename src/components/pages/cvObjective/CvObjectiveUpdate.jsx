import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCv } from '../../../store/actions/CvActions';
import * as Yup from "yup";
import { Form, Segment, Table, TextArea, Button } from 'semantic-ui-react';
import CvService from '../../services/CvService';
import moment from 'moment';
import { toast } from 'react-toastify';

export default function CvObjectiveUpdate() {

    const dispatch = useDispatch()

    const cvs = useSelector(state => state.cv)

    let cvService = new CvService()

    const handleGetCvId = () => {
        dispatch(getCv(0));
    }

    const formik = useFormik({
        initialValues: {
            cvId: cvs.cvId,
            objective: cvs.objective,
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
            toast.success(`Ön Söz Başarıyla Güncellendi.`)
        },
    });
    return (
        <div>
            <div>
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
                                        <TextArea style={{ minHeight: 200 }} id="objective" onChange={formik.handleChange} value={formik.values.objective} ></TextArea>
                                    </td>
                                </tr>
                                <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }} >KAYDET</Button>
                                <Button onClick={() => handleGetCvId()} style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }} >GERİ DÖN</Button>
                            </td>
                        </Table>
                    </Form>
                </Segment.Group>
            </div>

        </div>
    )
}
