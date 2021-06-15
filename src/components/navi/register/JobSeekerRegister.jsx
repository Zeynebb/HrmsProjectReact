import { useFormik } from 'formik';
import React from 'react'
import { Button } from 'rebass'
import { Segment, Input } from 'semantic-ui-react'
import JobSeekerService from '../../services/JobSeekerService';
import * as Yup from "yup";

export default function JobSeekerRegister() {
    let jobSeekerService = new JobSeekerService();

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            nationalityId: "",
            birthYear: 0,
            email: "",
            password: "",
            passwordAgain: "",
            validationCode: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string().min(2, "Şirket ismi minimum 2 karakter olmalıdır!").required("Şirket ismi boş bırakılamaz!"),
            lastName: Yup.string().required("Website boş bırakılamaz!"),
            phoneNumber: Yup.string().min(11, "Telefon numarası 11 haneli olmalıdır!").max(11, "Telefon numarası 11 haneli olmalıdır!").required("Telefon Numarası boş bırakılamaz!"),
            birthYear: Yup.number().required("Website boş bırakılamaz!"),
            email: Yup.string().email("Geçerli bir email adresi giriniz!").required("Email boş bırakılamaz!"),
            password: Yup.string().required("Şifre boş bırakılamaz!"),
            passwordAgain: Yup.string().required("Şifre tekrarı boş bırakılamaz!"),
            validationCode: Yup.string().required("Doğrulama kodu boş bırakılamaz!"),
        }),
        onSubmit: (values) => {
            console.log(values);
            let jobSeeker = {
                firstName: values.firstName,
                lastName: values.lastName,
                nationalityId: values.nationalityId,
                birthYear: values.birthYear,
                email: values.email,
                password: values.password,
            };
            let passwordAgain = values.passwordAgain;
            let validationCode = values.validationCode;
            console.log(jobSeeker, passwordAgain, validationCode);
            jobSeekerService.register(jobSeeker, passwordAgain, validationCode).then((result) => console.log(result.data.message));
        }
    });
    return (
        <div>
            <Segment.Group>
                <Segment style={{ backgroundColor: "black", color: "white" }}><h3 >Kayıt Ol</h3></Segment>
                <Segment>
                    <form onSubmit={formik.handleSubmit} style={{ fontFamily: "Arial", fontWeight: "bold" }}>
                        <div style={{ textAlign: "left" }} >
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>İsim:</label>
                                <Input id="firstName" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='İsim...' values={formik.values.firstName} onChange={formik.handleChange} required ></Input>
                                {formik.errors.firstName && formik.touched.firstName && (
                                    <p style={{ color: "red" }}>{formik.errors.firstName}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>Soyisim:</label>
                                <Input id="lastName" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Soyisim...' values={formik.values.lastName} onChange={formik.handleChange} required ></Input>
                                {formik.errors.lastName && formik.touched.lastName && (
                                    <p style={{ color: "red" }}>{formik.errors.lastName}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label >TC.Kimlik Numarası:</label>
                                <Input id="nationalityId" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='TC.Kimlik Numarası...' values={formik.values.nationalityId} onChange={formik.handleChange} required ></Input>
                                {formik.errors.nationalityId && formik.touched.nationalityId && (
                                    <p style={{ color: "red" }}>{formik.errors.nationalityId}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>Doğum Tarihi:</label>
                                <Input id="birthYear" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Doğum Tarihi...' values={formik.values.birthYear} onChange={formik.handleChange} required></Input>
                                {formik.errors.birthYear && formik.touched.birthYear && (
                                    <p style={{ color: "red" }}>{formik.errors.birthYear}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>Email:</label>
                                <Input type="email" id="email" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Email...' values={formik.values.email} onChange={formik.handleChange} required></Input>
                                <label style={{ fontSize: "0.8em" }}>Doğrulama Kodu Gönder</label>
                                {formik.errors.email && formik.touched.email && (
                                    <p style={{ color: "red" }}>{formik.errors.email}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>Şifre:</label>
                                <Input id="password" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre...' values={formik.values.password} onChange={formik.handleChange} required></Input>
                                {formik.errors.password && formik.touched.password && (
                                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>Şifre Tekrarı:</label>
                                <Input id="passwordAgain" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre Tekrarı...' values={formik.values.passwordAgain} onChange={formik.handleChange} required ></Input>
                                {formik.errors.passwordAgain && formik.touched.passwordAgain && (
                                    <p style={{ color: "red" }}>{formik.errors.passwordAgain}</p>
                                )}
                            </div>
                            <div style={{ arginTop: "1em", marginBottom: "1em" }}>
                                <label>Doğrulama Kodu:</label>
                                <Input id="validationCode" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Doğrulama Kodu...' values={formik.values.validationCode} onChange={formik.handleChange} required></Input>
                                {formik.errors.firstNavalidationCodeme && formik.touched.validationCode && (
                                    <p style={{ color: "red" }}>{formik.errors.validationCode}</p>
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
