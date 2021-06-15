import { useFormik } from 'formik'
import React from 'react'
import { Button, Segment, Input } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService';
import * as Yup from "yup";

export default function EmployerRegister() {

    let employerService = new EmployerService();

    const formik = useFormik({
        initialValues: {
            companyName: "",
            website: "",
            phoneNumber: "",
            email: "",
            password: "",
            passwordAgain: ""
        },
        validationSchema: Yup.object({
            companyName: Yup.string().min(2, "Şirket ismi minimum 2 karakter olmalıdır!").required("Şirket ismi boş bırakılamaz!"),
            website: Yup.string().required("Website boş bırakılamaz!"),
            phoneNumber: Yup.string().min(11, "Telefon numarası 11 haneli olmalıdır!").max(11, "Telefon numarası 11 haneli olmalıdır!").required("Telefon Numarası boş bırakılamaz!"),
            email: Yup.string().email("Geçerli bir email adresi giriniz!").required("Email boş bırakılamaz!"),
            password: Yup.string().required("Şifre boş bırakılamaz!"),
            passwordAgain: Yup.string().required("Şifre tekrarı boş bırakılamaz!"),
        }),
        onSubmit: (values) => {
            console.log(values);
            let employer = {
                companyName: values.companyName,
                website: values.website,
                phoneNumber: values.phoneNumber,
                email: values.email,
                password: values.password,
            };
            let passwordAgain = values.passwordAgain
            console.log(employer, passwordAgain);
            employerService.register(employer, passwordAgain).then((result) => console.log(result.data.message));
        }
    });

    return (
        <div>
            <Segment.Group>
                <Segment style={{ backgroundColor: "black", color: "white" }}><h3 >Kayıt Ol</h3></Segment>
                <Segment>
                    <form onSubmit={formik.handleSubmit} style={{ fontFamily: "Arial", fontWeight: "bold" }}>
                        <div style={{ textAlign: "left" }} >
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Şirket İsmi:</label>
                                <Input id="companyName" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şirket İsmi...' values={formik.values.companyName} onChange={formik.handleChange} required></Input>
                                {formik.errors.companyName && formik.touched.companyName && (
                                    <p style={{ color: "red" }}>{formik.errors.companyName}</p>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Website:</label>
                                <Input id="website" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Website...' values={formik.values.website} onChange={formik.handleChange} required></Input>
                                {formik.errors.website && formik.touched.website && (
                                    <p style={{ color: "red" }}>{formik.errors.website}</p>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Telefon Numarası:</label>
                                <Input id="phoneNumber" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Telefon Numarası...' values={formik.values.phoneNumber} onChange={formik.handleChange} required></Input>
                                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                    <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Email:</label>
                                <Input id="email" type="email" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Email...' values={formik.values.email} onChange={formik.handleChange} required></Input>
                                {formik.errors.email && formik.touched.email && (
                                    <p style={{ color: "red" }}>{formik.errors.email}</p>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Şifre:</label>
                                <Input id="password" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre...' values={formik.values.password} onChange={formik.handleChange} required></Input>
                                {formik.errors.password && formik.touched.password && (
                                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Şifre Tekrarı:</label>
                                <Input id="passwordAgain" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre Tekrarı...' values={formik.values.passwordAgain} onChange={formik.handleChange} required></Input>
                                {formik.errors.passwordAgain && formik.touched.passwordAgain && (
                                    <p style={{ color: "red" }}>{formik.errors.passwordAgain}</p>
                                )}
                            </div>
                        </div>
                        <Button type="submit" style={{ backgroundColor: "#780000", color: "white", marginBottom: "0.001em" }} >KAYDET</Button>
                    </form>
                </Segment>
            </Segment.Group>
        </div>
    )
}
