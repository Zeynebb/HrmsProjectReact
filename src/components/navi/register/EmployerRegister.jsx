import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Button, Segment, Input, Modal, Label, Icon, Header } from 'semantic-ui-react'
import EmployerService from '../../services/EmployerService';
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployer } from '../../../store/actions/EmployerActions'
import { toast } from 'react-toastify';
import EmailService from '../../services/EmailService';
import getTimerState from '../../../store/actions/TimerStateActions';
import Timer from '../../toolbox/Timer';

export default function EmployerRegister() {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    let [resultEmailIsItUsed, setResultEmailIsItUsed] = useState()
    const [[hrs, mins, secs], setTime] = useState([0, 0, 5]);
    const hoursMinSecs = { hours: hrs, minutes: mins, seconds: secs }

    const employer = useSelector(state => state.employer)
    const timerState = useSelector(state => state.timerState)

    function sendEmployer(employer) {
        dispatch(getEmployer(employer))
    }
    let employerService = new EmployerService();
    let emailService = new EmailService()

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
            password: Yup.string().min(6, "Şifre en az 6 haneli olmalıdır!").required("Şifre boş bırakılamaz!"),
            passwordAgain: Yup.string().oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor!")
                .min(6, "Şifre tekrarı en az 6 haneli olmalıdır!").required("Şifre tekrarı boş bırakılamaz!"),
        })
    });
    //doğrulama kodu gönderiliyor
    function sendEmail(email, website) {
        employerService.emailSending(email, website).then((result) => console.log(result.data.message));
    }
    //kayıt olma işlemi
    function save(employer, passwordAgain, validationCode) {
        employerService.register(employer, passwordAgain, validationCode).then(
            (result) => result.data.success ?
                toast.success("Kayıt Başarılı!") && setOpen(false)//kayıt başarılıysa modal kapanır ve başarılı mesajı yazdırılır
                && formik.resetForm()//formu sıfırlamak için 
                : toast.error("Kayıt Başarısız!") && toast.error("Doğrulama Kodu Hatalı!"));//kayıt başarısızsa mesaj yazdırılı
    }
    //email tipinde olup olmadığı kontrolü
    function emailCheck(email) {
        emailService.emailCheck(email).then((result) => result.data === true && emailIsItUsed(email));
    }
    //email kullanılmış mı kontrolü
    function emailIsItUsed(email) {
        employerService.emailIsItUsed(email).then((result) => setResultEmailIsItUsed(result.data));
    }
    function setTimerState(state) {
        dispatch(getTimerState(state))
    }
    return (
        <div>
            <Segment.Group>
                <Segment style={{ backgroundColor: "black", color: "white" }}><h3 >Kayıt Ol</h3></Segment>
                <Segment>
                    <form onSubmit={formik.handleSubmit} style={{ fontFamily: "Arial", fontWeight: "bold" }}
                        onBlur={formik.handleBlur}>
                        <div style={{ textAlign: "left" }} >
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Şirket İsmi:</label>
                                <Input id="companyName" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şirket İsmi...'
                                    values={formik.values.companyName} onChange={formik.handleChange} required></Input>
                                {formik.errors.companyName && formik.touched.companyName && (
                                    <Label basic color='red' pointing>{formik.errors.companyName}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Website:</label>
                                <Input id="website" fluid
                                    style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Website...'
                                    values={formik.values.website} onChange={formik.handleChange} required></Input>
                                {formik.errors.website && formik.touched.website && (
                                    <Label basic color='red' pointing>{formik.errors.website}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Telefon Numarası:</label>
                                <Input id="phoneNumber" fluid
                                    style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Telefon Numarası...'
                                    values={formik.values.phoneNumber} onChange={formik.handleChange} maxLength="11" required></Input>
                                {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                    <Label basic color='red' pointing>{formik.errors.phoneNumber}</Label>
                                )}
                            </div>
                            <div style={{ marginTop: "1em", marginBottom: "1em" }}>
                                <label>Email:</label>
                                <Input id="email" type="email" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Email...'
                                    values={formik.values.email} onChange={formik.handleChange} required
                                    onBlur={e => {
                                        formik.handleBlur(e)//onBlurinputtan ayrılınca işlem yapar
                                        emailCheck(formik.values.email)//inputtan ayrılınca email kontrolleri yapılır
                                        emailIsItUsed(formik.values.email)
                                    }}></Input>
                                {formik.errors.email && formik.touched.email && (
                                    <Label basic color='red' pointing>{formik.errors.email}</Label>
                                )}
                                {formik.touched.email && resultEmailIsItUsed == false && (
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
                                <Input id="passwordAgain" type="password" fluid style={{ marginRight: "1em", marginTop: "1em" }} placeholder='Şifre Tekrarı...' values={formik.values.passwordAgain} onChange={formik.handleChange} required></Input>
                                {formik.errors.passwordAgain && formik.touched.passwordAgain && (
                                    <Label basic color='red' pointing>{formik.errors.passwordAgain}</Label>
                                )}
                            </div>
                        </div>
                        <Modal
                            closeIcon
                            open={open}
                            trigger={
                                <Button onClick={() => {
                                    sendEmployer(formik.values); {
                                        resultEmailIsItUsed === true //eğer email adresi daha önce kullanılmamışsa mail gönder
                                            && sendEmail(formik.values.email, formik.values.website)
                                    }
                                }}
                                    style={{ backgroundColor: "#780000", color: "white", marginBottom: "0.001em" }} >KAYIT OL</Button>}
                            onClose={() => setOpen(false)}
                            onOpen={resultEmailIsItUsed === true && formik.touched.companyName === true && !!(formik.errors) && (() => setOpen(true))}
                        >
                            <Header icon='mail' content='Email Doğrulaması' />
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
                                {timerState === 1 &&
                                    <div>
                                        <label>Doğrulama Kodu:</label>
                                        <Input id="validationCode" fluid
                                            style={{ marginTop: "1em" }} placeholder='Doğrulama Kodu...' required >
                                            <input disabled />
                                            <Button style={{ backgroundColor: "black", color: "white", fontFamily: "Arial" }} onClick={() => {
                                                sendEmail(formik.values.email);
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
                                    onClick={() => { save(employer, formik.values.passwordAgain, formik.values.validationCode) }}>
                                    <Icon name='checkmark' /> ONAYLA</Button>
                            </Modal.Actions>
                        </Modal>
                    </form>
                </Segment>
            </Segment.Group>
        </div>
    )
}
