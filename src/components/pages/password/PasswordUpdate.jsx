import React, { useEffect, useState } from 'react'
import { Form, Input, Segment, Table, Button } from 'semantic-ui-react'
import UserService from '../../services/UserService'
import '../../../css/JobAdvertisement.css'
import { useParams } from 'react-router'
import { getUser } from '../../../store/actions/UserActions';
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from "yup";
import { toast } from 'react-toastify'
import { useFormik } from 'formik'

export default function PasswordUpdate() {

    const dispatch = useDispatch()
    let { userId } = useParams()
    let userService = new UserService()

    //onceki sayfaya giderken id'yi siler
    function handlePassword() {
        dispatch(getUser(0))
    }

    const formik = useFormik({
        initialValues: {
            userId: userId,
            password: "",
            passwordAgain: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().min(6, "Şifre 6 karakter olmalıdır!").required("Şifre boş bırakılamaz!"),
            passwordAgain: Yup.string().min(6, "Şifre tekrarı minimum 6 karakter olmalıdır!").required("Şifre tekrarı boş bırakılamaz!")
        }),
        onSubmit: (values) => {
            console.log(values);
            let password = values.password
            let passwordAgain = values.passwordAgain
            let userId = values.userId
            console.log(password, passwordAgain, userId);
            userService.updatePassword(password, passwordAgain, userId).then((result) => console.log(result.data.message));
            toast.success(`Şifre Başarıyla Güncellendi.`)
        },
    });


    return (
        <div>
            <Segment.Group piled>
                <Segment inverted style={{ textAlign: "left" }}><h3 className="headerThree" >Şifre Değiştir </h3></Segment>
                <Form onSubmit={formik.handleSubmit}>
                    <Table className="cvTable">
                        <tr>
                            <td className="leftTd" >
                                <p>Şifre:</p>
                            </td>
                            <td className="rightTd" >
                                <Input id="password" type="password" value={formik.values.password} onChange={formik.handleChange} fluid></Input>
                                {formik.errors.password && formik.touched.password && (
                                    <p style={{ color: "red" }}>{formik.errors.password}</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                                <p>Şifre Tekrarı:</p>
                            </td>
                            <td className="rightTd" >
                                <Input id="passwordAgain" type="password" value={formik.values.passwordAgain} onChange={formik.handleChange} fluid></Input>
                                {formik.errors.passwordAgain && formik.touched.passwordAgain && (
                                    <p style={{ color: "red" }}>{formik.errors.passwordAgain}</p>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="leftTd" >
                            </td>
                            <td className="rightTd" >
                                <Button type="submit" style={{ float: "right", backgroundColor: "#780000", color: "white", marginLeft: "1em" }} >KAYDET</Button>
                                <Button onClick={() => handlePassword()} style={{ float: "right", backgroundColor: "black", color: "white", marginLeft: "1em" }} >VAZGEÇ</Button>
                            </td>
                        </tr>
                    </Table>
                </Form>
            </Segment.Group>

        </div>
    )
}
