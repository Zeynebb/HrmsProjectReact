import React from 'react'
import { Form } from 'semantic-ui-react'

export default function Login() {
    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email giriniz...' />
                </Form.Field>
                <Form.Field>
                    <label>Şifre</label>
                    <input placeholder='Şifre giriniz...' />
                </Form.Field>
            </Form>
            
        </div>
    )
}
