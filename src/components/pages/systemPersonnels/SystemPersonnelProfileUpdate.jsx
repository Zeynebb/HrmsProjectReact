import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import * as Yup from "yup";
import { Button, Form, Input, Segment, Table } from 'semantic-ui-react'
import { getSystemPersonnel } from '../../../store/actions/SystemPersonnelActions'
import PersonnelService from '../../services/PersonnelService'
import CvPhotos from '../cvPhotos/CvPhotos'
import { toast } from 'react-toastify';
import '../../../css/CvList.css'

export default function SystemPersonnelProfileUpdate() {

    const dispatch = useDispatch()
    let { personnelId } = useParams()
    let { cvId } = useParams()

    const [personnel, setPersonnel] = useState({})

    const systemPersonnels = useSelector(state => state.systemPersonnel)
    let personnelService = new PersonnelService()

    useEffect(() => {
        personnelService.getByPersonnelId(personnelId).then(result => setPersonnel(result.data.data))
    }, [])

    const handleGetSystemPersonnel = () => {
        dispatch(getSystemPersonnel(0));
    }

    const formik = useFormik({
        initialValues: {
            userId: systemPersonnels.userId,
            firstName: systemPersonnels.firstName,
            lastName: systemPersonnels.lastName,
            password: systemPersonnels.password,
            email: systemPersonnels.email,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("İsim boş bırakılamaz!"),
            lastName: Yup.string().required("Soyisim tarihi boş bırakılamaz!"),
            password: Yup.string().required("Şifre boş bırakılamaz!"),
            email: Yup.string().email("Geçerli bir email adresi giriniz!").required("Email boş bırakılamaz!"),
        }),
        onSubmit: (values) => {
            console.log(values);
            let systemPersonnel = {//sol taraftakiler swagger'da gelen değişkenler, sağ taraftakiler ise initialValues kısmında belirlediklerimiz
                userId: systemPersonnel.userId,
                firstName: systemPersonnel.firstName,
                lastName: systemPersonnel.lastName,
                password: systemPersonnel.password,
                cvId: values.cvId,
                objective: values.objective,
                jobSeeker: { userId: values.userId },
                creationDate: values.creationDate
            };
            console.log(systemPersonnel);
            personnelService.add(systemPersonnel).then((result) => console.log(result.data.message));
            toast.success(`Bilgiler Başarıyla Güncellendi.`)
        },
    });

    return (
        <div>
            <Segment.Group>
                <Segment inverted color="black" style={{ textAlign: "left" }}><h3 className="headerThree" >İletişim Bilgileri </h3></Segment>
                <Form onSubmit={formik.handleSubmit}>
                    <Table className="cvTable">
                        <td width="15%">
                            <tr>
                            </tr>
                            <tr>
                                <CvPhotos />
                            </tr>
                        </td>
                        <td width="85%">
                            <tr>
                                <td className="leftTd" >
                                    <p>İsim:</p>
                                </td>
                                <td className="rightTd" >
                                    <Input id="firstName" value={formik.values.firstName} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.firstName && formik.touched.firstName && (
                                        <p style={{ color: "red" }}>{formik.errors.firstName}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Soyisim:</p>
                                </td>
                                <td className="rightTd">
                                    <Input id="lastName" value={formik.values.lastName} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.lastName && formik.touched.lastName && (
                                        <p style={{ color: "red" }}>{formik.errors.lastName}</p>
                                    )}
                                </td>

                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Email:</p>
                                </td>
                                <td className="rightTd" >
                                    <Input id="email" value={formik.values.email} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.email && formik.touched.email && (
                                        <p style={{ color: "red" }}>{formik.errors.email}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                    <p>Şifre:</p>
                                </td>
                                <td className="rightTd" >
                                    <Input id="password" value={formik.values.password} onChange={formik.handleChange} fluid></Input>
                                    {formik.errors.password && formik.touched.password && (
                                        <p style={{ color: "red" }}>{formik.errors.password}</p>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="leftTd" >
                                </td>
                                <td className="rightTd">
                                    <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }} >KAYDET</Button>
                                    <Button onClick={() => handleGetSystemPersonnel()} style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }} >GERİ DÖN</Button>
                                </td>
                            </tr>
                        </td>
                    </Table>
                </Form>
            </Segment.Group>
        </div>
    )
}
