import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import '../../../css/Login.css'
import ZYFormLabel from '../../toolbox/ZYFormLabel'
import ZYRedButton from '../../toolbox/ZYRedButton'

export default function Login() {
    return (
        <div>
            <Segment className="segmentLogin" style={{ width:"70%", margin:"15%" }}>
                <Segment inverted className="headerLogin">GİRİŞ YAP</Segment>
                <Form >
                    <Form.Field>
                        <label style={{ fontSize: "16px" }}>Email:</label>
                        <input placeholder='Email giriniz...' />
                    </Form.Field>
                    <Form.Field>
                        <label style={{ fontSize: "16px" }}>Şifre:</label>
                        <input placeholder='Şifre giriniz...' />
                    </Form.Field>
                    <Form.Field style={{ textAlign: "center" }}>
                        <ZYRedButton name="Giriş Yap" />
                    </Form.Field>

                </Form>
            </Segment>


        </div>
    )
}
