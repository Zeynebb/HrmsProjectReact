import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Segment, Input, Modal, Header, Icon, Button, Label } from 'semantic-ui-react'
import JobSeekerService from '../../services/JobSeekerService';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getJobSeeker } from '../../../store/actions/JobSeekerActions'
import { toast } from 'react-toastify';
import EmailService from '../../services/EmailService';
import Timer from '../../toolbox/Timer';
import getTimerState from '../../../store/actions/TimerStateActions';

export default function JobSeekerRegister() {

    const dispatch = useDispatch()
    const jobSeeker = useSelector(state => state.jobSeeker)
    const timerState = useSelector(state => state.timerState)
    //const hoursMinSecs = { hours: 0, minutes: 4, seconds: 59 }
    //const hoursMinSecs = { hours: 0, minutes: 0, seconds: 10 }
    //let [hoursMinSecs, setHoursMinSecs] = useState({ hours: 0, minutes: 0, seconds: 10 })
    const [[hrs, mins, secs], setTime] = useState([0, 4, 59]);
    const hoursMinSecs = { hours: hrs, minutes: mins, seconds: secs }

    let jobSeekerService = new JobSeekerService();
    let emailService = new EmailService()
    let [resultEmailIsItUsed, setResultEmailIsItUsed] = useState([])
    let [resultNationalityIdIsItUsed, setResultNationalityIdIsItUsed] = useState([])
    const [open, setOpen] = useState(false)


    const initialValues = {
        firstName: "",
        lastName: "",
        nationalityId: "",
        birthYear: "",
        email: "",
        password: "",
        passwordAgain: "",
        validationCode: ""
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            firstName: Yup.string().min(2, "İsim minimum 2 karakter olmalıdır!").required("İsim boş bırakılamaz!"),
            lastName: Yup.string().min(2, "İsim minimum 2 karakter olmalıdır!").required("Soyisim boş bırakılamaz!"),
            nationalityId: Yup.string().min(11, "TC.Kimlik numarası 11 haneli olmalıdır!").max(11, "TC.Kimlik numarası 11 haneli olmalıdır!").required("TC.Kimlik Numarası boş bırakılamaz!"),
            birthYear: Yup.string().min(4, "Doğum yılı 4 haneli olmalıdır!").required("Doğum yılı boş bırakılamaz!"),
            email: Yup.string().email("Geçerli bir email adresi giriniz!").required("Email boş bırakılamaz!"),
            password: Yup.string().min(6, "Şifre en az 6 haneli olmalıdır!").required("Şifre boş bırakılamaz!"),
            passwordAgain: Yup.string().oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor!")
                .min(6, "Şifre tekrarı en az 6 haneli olmalıdır!").required("Şifre tekrarı boş bırakılamaz!"),
            //validationCode: Yup.string().required("Doğrulama kodu boş bırakılamaz!"),
        })
    });
    function emailSending(email) {
        jobSeekerService.emailSending(email)
    }

    function save(jobSeeker, passwordAgain, validationCode) {
        jobSeekerService.emailVerification(jobSeeker, passwordAgain, validationCode).then(
            (result) => result.data.success ? toast.success("Kayıt Başarılı!") && setOpen(false) && formik.resetForm()//formu sıfırlamak için 
                : toast.error("Kayıt Başarısız!") && toast.error("Doğrulama Kodu Hatalı!"));
    }
    function emailIsItUsed(email) {
        jobSeekerService.emailIsItUsed(email).then(result => setResultEmailIsItUsed(result.data))
    }
    function emailCheck(email) {
        emailService.emailCheck(email).then(result => result.data === true && emailIsItUsed(email))
    }
    function nationalityIdIsItUsed(nationalityId) {
        jobSeekerService.nationalityIdIsItUsed(nationalityId).then(result => setResultNationalityIdIsItUsed(result.data))
    }
    function sendJobSeeker(jobSeeker) {
        dispatch(getJobSeeker(jobSeeker))
    }
    function setTimerState(state) {
        dispatch(getTimerState(state))
    }
    return (
        <div>
            <Segment.Group>
                <Segment style={{ backgroundColor: "black", color: "white" }}><h3 >Kayıt Ol</h3></Segment>
                <Segment>
                    <form onSubmit={formik.handleSubmit} style={{ fontFamily: "Arial", fontWeight: "bold" }} validationSchema={formik.validationSchema} onBlur={formik.handleBlur} >
                        <div style={{ textAlign: "left" }} >
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>İsim:</label>
                                <Input id="firstName" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='İsim...' values={formik.values.firstName} onChange={formik.handleChange} required ></Input>
                                {formik.errors.firstName && formik.touched.firstName && (
                                    <Label basic color='red' pointing>{formik.errors.firstName}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Soyisim:</label>
                                <Input id="lastName" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Soyisim...' values={formik.values.lastName} onChange={formik.handleChange} required ></Input>
                                {formik.errors.lastName && formik.touched.lastName && (
                                    <Label basic color='red' pointing>{formik.errors.lastName}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label >TC.Kimlik Numarası:</label>
                                <Input id="nationalityId" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='TC.Kimlik Numarası...'
                                    values={formik.values.nationalityId} onChange={formik.handleChange} maxLength="11" required
                                    onBlur={e => {
                                        formik.handleBlur(e)
                                        nationalityIdIsItUsed(formik.values.nationalityId)
                                    }}></Input>
                                {formik.errors.nationalityId && formik.touched.nationalityId && (
                                    <Label basic color='red' pointing>{formik.errors.nationalityId}</Label>
                                )}
                                {formik.touched.nationalityId && resultNationalityIdIsItUsed === false && (
                                    <Label basic color='red' pointing>Bu Tc. Kimlik Numarası Zaten Kayıtlı!</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Doğum Tarihi:</label>
                                <Input id="birthYear" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Doğum Tarihi...'
                                    values={formik.values.birthYear} onChange={formik.handleChange} maxLength="4" required></Input>
                                {formik.errors.birthYear && formik.touched.birthYear && (
                                    <Label basic color='red' pointing>{formik.errors.birthYear}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Email:</label>
                                <Input type="email" id="email" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Email...'
                                    values={formik.values.email} onChange={formik.handleChange} required icon
                                    onBlur={e => {
                                        formik.handleBlur(e)
                                        emailCheck(formik.values.email)
                                        emailIsItUsed(formik.values.email)
                                    }}
                                >
                                    <input />
                                </Input>
                                {formik.errors.email && formik.touched.email && (
                                    <Label basic color='red' pointing>{formik.errors.email}</Label>
                                )}
                                {formik.touched.email && resultEmailIsItUsed === false && (
                                    <Label basic color='red' pointing>Bu Email Zaten Kayıtlı!</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Şifre:</label>
                                <Input id="password" type="password" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre...' values={formik.values.password} onChange={formik.handleChange} required></Input>
                                {formik.errors.password && formik.touched.password && (
                                    <Label basic color='red' pointing>{formik.errors.password}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Şifre Tekrarı:</label>
                                <Input id="passwordAgain" type="password" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre Tekrarı...' values={formik.values.passwordAgain} onChange={formik.handleChange} required ></Input>
                                {formik.errors.passwordAgain && formik.touched.passwordAgain && (
                                    <Label basic color='red' pointing>{formik.errors.passwordAgain}</Label>
                                )}
                            </div>
                        </div>
                        <Modal
                            closeIcon
                            open={open}
                            trigger={<Button type="submit" onClick={() => {
                                sendJobSeeker(formik.values); {
                                    resultEmailIsItUsed === true
                                        && emailSending(formik.values.email)
                                }
                            }}
                                style={{ backgroundColor: "#780000", color: "white", marginBottom: "0.001em", fontFamily: "Arial" }} >KAYIT OL</Button>}
                            onClose={() => setOpen(false)}
                            onOpen={resultNationalityIdIsItUsed === true && resultEmailIsItUsed === true && formik.touched.firstName === true
                                && !!(formik.errors) && (() => setOpen(true))}
                        >
                            <Header style={{ fontFamily: "Arial" }} icon='mail' content='Email Doğrulaması' />
                            <Modal.Content>
                                {timerState !== 1 &&
                                    <div style={{ marginTop: "1em", marginBottom: "1em", fontFamily: "Arial" }}>
                                        <label>Doğrulama Kodu:</label>
                                        <Input id="validationCode" fluid maxLength="6"
                                            style={{ marginTop: "1em" }} placeholder='Doğrulama Kodu...'
                                            values={formik.values.validationCode} onChange={formik.handleChange} required>
                                        </Input>
                                        {formik.errors.validationCode && formik.touched.validationCode && (
                                            <Label basic color='red' pointing>{formik.errors.validationCode}</Label>
                                        )}
                                    </div>}
                                {timerState === 1 && <div>
                                    <label>Doğrulama Kodu:</label>
                                    <Input id="validationCode" fluid
                                        style={{ marginTop: "1em" }} placeholder='Doğrulama Kodu...' required >
                                        <input disabled />
                                        <Button onClick={() => {
                                            emailSending(formik.values.email);
                                            setTimerState(2)
                                            setTime([0, 2, 59]);
                                        }}>Yeniden Kod Gönder</Button>
                                    </Input>
                                </div>}
                                <div style={{ textAlign: "right" }}>
                                    <Timer hoursMinSecs={hoursMinSecs} />
                                </div>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button type="submit" color='green'
                                    onClick={() => { save(jobSeeker, formik.values.passwordAgain, formik.values.validationCode) }}>
                                    <Icon name='checkmark' /> ONAYLA</Button>
                            </Modal.Actions>
                        </Modal>
                    </form>
                </Segment>
            </Segment.Group>
        </div >
    )
}
