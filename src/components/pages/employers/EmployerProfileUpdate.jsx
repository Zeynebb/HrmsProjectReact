import React, { useEffect, useState } from 'react'
import { Form, Input, Segment, Table, Button } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService'
import '../../../css/JobAdvertisement.css'
import { useParams } from 'react-router'
import { getEmployer } from '../../../store/actions/EmployerActions';
import { getUser } from '../../../store/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import PasswordUpdate from '../password/PasswordUpdate'

export default function EmployerProfileUpdate() {

    const dispatch = useDispatch()
    let { userId } = useParams()

    const employer = useSelector(state => state.employer)
    const user = useSelector(state => state.user)
    const [passwordStatus, setPasswordStatus] = useState({})
    let employerService = new EmployerService()

    //onceki sayfaya giderken id'yi siler
    function handleGetEmployer() {
        dispatch(getEmployer(0))
    }
    function handleStatus(status) {
        setPasswordStatus(status);
    }
    function handlePassword(user) {
        dispatch(getUser(user))
    }

    const formik = useFormik({
        initialValues: {
            userId: userId,
            companyName: employer.companyName,
            email: employer.email,
            password:employer.password,
            phoneNumber: employer.phoneNumber,
            website: employer.website,
        },
        validationSchema: Yup.object({
            companyName: Yup.string().min(2, "Şirket ismi minimum 2 karakter olmalıdır!").required("Şirket ismi boş bırakılamaz!"),
            website: Yup.string().required("Website boş bırakılamaz!"),
            phoneNumber: Yup.string().min(11, "Telefon numarası 11 haneli olmalıdır!").max(11, "Telefon numarası 11 haneli olmalıdır!").required("Telefon Numarası boş bırakılamaz!"),
            email: Yup.string().email("Geçerli bir email adresi giriniz!").required("Email boş bırakılamaz!"),
            password: Yup.string().required("Şifre boş bırakılamaz!"),
        }),
        onSubmit: (values) => {
            let employer = {
                userId: values.userId,
                companyName: values.companyName,
                website: values.website,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
            };
            console.log(employer);
            employerService.updateEmployer(employer).then((result) => console.log(result.data.message));
            toast.success(`Profil Başarıyla Güncellendi.`)
        },
    });


    return (
        <div>
            <Segment.Group>
                <Segment style={{ backgroundColor: "black" }}><h3 style={{ backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial, Helvetica, sans-serif" }} >Firma Bilgileri</h3></Segment>
                <Form onSubmit={formik.handleSubmit} validationSchema={formik.validationSchema}>
                    <Table className="jobAdvertisementTable">
                        <tr>
                            <td className="leftTd" >
                                <p>Şirket İsmi:</p>
                            </td>
                            <td className="rightTd" >
                                <Input id="companyName" value={formik.values.companyName} onChange={formik.handleChange} fluid></Input>
                                {formik.errors.companyName && formik.touched.companyName && (
                                    <p style={{ color: "red" }}>{formik.errors.companyName}</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Website:</p>
                            </td>
                            <td className="rightTd">
                                <Input id="website" value={formik.values.website} onChange={formik.handleChange} fluid></Input>
                                {formik.errors.website && formik.touched.website && (
                                    <p style={{ color: "red" }}>{formik.errors.website}</p>
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
                                <p>Telefon Numarası:</p>
                            </td>
                            <td className="rightTd" >
                                <Input id="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} fluid></Input>
                                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                    <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                            </td>
                            <td className="rightTd" >
                                <Button type="button" onClick={() => handlePassword(employer)}
                                    style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em", fontFamily: "Arial" }}>ŞİFRE DEĞİŞTİR</Button>
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                            </td>
                            <td className="rightTd">
                                <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }}>KAYDET</Button>
                                <Button type="button" onClick={() => handleGetEmployer()}
                                    style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }}>GERİ DÖN</Button>
                            </td>
                        </tr>
                    </Table>
                </Form>
            </Segment.Group>
            <br/>
            {(user.userId) > 0 && <PasswordUpdate />}

        </div>
    )
}
